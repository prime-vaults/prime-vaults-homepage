import { CellConfig } from '../types/square'

type Difficulty = 'easy' | 'normal' | 'hard' | 'extreme'
type Direction = 'top' | 'right' | 'bottom' | 'left'
type PipeType = 'I' | 'L' | 'T' | '+'

interface StartCell {
  row: number
  col: number
  connections: Direction[]
}

interface EndCell {
  row: number
  col: number
  connections: Direction[]
}

interface GeneratorConfig {
  gridSize: { rows: number; cols: number }
  starts: StartCell[]
  end: EndCell
  difficulty: Difficulty
  noiseLevel?: number
}

interface PathCell {
  row: number
  col: number
  entryDir: Direction
  exitDir: Direction
}

class PipelineGenerator {
  private config: GeneratorConfig
  private pathCells: Map<string, PathCell> = new Map()
  private occupiedCells: Set<string> = new Set()

  constructor(config: GeneratorConfig) {
    this.config = config
  }

  private getOppositeDirection(dir: Direction): Direction {
    const opposites: Record<Direction, Direction> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    }
    return opposites[dir]
  }

  private getNextPosition(
    row: number,
    col: number,
    dir: Direction,
  ): [number, number] {
    const moves: Record<Direction, [number, number]> = {
      top: [-1, 0],
      bottom: [1, 0],
      left: [0, -1],
      right: [0, 1],
    }
    const [dr, dc] = moves[dir]
    return [row + dr, col + dc]
  }

  private isValidPosition(row: number, col: number): boolean {
    return (
      row >= 0 &&
      row < this.config.gridSize.rows &&
      col >= 0 &&
      col < this.config.gridSize.cols
    )
  }

  private getTurnProbability(): number {
    const turnProbs = {
      easy: 0.2,
      normal: 0.4,
      hard: 0.6,
      extreme: 0.8,
    }
    return turnProbs[this.config.difficulty]
  }

  private generatePathFromStart(start: StartCell): boolean {
    const { row: endRow, col: endCol } = this.config.end
    const maxAttempts = 100

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const tempPath: PathCell[] = []
      const visited = new Set<string>()

      let currentRow = start.row
      let currentCol = start.col
      let currentDir = start.connections[0]

      visited.add(`${currentRow},${currentCol}`)

      let steps = 0
      const maxSteps = this.config.gridSize.rows * this.config.gridSize.cols * 2

      while (steps < maxSteps) {
        const [nextRow, nextCol] = this.getNextPosition(
          currentRow,
          currentCol,
          currentDir,
        )

        // Kiểm tra nếu đến end
        if (nextRow === endRow && nextCol === endCol) {
          // Kiểm tra xem direction có match với end connections không
          const oppositeDir = this.getOppositeDirection(currentDir)
          if (this.config.end.connections.includes(oppositeDir)) {
            // Success! Lưu path
            tempPath.forEach((cell) => {
              const key = `${cell.row},${cell.col}`
              this.pathCells.set(key, cell)
              this.occupiedCells.add(key)
            })
            return true
          } else {
            break // Try again
          }
        }

        // Kiểm tra valid
        if (!this.isValidPosition(nextRow, nextCol)) {
          break
        }

        const nextKey = `${nextRow},${nextCol}`

        // Kiểm tra đã occupied bởi path khác chưa
        if (this.occupiedCells.has(nextKey)) {
          break
        }

        // Kiểm tra đã visit trong path này chưa
        if (visited.has(nextKey)) {
          break
        }

        // Di chuyển đến vị trí mới
        const entryDir = this.getOppositeDirection(currentDir)

        // Quyết định hướng tiếp theo
        let nextDir = currentDir
        const turnProb = this.getTurnProbability()

        if (Math.random() < turnProb) {
          // Thử đổi hướng
          const possibleDirs = this.getPossibleDirections(
            nextRow,
            nextCol,
            currentDir,
            visited,
          )

          if (possibleDirs.length > 0) {
            // Ưu tiên hướng về phía end
            const towardEnd = this.getDirectionTowardEnd(nextRow, nextCol)
            if (possibleDirs.includes(towardEnd)) {
              nextDir = towardEnd
            } else {
              nextDir =
                possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
            }
          }
        } else {
          // Đi thẳng, nhưng kiểm tra có bị chặn không
          const straightAhead = this.getNextPosition(
            nextRow,
            nextCol,
            currentDir,
          )
          if (
            !this.isValidPosition(straightAhead[0], straightAhead[1]) ||
            visited.has(`${straightAhead[0]},${straightAhead[1]}`) ||
            this.occupiedCells.has(`${straightAhead[0]},${straightAhead[1]}`)
          ) {
            // Phải đổi hướng
            const possibleDirs = this.getPossibleDirections(
              nextRow,
              nextCol,
              currentDir,
              visited,
            )
            if (possibleDirs.length > 0) {
              const towardEnd = this.getDirectionTowardEnd(nextRow, nextCol)
              if (possibleDirs.includes(towardEnd)) {
                nextDir = towardEnd
              } else {
                nextDir =
                  possibleDirs[Math.floor(Math.random() * possibleDirs.length)]
              }
            } else {
              break // Dead end
            }
          }
        }

        tempPath.push({
          row: nextRow,
          col: nextCol,
          entryDir: entryDir,
          exitDir: nextDir,
        })

        visited.add(nextKey)
        currentRow = nextRow
        currentCol = nextCol
        currentDir = nextDir
        steps++
      }
    }

    return false
  }

  private getPossibleDirections(
    row: number,
    col: number,
    currentDir: Direction,
    visited: Set<string>,
  ): Direction[] {
    const allDirs: Direction[] = ['top', 'right', 'bottom', 'left']
    const opposite = this.getOppositeDirection(currentDir)

    return allDirs.filter((dir) => {
      if (dir === opposite) return false

      const [nextRow, nextCol] = this.getNextPosition(row, col, dir)
      if (!this.isValidPosition(nextRow, nextCol)) return false

      const nextKey = `${nextRow},${nextCol}`
      if (visited.has(nextKey) || this.occupiedCells.has(nextKey)) return false

      return true
    })
  }

  private getDirectionTowardEnd(row: number, col: number): Direction {
    const { row: endRow, col: endCol } = this.config.end
    const rowDiff = endRow - row
    const colDiff = endCol - col

    if (Math.abs(rowDiff) > Math.abs(colDiff)) {
      return rowDiff > 0 ? 'bottom' : 'top'
    } else {
      return colDiff > 0 ? 'right' : 'left'
    }
  }

  private getPipeType(entryDir: Direction, exitDir: Direction): PipeType {
    // Nếu đi thẳng (entry và exit đối nhau)
    const oppositeExit = this.getOppositeDirection(exitDir)
    if (entryDir === oppositeExit) {
      return 'I'
    }

    // Nếu rẽ góc 90 độ
    return 'L'
  }

  private addNoisePipes(cells: CellConfig[]): CellConfig[] {
    const noiseLevel = this.config.noiseLevel || 0
    if (noiseLevel === 0) return cells

    const maxNoise = Math.floor(
      this.config.gridSize.rows * this.config.gridSize.cols * noiseLevel,
    )

    const noisePipes: CellConfig[] = []
    const pipeTypes: PipeType[] = ['I', 'L', 'T', '+']

    let added = 0
    let attempts = 0
    const maxAttempts = maxNoise * 10

    while (added < maxNoise && attempts < maxAttempts) {
      const row = Math.floor(Math.random() * this.config.gridSize.rows)
      const col = Math.floor(Math.random() * this.config.gridSize.cols)
      const key = `${row},${col}`

      if (!this.occupiedCells.has(key)) {
        const type = pipeTypes[Math.floor(Math.random() * pipeTypes.length)]
        noisePipes.push([row, col, type])
        this.occupiedCells.add(key)
        added++
      }

      attempts++
    }

    return [...cells, ...noisePipes]
  }

  generate(): CellConfig[] {
    const cells: CellConfig[] = []

    // Add tất cả starts
    this.config.starts.forEach((start) => {
      cells.push({
        row: start.row,
        col: start.col,
        type: 'start',
        connections: start.connections,
      })
      this.occupiedCells.add(`${start.row},${start.col}`)
    })

    // Add end
    cells.push({
      row: this.config.end.row,
      col: this.config.end.col,
      type: 'end',
      connections: this.config.end.connections,
    })
    this.occupiedCells.add(`${this.config.end.row},${this.config.end.col}`)

    // Generate path từ mỗi start đến end
    for (const start of this.config.starts) {
      const success = this.generatePathFromStart(start)
      if (!success) {
        console.warn(
          `Could not generate path from start at (${start.row}, ${start.col})`,
        )
      }
    }

    // Convert pathCells thành CellConfig
    this.pathCells.forEach((pathCell) => {
      const pipeType = this.getPipeType(pathCell.entryDir, pathCell.exitDir)
      cells.push([pathCell.row, pathCell.col, pipeType])
    })

    // Add noise pipes
    const finalCells = this.addNoisePipes(cells)

    return finalCells
  }
}

export function generatePipeline(
  config: GeneratorConfig = exampleConfig,
): CellConfig[] {
  const generator = new PipelineGenerator(config)
  return generator.generate()
}

// Example usage
const exampleConfig: GeneratorConfig = {
  gridSize: { rows: 11, cols: 11 },
  starts: [
    { row: 0, col: 0, connections: ['right', 'bottom'] },
    { row: 0, col: 4, connections: ['right', 'bottom', 'left'] },
  ],
  end: { row: 10, col: 5, connections: ['left', 'top'] },
  difficulty: 'normal',
  noiseLevel: 0.1,
}

export const GENERATED_CELLS = generatePipeline()
