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

export default class Square {
  x: number
  y: number
  size: number
  pipeType?: PipeType
  type: SquareType
  connections: number // bitmask
  rotation: number
  debug?: boolean = false
  row?: number
  col?: number
  imageMap?: Partial<Record<PipeType, HTMLImageElement>>

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
    } = props

    this.x = x
    this.y = y
    this.size = size
    this.type = type
    this.debug = debug
    this.imageMap = imageMap
    this.rotation = 0
    this.col = props.col
    this.row = props.row

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
      this.type === 'start' ? 'green' : this.type === 'end' ? 'red' : '#333'

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
        // start / end
        ctx.fillRect(-s / 2, -s / 2, s, s)
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
}
