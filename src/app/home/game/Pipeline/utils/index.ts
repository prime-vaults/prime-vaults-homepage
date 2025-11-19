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

function getEdgeCells(sq: Square, dir: number) {
  const cells: { row: number; col: number }[] = []
  const r0 = sq.row!
  const c0 = sq.col!
  if (dir === DIR.top) {
    for (let c = 0; c < sq.occupiedCols; c++) {
      cells.push({ row: r0, col: c0 + c })
    }
  }
  if (dir === DIR.bottom) {
    for (let c = 0; c < sq.occupiedCols; c++) {
      cells.push({ row: r0 + sq.occupiedRows - 1, col: c0 + c })
    }
  }
  if (dir === DIR.left) {
    for (let r = 0; r < sq.occupiedRows; r++) {
      cells.push({ row: r0 + r, col: c0 })
    }
  }
  if (dir === DIR.right) {
    for (let r = 0; r < sq.occupiedRows; r++) {
      cells.push({ row: r0 + r, col: c0 + sq.occupiedCols - 1 })
    }
  }
  return cells
}

function getNeighborCell(cell: { row: number; col: number }, dir: number) {
  return getNeighborPos(cell.row, cell.col, dir)
}

export function checkPipeline(entities: Square[]) {
  const grid = new Map<string, Square>()
  const starts: Square[] = []
  const ends: Square[] = []
  for (const s of entities) {
    for (let r = 0; r < s.occupiedRows; r++) {
      for (let c = 0; c < s.occupiedCols; c++) {
        const key = `${s.row! + r},${s.col! + c}`
        grid.set(key, s)
      }
    }
    if (s.type === 'start') starts.push(s)
    if (s.type === 'end') ends.push(s)
  }
  const results: {
    start: Square
    end: Square
    connectedCount: number
    totalPoints: number
    path: Square[]
  }[] = []
  for (const start of starts) {
    const visited = new Set<Square>()
    const parent = new Map<Square, Square>()
    const queue: { sq: Square; incomingDir: number | null }[] = []
    queue.push({ sq: start, incomingDir: null })
    visited.add(start)
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
        const edgeCells = getEdgeCells(sq, dir)
        for (const cell of edgeCells) {
          const pos = getNeighborCell(cell, dir)
          const neighbor = grid.get(`${pos.row},${pos.col}`)
          if (!neighbor || neighbor === sq) continue
          const opp = OPPOSITE[dir]
          const nbMask = neighbor.connections ?? 0
          if ((nbMask & opp) === 0) continue
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            parent.set(neighbor, sq)
            queue.push({ sq: neighbor, incomingDir: opp })
          }
        }
      }
    }
    if (foundEnd) {
      const path: Square[] = []
      let current: Square | undefined = foundEnd
      let totalPoints = 0
      while (current) {
        path.unshift(current)
        totalPoints += current.point
        if (current === start) break
        current = parent.get(current)
      }
      results.push({
        start,
        end: foundEnd,
        connectedCount: path.length,
        totalPoints,
        path,
      })
    }
  }

  return results
}
