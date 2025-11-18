import React, { useCallback, useEffect, useRef, useState } from 'react'

type PipeType = 'I' | 'L' | 'T' | '+'
type Pipe = { type: PipeType; dirs: number[] }
type PipeOrEmpty = Pipe | null
type CellRC = { r: number; c: number }

const CELL = 80
const PIPE_TYPES: PipeType[] = ['I', 'L', 'T', '+']
const ROT_TABLE: Record<PipeType, number[][]> = {
  I: [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
  ],
  L: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
  ],
  '+': [[1, 1, 1, 1]],
}

const randomPipe = (): Pipe => {
  const t = PIPE_TYPES[Math.floor(Math.random() * PIPE_TYPES.length)]
  const ori = ROT_TABLE[t][Math.floor(Math.random() * ROT_TABLE[t].length)]
  return { type: t, dirs: ori }
}

function chooseTypeFromDirs(dirs: number[]): PipeType {
  const count = dirs.filter((v) => v).length
  if (count === 4) return '+'
  if (count === 3) return 'T'
  if (count === 2) {
    const pairs = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ]
    for (const p of pairs) if (dirs[p[0]] && dirs[p[1]]) return 'L'
    return 'I'
  }
  return 'I'
}

function parseInputRC(str: string): CellRC {
  const [r, c] = str.split(',').map(Number)
  return { r, c }
}

function parseListRC(str: string): CellRC[] {
  if (!str.trim()) return []
  return str.split(';').map((x) => {
    const [r, c] = x.split(',').map(Number)
    return { r, c }
  })
}

export const PipelineGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [ROWS, setROWS] = useState(5)
  const [COLS, setCOLS] = useState(5)
  const [pipeDensity, setPipeDensity] = useState(0.3)
  const [grid, setGrid] = useState<PipeOrEmpty[][]>([])
  const [startCell, setStartCell] = useState<CellRC>({ r: 0, c: 0 })
  const [endCell, setEndCell] = useState<CellRC>({ r: 4, c: 4 })
  const [waypoints, setWaypoints] = useState<CellRC[]>([])
  const [status, setStatus] = useState('')

  const inBoard = (r: number, c: number) =>
    r >= 0 && c >= 0 && r < ROWS && c < COLS
  const neighbor = (r: number, c: number, dir: number) => {
    if (dir === 0) return { r: r - 1, c }
    if (dir === 1) return { r, c: c + 1 }
    if (dir === 2) return { r: r + 1, c }
    if (dir === 3) return { r, c: c - 1 }
    return { r, c }
  }

  const isStart = useCallback(
    (r: number, c: number) => startCell.r === r && startCell.c === c,
    [startCell.c, startCell.r],
  )
  const isEnd = useCallback(
    (r: number, c: number) => endCell.r === r && endCell.c === c,
    [endCell.c, endCell.r],
  )
  const isWaypoint = useCallback(
    (r: number, c: number) => waypoints.some((p) => p.r === r && p.c === c),
    [waypoints],
  )

  const getDirs = (r: number, c: number) => {
    const pipe = grid[r]?.[c]
    if (!pipe) return []
    return pipe.dirs
      .map((v, i) => (v ? i : null))
      .filter((v) => v !== null) as number[]
  }

  const connects = (a: CellRC, b: CellRC, dir: number) => {
    const rev = (dir + 2) % 4
    return getDirs(b.r, b.c).includes(rev)
  }

  const drawCell = useCallback(
    (ctx: CanvasRenderingContext2D, r: number, c: number) => {
      const x = c * CELL,
        y = r * CELL
      ctx.fillStyle = '#111'
      ctx.fillRect(x, y, CELL, CELL)
      ctx.strokeStyle = '#444'
      ctx.lineWidth = 2
      ctx.strokeRect(x + 2, y + 2, CELL - 4, CELL - 4)

      if (isStart(r, c)) return drawSpecial(ctx, r, c, 'green')
      if (isEnd(r, c)) return drawSpecial(ctx, r, c, 'red')
      if (isWaypoint(r, c)) return drawWaypoint(ctx, r, c)

      const pipe = grid[r]?.[c]
      if (!pipe) return
      drawPipe(ctx, r, c, pipe)
    },
    [grid, isEnd, isStart, isWaypoint],
  )

  // ===============================
  // Tạo grid playable
  // ===============================
  const generatePlayableGrid = (
    rows: number,
    cols: number,
    start: CellRC,
    end: CellRC,
    density: number,
  ): PipeOrEmpty[][] => {
    const emptyGrid: PipeOrEmpty[][] = []
    for (let r = 0; r < rows; r++) emptyGrid.push(Array(cols).fill(null))

    // random pipe thử nghiệm xung quanh
    const placeRandomPipe = () => {
      const r = Math.floor(Math.random() * rows)
      const c = Math.floor(Math.random() * cols)
      if (!emptyGrid[r][c]) emptyGrid[r][c] = randomPipe()
    }

    // đảm bảo có ít nhất 1 đường nối start->end
    const hasPath = (grid: PipeOrEmpty[][]): boolean => {
      const visited = new Set<string>()
      const stack: CellRC[] = [{ ...start }]
      while (stack.length) {
        const cur = stack.pop()!
        const key = `${cur.r},${cur.c}`
        if (visited.has(key)) continue
        visited.add(key)
        if (cur.r === end.r && cur.c === end.c) return true
        const dirs = getDirs(cur.r, cur.c)
        dirs.forEach((d) => {
          const nb = neighbor(cur.r, cur.c, d)
          if (!inBoard(nb.r, nb.c)) return
          if (!grid[nb.r][nb.c]) return
          if (connects(cur, nb, d)) stack.push(nb)
        })
      }
      return false
    }

    // đặt pipe ngẫu nhiên cho đến khi có ít nhất 1 đường
    let attempts = 0
    while (!hasPath(emptyGrid) && attempts < 1000) {
      placeRandomPipe()
      attempts++
    }

    // thêm pipe ngẫu nhiên các ô còn lại theo density
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if (!emptyGrid[r][c] && Math.random() < density)
          emptyGrid[r][c] = randomPipe()

    return emptyGrid
  }

  const initGame = (
    rows: number,
    cols: number,
    start: CellRC,
    end: CellRC,
    waypointsOrder: CellRC[],
    density: number,
  ) => {
    setROWS(rows)
    setCOLS(cols)
    setStartCell(start)
    setEndCell(end)
    setWaypoints(waypointsOrder)
    setPipeDensity(density)

    const newGrid = generatePlayableGrid(rows, cols, start, end, density)
    setGrid(newGrid)
    setStatus('')
  }

  // ===============================
  // Draw
  // ===============================
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = COLS * CELL
    canvas.height = ROWS * CELL
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) drawCell(ctx, r, c)
  }, [COLS, ROWS, drawCell])

  const drawSpecial = (
    ctx: CanvasRenderingContext2D,
    r: number,
    c: number,
    color: string,
  ) => {
    const x = c * CELL,
      y = r * CELL
    ctx.fillStyle = color
    ctx.fillRect(x + 10, y + 10, CELL - 20, CELL - 20)
  }

  const drawWaypoint = (
    ctx: CanvasRenderingContext2D,
    r: number,
    c: number,
  ) => {
    const x = c * CELL,
      y = r * CELL
    ctx.fillStyle = 'yellow'
    ctx.beginPath()
    ctx.arc(x + CELL / 2, y + CELL / 2, 12, 0, Math.PI * 2)
    ctx.fill()
  }

  const drawPipe = (
    ctx: CanvasRenderingContext2D,
    r: number,
    c: number,
    pipe: Pipe,
  ) => {
    const x = c * CELL,
      y = r * CELL
    const cx = x + CELL / 2,
      cy = y + CELL / 2
    ctx.strokeStyle = '#00aaff'
    ctx.lineWidth = 14
    pipe.dirs.forEach((v, dir) => {
      if (!v) return
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      switch (dir) {
        case 0:
          ctx.lineTo(cx, y)
          break
        case 1:
          ctx.lineTo(x + CELL, cy)
          break
        case 2:
          ctx.lineTo(cx, y + CELL)
          break
        case 3:
          ctx.lineTo(x, cy)
          break
      }
      ctx.stroke()
    })
  }

  const rotatePipe = (r: number, c: number) => {
    const newGrid = grid.map((row) =>
      row.map((cell) => (cell ? { ...cell } : null)),
    )
    const pipe = newGrid[r]?.[c]
    if (!pipe) return
    const list = ROT_TABLE[pipe.type]
    let idx = list.findIndex((a) => a.every((v, i) => v === pipe.dirs[i]))
    idx = (idx + 1) % list.length
    pipe.dirs = list[idx]
    setGrid(newGrid)
  }

  const handleCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = ev.clientX - rect.left
    const my = ev.clientY - rect.top
    const r = Math.floor(my / CELL)
    const c = Math.floor(mx / CELL)
    if (!inBoard(r, c)) return
    if (isStart(r, c) || isEnd(r, c) || isWaypoint(r, c)) return
    rotatePipe(r, c)
    draw()
  }

  // ===============================
  // Check win
  // ===============================
  const checkWin = () => {
    const visited = new Set<string>()
    const stack: CellRC[] = [{ r: startCell.r, c: startCell.c }]
    const visitedWaypoints: CellRC[] = []

    while (stack.length) {
      const cur = stack.pop()!
      const key = `${cur.r},${cur.c}`
      if (visited.has(key)) continue
      visited.add(key)
      if (isWaypoint(cur.r, cur.c)) visitedWaypoints.push(cur)

      const dirs = getDirs(cur.r, cur.c)
      dirs.forEach((d) => {
        const nb = neighbor(cur.r, cur.c, d)
        if (!inBoard(nb.r, nb.c)) return
        if (!grid[nb.r][nb.c]) return
        if (connects(cur, nb, d)) stack.push(nb)
      })
    }

    const endReached = visited.has(`${endCell.r},${endCell.c}`)
    const orderCorrect =
      visitedWaypoints.length === waypoints.length &&
      waypoints.every(
        (wp, i) =>
          wp.r === visitedWaypoints[i]?.r && wp.c === visitedWaypoints[i]?.c,
      )

    if (endReached && orderCorrect)
      setStatus('SUCCESS! ✅ Waypoints đúng thứ tự')
    else if (endReached) setStatus('SUCCESS nhưng waypoint sai thứ tự ⚠️')
    else setStatus('WRONG PATH ❌')
  }

  useEffect(() => {
    if (grid.length > 0) draw()
  }, [grid, ROWS, COLS, draw])

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20, color: 'white' }}>
      <div style={{ background: '#222', padding: 15, borderRadius: 8 }}>
        <h3>Config</h3>
        <label>
          Rows:{' '}
          <input
            type="number"
            value={ROWS}
            onChange={(e) => setROWS(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Cols:{' '}
          <input
            type="number"
            value={COLS}
            onChange={(e) => setCOLS(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Pipe density:{' '}
          <input
            type="number"
            value={pipeDensity}
            step={0.1}
            min={0}
            max={1}
            onChange={(e) => setPipeDensity(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          Start (r,c):{' '}
          <input id="start" defaultValue={`${startCell.r},${startCell.c}`} />
        </label>
        <br />
        <label>
          End (r,c):{' '}
          <input id="end" defaultValue={`${endCell.r},${endCell.c}`} />
        </label>
        <br />
        <label>
          Waypoints (r,c;r,c): <input id="waypoints" defaultValue="" />
        </label>
        <br />
        <br />
        <button
          onClick={() => {
            const start = parseInputRC(
              (document.getElementById('start') as HTMLInputElement).value,
            )
            const end = parseInputRC(
              (document.getElementById('end') as HTMLInputElement).value,
            )
            const wps = parseListRC(
              (document.getElementById('waypoints') as HTMLInputElement).value,
            )
            initGame(ROWS, COLS, start, end, wps, pipeDensity)
          }}
        >
          Generate
        </button>{' '}
        <button onClick={checkWin}>Check</button>
        <div style={{ marginTop: 10 }}>{status}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        style={{ background: '#000', border: '1px solid #444' }}
        onClick={handleCanvasClick}
      />
    </div>
  )
}
