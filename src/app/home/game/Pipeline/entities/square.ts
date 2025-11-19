import { Direction, PipeType, SquareOptions, SquareType } from '../types/square'

export const DIRECTION_BIT: Record<Direction, number> = {
  top: 1 << 0, // 0001
  right: 1 << 1, // 0010
  bottom: 1 << 2, // 0100
  left: 1 << 3, // 1000
}

export const PIPE_CONNECTIONS: Record<PipeType, number> = {
  I: DIRECTION_BIT.top | DIRECTION_BIT.bottom,
  L: DIRECTION_BIT.top | DIRECTION_BIT.right,
  T: DIRECTION_BIT.left | DIRECTION_BIT.top | DIRECTION_BIT.right,
  '+':
    DIRECTION_BIT.top |
    DIRECTION_BIT.right |
    DIRECTION_BIT.bottom |
    DIRECTION_BIT.left,
}

export const DEFAULT_SQUARE_POINTS: Record<SquareType, number> = {
  normal: 2,
  start: 0,
  end: 0,
  waypoint: 10,
}

export default class Square {
  x: number
  y: number
  size: number
  baseSize: number // Size gốc của 1 cell
  pipeType?: PipeType
  type: SquareType
  connections: number // bitmask
  rotation: number
  debug?: boolean = false
  row?: number
  col?: number
  imageMap?: Partial<Record<PipeType, HTMLImageElement>>
  point: number

  // New properties
  sizeMultiplier: number // Nhân size
  occupiedRows: number // Số rows chiếm
  occupiedCols: number // Số cols chiếm

  constructor(props: SquareOptions) {
    const {
      x = 0,
      y = 0,
      size = 50,
      pipeType = 'L',
      type = 'normal',
      debug = false,
      imageMap,
      connections = [],
      point,
      sizeMultiplier = 1,
      occupiedRows = 1,
      occupiedCols = 1,
    } = props

    this.baseSize = size
    this.sizeMultiplier = sizeMultiplier
    this.occupiedRows = occupiedRows
    this.occupiedCols = occupiedCols

    // Calculate actual size
    this.size = size * sizeMultiplier

    this.x = x
    this.y = y
    this.type = type
    this.debug = debug
    this.imageMap = imageMap
    this.rotation = 0
    this.col = props.col
    this.row = props.row

    this.point = point ?? DEFAULT_SQUARE_POINTS[type]

    if (type === 'normal') {
      this.pipeType = pipeType
      this.connections = PIPE_CONNECTIONS[pipeType]
    } else {
      this.connections = 0
      connections.forEach((d) => {
        this.connections |= DIRECTION_BIT[d]
      })
    }
  }

  rotate() {
    if (this.type !== 'normal') return
    this.connections =
      ((this.connections << 1) | (this.connections >> 3)) & 0b1111
    this.rotation = (this.rotation + 1) % 4
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
    ctx.rotate((Math.PI / 2) * this.rotation)

    this.drawPipe(ctx)
    ctx.restore()

    if (this.debug) this.renderDebug(ctx)
  }

  drawPipe(ctx: CanvasRenderingContext2D) {
    const s = this.size
    const w = s * 0.3

    if (
      this.type === 'normal' &&
      this.imageMap &&
      this.pipeType &&
      this.imageMap[this.pipeType]
    ) {
      const img = this.imageMap[this.pipeType]!
      ctx.drawImage(img, -s / 2, -s / 2, s, s)
      return
    }

    ctx.fillStyle =
      this.type === 'start'
        ? 'green'
        : this.type === 'end'
        ? 'red'
        : this.type === 'waypoint'
        ? 'orange'
        : '#333'

    switch (this.pipeType) {
      case 'I':
        ctx.fillRect(-w / 2, -s / 2, w, s)
        break
      case 'L':
        ctx.fillRect(-w / 2, -s / 2, w, s / 2)
        ctx.fillRect(0, -w / 2, s / 2, w)
        break
      case 'T':
        ctx.fillRect(-w / 2, -s / 2, w, s / 2)
        ctx.fillRect(-s / 2, -w / 2, s, w)
        break
      case '+':
        ctx.fillRect(-w / 2, -s / 2, w, s)
        ctx.fillRect(-s / 2, -w / 2, s, w)
        break
      default:
        // start / end / waypoint
        ctx.fillRect(-s / 2, -s / 2, s, s)

        if (this.type === 'waypoint') {
          ctx.fillStyle = 'white'
          ctx.font = `${s * 0.3}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('★', 0, 0)
        }

        // Draw labels for large special squares
        if (this.type === 'start' || this.type === 'end') {
          ctx.fillStyle = 'white'
          ctx.font = `bold ${s * 0.2}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(this.type.toUpperCase(), 0, 0)
        }
    }
  }

  renderDebug(ctx: CanvasRenderingContext2D) {
    const cx = this.x
    const cy = this.y
    const s = this.size
    const pad = 6

    ctx.fillStyle = 'yellow'

    if (this.connections & DIRECTION_BIT.top)
      ctx.fillRect(cx + s / 2 - 3, cy + pad, 6, 6)
    if (this.connections & DIRECTION_BIT.right)
      ctx.fillRect(cx + s - pad - 6, cy + s / 2 - 3, 6, 6)
    if (this.connections & DIRECTION_BIT.bottom)
      ctx.fillRect(cx + s / 2 - 3, cy + s - pad - 6, 6, 6)
    if (this.connections & DIRECTION_BIT.left)
      ctx.fillRect(cx + pad, cy + s / 2 - 3, 6, 6)
  }

  containsPoint(x: number, y: number): boolean {
    return (
      x >= this.x &&
      x <= this.x + this.size &&
      y >= this.y &&
      y <= this.y + this.size
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick(_x: number, _y: number) {
    if (this.type !== 'normal') return
    this.rotate()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_dt: number) {
    // update logic
  }

  // Helper: Get center position for connections
  getCenterX(): number {
    return this.x + this.size / 2
  }

  getCenterY(): number {
    return this.y + this.size / 2
  }

  // Helper: Check if this square occupies a specific grid cell
  occupiesCell(row: number, col: number): boolean {
    if (!this.row || !this.col) return false
    return (
      row >= this.row &&
      row < this.row + this.occupiedRows &&
      col >= this.col &&
      col < this.col + this.occupiedCols
    )
  }
}
