import React, {
  useRef,
  useState,
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'

export interface PixelTransitionHandle {
  reset: () => void
  start: () => void
}

function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

interface PixelTransitionProps {
  children: React.ReactNode
  gridSize?: number
  pixelColor?: string[]
  animationDuration?: number // tổng thời gian ms
  className?: string
  style?: CSSProperties
  trigger?: boolean
  onClosed?: () => void
  onPhase1Start?: () => void
  onPhase1End?: () => void
}

const PixelTransition = forwardRef<PixelTransitionHandle, PixelTransitionProps>(
  (
    {
      children,
      gridSize = 7,
      pixelColor = 'var(--color-primary)',
      animationDuration = 1000,
      className = '',
      style = {},
      trigger,
      onClosed = () => {},
      onPhase1Start,
      onPhase1End,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true)
    const [animating, setAnimating] = useState(false)
    const [phase, setPhase] = useState<'idle' | 'phase1' | 'phase2'>('idle')

    const pixelGridRef = useRef<HTMLDivElement>(null)
    const prevTrigger = useRef<boolean>(false)

    useLayoutEffect(() => {
      const gridEl = pixelGridRef.current
      if (!gridEl) return

      gridEl.innerHTML = ''
      const size = 100 / gridSize

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement('div')
          Object.assign(pixel.style, {
            position: 'absolute',
            backgroundColor: pixelColor,
            width: `${size}%`,
            height: `${size}%`,
            left: `${col * size}%`,
            top: `${row * size}%`,
            opacity: '0',
            transition: `opacity 0.3s ease`,
          })
          gridEl.appendChild(pixel)
        }
      }
    }, [gridSize, pixelColor, visible])

    const runAnimation = useCallback(() => {
      if (animating || !visible) return
      setAnimating(true)
      setPhase('phase1')
      onPhase1Start?.() // <== báo callback khi bắt đầu phase1

      const gridEl = pixelGridRef.current
      if (!gridEl) return
      const pixels = Array.from(gridEl.children) as HTMLDivElement[]

      const phase1Duration = animationDuration * 0.5
      const phase2Duration = animationDuration * 0.5

      pixels.forEach((p) => {
        p.style.opacity = '1'
        p.style.transitionDelay = Math.random() * (phase1Duration / 1000) + 's'
      })

      setTimeout(() => {
        onPhase1End?.() // <== báo callback khi phase1 kết thúc
        setPhase('phase2')
        pixels.forEach((p) => {
          p.style.opacity = '0'
          p.style.transitionDelay =
            Math.random() * (phase2Duration / 1000) + 's'
        })

        setTimeout(() => {
          setVisible(false)
          setAnimating(false)
          setPhase('idle')
          onClosed()
        }, phase2Duration)
      }, phase1Duration)
    }, [
      animating,
      visible,
      animationDuration,
      onClosed,
      onPhase1Start,
      onPhase1End,
    ])

    useEffect(() => {
      if (trigger && !prevTrigger.current) {
        runAnimation()
      }
      prevTrigger.current = !!trigger
    }, [trigger, runAnimation])

    useImperativeHandle(ref, () => ({
      reset: () => {
        setVisible(true)
        setPhase('idle')
        setAnimating(false)
        const gridEl = pixelGridRef.current
        if (gridEl) {
          const pixels = Array.from(gridEl.children) as HTMLDivElement[]
          pixels.forEach((p) => {
            p.style.opacity = '0'
            p.style.transitionDelay = '0s'
          })
        }
      },
      start: () => runAnimation(),
    }))

    if (!visible) return null

    return (
      <div className={`fixed inset-0 z-[9999] ${className}`} style={style}>
        {phase !== 'phase2' && (
          <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
        )}
        <div
          ref={pixelGridRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </div>
    )
  },
)

export default PixelTransition
