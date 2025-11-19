import { MessageOptions } from '../types/message'

export default class Message {
  x: number
  y: number
  size: number

  text: string | null = null
  life = 0
  maxLife = 0

  constructor(props: MessageOptions) {
    const { x = 0, y = 0, size = 50 } = props

    this.x = x
    this.y = y
    this.size = size
  }

  drawText(ctx: CanvasRenderingContext2D, text: string, duration = 1000) {
    if (!text) return

    this.text = text
    this.life = duration
    this.maxLife = duration

    ctx.save()
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2)

    const s = this.size
    ctx.fillStyle = 'white'
    ctx.font = `${s * 0.3}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 0, 0)
    ctx.restore()
  }

  removeText(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(this.x, this.y, this.size, this.size)
    this.text = null
  }

  update(dt: number, ctx: CanvasRenderingContext2D) {
    if (!this.text) return

    this.life -= dt

    if (this.life <= 0) {
      this.removeText(ctx)
    }
  }

  reset(ctx: CanvasRenderingContext2D) {
    this.removeText(ctx)
    this.life = 0
    this.text = null
  }
}
