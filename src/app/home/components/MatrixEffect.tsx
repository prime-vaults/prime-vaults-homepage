import { useLayoutEffect, useRef, useState } from 'react'

type Mode = 'left' | 'right' | 'full' | 'sides'
type ContentType = 'square' | 'string' | 'rowcol'
type StyleType = 'fade' | 'matrix'
type EffectType = 'none' | 'repulse' | 'attract' | 'orbit' | 'wave'

interface MatrixCanvasProps {
  cellSize?: number
  initialMode?: Mode
  initialContent?: ContentType
  initialStyle?: StyleType
  initialEffect?: EffectType
  contentString?: string
  centerGapFraction?: number // 0..1 fraction of empty center when mode = sides
}

export default function MatrixEffect({
  cellSize = 14,
  initialMode = 'left',
  initialContent = 'string',
  initialStyle = 'fade',
  initialEffect = 'repulse',
  contentString = 'jikostaking JIKOSTAKING 0101010',
  centerGapFraction = 0.3,
}: MatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  const [mode, setMode] = useState<Mode>(initialMode)
  const modeRef = useRef(mode)
  const [content, setContent] = useState<ContentType>(initialContent)
  const contentRef = useRef(content)
  const [style, setStyle] = useState<StyleType>(initialStyle)
  const styleRef = useRef(style)
  const [effect, setEffect] = useState<EffectType>(initialEffect)
  const effectRef = useRef(effect)

  // refs for drawing state
  const colsRef = useRef(0)
  const rowsRef = useRef(0)
  const gridRef = useRef<any[][]>([])
  const dropsRef = useRef<{ y: number; speed: number }[]>([])
  const wavesRef = useRef<{ x: number; y: number; start: number }[]>([])
  const rowMetaRef = useRef<{ len: number }[]>([])
  const mouseRef = useRef({
    x: null as number | null,
    y: null as number | null,
  })
  const shimmerPosRef = useRef(0)
  const shimmerWidthRef = useRef(0)

  // constants
  const repulseRadius = 120
  const repulseStrength = 15
  const orbitBaseSpeed = 0.002
  const waveDuration = 4000
  const maxWaves = 20
  const shimmerSpeed = 3

  type Cell = {
    intensity: number
    fadeDir: number
    baseX: number
    baseY: number
    orbitAngle: number
    char: string
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let mounted = true

    function setupGrid() {
      if (!canvas) return
      const cols = Math.max(1, Math.floor(canvas.width / cellSize))
      const rows = Math.max(1, Math.floor(canvas.height / cellSize))
      colsRef.current = cols
      rowsRef.current = rows
      const grid: Cell[][] = new Array(cols)
      const drops: { y: number; speed: number }[] = new Array(cols)
      let charIndex = 0
      for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
        drops[i] = {
          y: Math.floor(Math.random() * rows),
          speed: 1 + Math.random() * 2,
        }
        for (let j = 0; j < rows; j++) {
          grid[i][j] = {
            intensity: 0,
            fadeDir: Math.random() > 0.5 ? 1 : -1,
            baseX: i * cellSize,
            baseY: j * cellSize,
            orbitAngle: Math.random() * Math.PI * 2,
            char: contentString[charIndex % contentString.length],
          }
          charIndex++
        }
      }
      // rowcol meta: each row has different length, always starts at left edge
      const rowMeta: { len: number }[] = new Array(rows)
      for (let j = 0; j < rows; j++) {
        const minLen = Math.max(1, Math.floor(cols * 0.15))
        const maxLen = Math.max(minLen, Math.floor(cols * 0.85))
        rowMeta[j] = {
          len: Math.floor(minLen + Math.random() * (maxLen - minLen + 1)),
        }
      }
      gridRef.current = grid
      dropsRef.current = drops
      rowMetaRef.current = rowMeta
    }

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      shimmerPosRef.current = -canvas.width
      shimmerWidthRef.current = canvas.width * 0.4
      setupGrid()
    }

    function getWeight(colIndex: number) {
      const cols = colsRef.current || 1
      const mid = cols / 2
      switch (modeRef.current) {
        case 'left':
          return colIndex <= mid
            ? 1 - colIndex / mid
            : 0.15 * (1 - (colIndex - mid) / mid)
        case 'right':
          return colIndex >= mid
            ? 1 - (cols - colIndex) / mid
            : 0.15 * (1 - (mid - colIndex) / mid)
        case 'full':
          return 1
        case 'sides': {
          const gap = Math.floor(
            cols * Math.max(0, Math.min(0.9, centerGapFraction)),
          )
          const leftEnd = Math.floor((cols - gap) / 2)
          const rightStart = leftEnd + gap
          if (colIndex >= leftEnd && colIndex < rightStart) return 0
          if (colIndex < leftEnd) return (leftEnd - colIndex) / leftEnd
          const denom = Math.max(1, cols - rightStart - 1)
          return (colIndex - rightStart) / denom
        }
        default:
          return 1
      }
    }

    function drawLoop() {
      if (!mounted || !canvas || !ctx) return
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const cols = colsRef.current
      const rows = rowsRef.current
      const grid = gridRef.current
      const drops = dropsRef.current
      const now = performance.now()

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = grid[i][j]
          const weight = getWeight(i)
          if (styleRef.current === 'fade') {
            cell.intensity += cell.fadeDir * 0.02
            if (cell.intensity <= 0) {
              cell.intensity = 0
              if (Math.random() < weight * 0.02) cell.fadeDir = 1
            } else if (cell.intensity >= 1) {
              cell.intensity = 1
              cell.fadeDir = -1
            }
          } else if (styleRef.current === 'matrix') {
            const drop = drops[i]
            let dist = j - drop.y
            if (dist < 0) dist += rows
            cell.intensity = dist >= 0 && dist < 10 ? 1 - dist / 10 : 0
          }

          if (cell.intensity > 0 && weight > 0) {
            let drawX = cell.baseX
            let drawY = cell.baseY

            // mouse effects
            if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
              const dx = drawX + cellSize / 2 - mouseRef.current.x!
              const dy = drawY + cellSize / 2 - mouseRef.current.y!
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (effectRef.current === 'repulse' && dist < repulseRadius) {
                const force = (1 - dist / repulseRadius) * repulseStrength
                const angle = Math.atan2(dy, dx)
                drawX += Math.cos(angle) * force
                drawY += Math.sin(angle) * force
              } else if (
                effectRef.current === 'attract' &&
                dist < repulseRadius
              ) {
                const force = (1 - dist / repulseRadius) * repulseStrength
                const angle = Math.atan2(dy, dx)
                drawX -= Math.cos(angle) * force
                drawY -= Math.sin(angle) * force
              } else if (effectRef.current === 'orbit') {
                const baseDX = cell.baseX + cellSize / 2 - mouseRef.current.x!
                const baseDY = cell.baseY + cellSize / 2 - mouseRef.current.y!
                const radius = Math.sqrt(baseDX * baseDX + baseDY * baseDY)
                const speed =
                  orbitBaseSpeed * (1 + (1 - Math.min(radius / 400, 1)) * 5)
                cell.orbitAngle += speed
                drawX = mouseRef.current.x! + Math.cos(cell.orbitAngle) * radius
                drawY = mouseRef.current.y! + Math.sin(cell.orbitAngle) * radius
              }
            }

            if (effectRef.current === 'wave' && wavesRef.current.length > 0) {
              for (const w of wavesRef.current) {
                const elapsed = now - w.start
                if (elapsed > waveDuration) continue
                const radius =
                  (elapsed / waveDuration) *
                  Math.sqrt(canvas.width ** 2 + canvas.height ** 2)
                const dx = drawX + cellSize / 2 - w.x
                const dy = drawY + cellSize / 2 - w.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist > 0 && Math.abs(dist - radius) < 20) {
                  const offset = (20 - Math.abs(dist - radius)) * 0.5
                  drawX += (dx / dist) * offset
                  drawY += (dy / dist) * offset
                }
              }
            }

            ctx.fillStyle = `rgba(0,255,102,${Math.min(
              1,
              cell.intensity * weight,
            )})`
            if (contentRef.current === 'square') {
              ctx.fillRect(drawX, drawY, cellSize - 2, cellSize - 2)
            } else if (contentRef.current === 'string') {
              ctx.font = `${cellSize}px monospace`
              ctx.textBaseline = 'top'
              ctx.fillText(cell.char, drawX, drawY)
            } else if (contentRef.current === 'rowcol') {
              const meta = rowMetaRef.current[j]
              if (meta && i < meta.len) {
                ctx.font = `${cellSize}px monospace`
                ctx.textBaseline = 'top'
                ctx.fillText(cell.char, drawX, drawY)
              }
            }
          }
        }
      }

      if (styleRef.current === 'matrix') {
        for (const d of drops) {
          d.y += d.speed * 0.1
          if (d.y >= rows) d.y = 0
        }
      }

      const shimmerPos = shimmerPosRef.current
      const shimmerWidth = shimmerWidthRef.current
      const grad = ctx.createLinearGradient(
        shimmerPos,
        shimmerPos,
        shimmerPos + shimmerWidth,
        shimmerPos + shimmerWidth,
      )
      grad.addColorStop(0, 'rgba(0,0,0,0.7)')
      grad.addColorStop(0.5, 'rgba(0,0,0,0.2)')
      grad.addColorStop(1, 'rgba(0,0,0,0.7)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      shimmerPosRef.current += shimmerSpeed
      if (shimmerPosRef.current > canvas.width + shimmerWidth)
        shimmerPosRef.current = -shimmerWidth

      wavesRef.current = wavesRef.current.filter(
        (w) => now - w.start < waveDuration,
      )
      animationRef.current = requestAnimationFrame(drawLoop)
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      if (effectRef.current === 'wave') {
        const now = performance.now()
        wavesRef.current = wavesRef.current.filter(
          (w) => now - w.start < waveDuration,
        )
        if (wavesRef.current.length < maxWaves)
          wavesRef.current.push({ x: e.clientX, y: e.clientY, start: now })
      }
    }
    function onMouseLeave() {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    function onKey(e: KeyboardEvent) {
      const setBoth = <T,>(
        stateSetter: (v: T) => void,
        ref: React.MutableRefObject<T>,
        v: T,
      ) => {
        stateSetter(v)
        ref.current = v
      }
      if (e.key === 'ArrowLeft') setBoth(setMode, modeRef, 'left')
      if (e.key === 'ArrowRight') setBoth(setMode, modeRef, 'right')
      if (e.key === 'ArrowUp') setBoth(setMode, modeRef, 'full')
      if (e.key === 'ArrowDown') setBoth(setMode, modeRef, 'sides')
      if (e.key === 's') setBoth(setContent, contentRef, 'square')
      if (e.key === 't') setBoth(setContent, contentRef, 'string')
      if (e.key === 'r') setBoth(setContent, contentRef, 'rowcol')
      if (e.key === 'f') setBoth(setStyle, styleRef, 'fade')
      if (e.key === 'm') setBoth(setStyle, styleRef, 'matrix')
      if (e.key === '1') setBoth(setEffect, effectRef, 'none')
      if (e.key === '2') setBoth(setEffect, effectRef, 'repulse')
      if (e.key === '3') setBoth(setEffect, effectRef, 'attract')
      if (e.key === '4') setBoth(setEffect, effectRef, 'orbit')
      if (e.key === '5') setBoth(setEffect, effectRef, 'wave')
    }

    resize()
    animationRef.current = requestAnimationFrame(drawLoop)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)
    window.addEventListener('keydown', onKey)

    return () => {
      mounted = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
    }
  }, [cellSize, centerGapFraction, contentString])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
