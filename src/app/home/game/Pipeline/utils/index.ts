import { DIR, OPPOSITE } from '../constant/pipe'
import Square from '../entities/square'
import { Direction } from '../types/square'

export function rotateDirections(dirs: Direction[]): Direction[] {
  const order: Direction[] = ['top', 'right', 'bottom', 'left']

  return dirs.map((d) => {
    const idx = order.indexOf(d)
    return order[(idx + 1) % 4]
  })
}

function getNeighborPos(row: number, col: number, dir: number) {
  if (dir === DIR.top) return { row: row - 1, col }
  if (dir === DIR.bottom) return { row: row + 1, col }
  if (dir === DIR.left) return { row, col: col - 1 }
  if (dir === DIR.right) return { row, col: col + 1 }
  return { row, col }
}

export function checkPipeline(entities: Square[]) {
  const grid = new Map<string, Square>()
  const starts: Square[] = []
  const ends: Square[] = []
  for (const s of entities) {
    const key = `${s.row},${s.col}`
    grid.set(key, s)
    if (s.type === 'start') starts.push(s)
    if (s.type === 'end') ends.push(s)
  }

  const results: {
    start: Square
    end: Square
    connectedCount: number
    path: Square[]
  }[] = []
  for (const start of starts) {
    const visited = new Set<string>()
    const parent = new Map<string, Square>()
    const queue: { sq: Square; incomingDir: number | null }[] = []
    const startKey = `${start.row},${start.col}`
    queue.push({ sq: start, incomingDir: null })
    visited.add(startKey)
    let foundEnd: Square | null = null
    while (queue.length > 0) {
      const { sq, incomingDir } = queue.shift()!
      if (sq.type === 'end') {
        foundEnd = sq
        break
      }
      const connMask = sq.connections ?? 0
      for (const dir of [DIR.top, DIR.right, DIR.bottom, DIR.left]) {
        if ((connMask & dir) === 0) continue
        if (incomingDir && dir === incomingDir) continue
        const pos = getNeighborPos(sq.row!, sq.col!, dir)
        const neighbor = grid.get(`${pos.row},${pos.col}`)
        if (!neighbor) continue
        const opp = OPPOSITE[dir]
        const nbMask = neighbor.connections ?? 0
        if ((nbMask & opp) === 0) continue
        const key = `${neighbor.row},${neighbor.col}`
        if (!visited.has(key)) {
          visited.add(key)
          parent.set(key, sq)
          queue.push({ sq: neighbor, incomingDir: opp })
        }
      }
    }
    if (foundEnd) {
      const path: Square[] = []
      let current: Square | undefined = foundEnd
      while (current) {
        path.unshift(current)
        if (current === start) break
        const key = `${current.row},${current.col}`
        current = parent.get(key)
      }
      results.push({
        start,
        end: foundEnd,
        connectedCount: path.length,
        path,
      })
    }
  }

  return results
}
