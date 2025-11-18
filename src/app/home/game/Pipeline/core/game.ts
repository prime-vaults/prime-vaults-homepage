import ActionManager from './action'
import Square from '../entities/square'
import { DEFAULT_CELLS } from '../constant'
import {
  WATER_ANIMATION_FILLING_SPEED,
  WATER_ANIMATION_FLOWING_SPEED,
} from '../constant/game'
import { checkPipeline } from '../utils'
import { SquareOptions } from '../types/square'
import { GENERATED_CELLS } from '../utils/pipeline'
import { FlowAnimation, PipelineGameConfig } from '../types/game'

export default class PipelineGame {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  config: PipelineGameConfig
  dpr: number

  public entities: Square[] = []
  private lastTime = 0
  private actionManager: ActionManager
  private flowAnimations: FlowAnimation[] = []

  constructor(config: PipelineGameConfig) {
    if (!config.canvas)
      throw new Error('PipelineGame requires { canvas } in config')
    this.canvas = config.canvas
    this.dpr = config.pixelRatio ?? window.devicePixelRatio ?? 1
    this._setupCanvasResolution()
    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Cannot get 2D context')
    this.ctx = ctx
    this.config = { debug: false, ...config }
    this.width = this.canvas.width / this.dpr
    this.height = this.canvas.height / this.dpr
    this.actionManager = new ActionManager(this)
    void this.actionManager
    this._initEntities()
    this._loop = this._loop.bind(this)
    requestAnimationFrame(this._loop)
  }

  private _setupCanvasResolution() {
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * this.dpr
    this.canvas.height = rect.height * this.dpr
    this.canvas.style.width = `${rect.width}px`
    this.canvas.style.height = `${rect.height}px`
    const ctx = this.canvas.getContext('2d')
    ctx?.scale(this.dpr, this.dpr)
  }

  private _initEntities() {
    const {
      row,
      col,
      activeCells = DEFAULT_CELLS || GENERATED_CELLS,
      debug = false,
      imageMap,
    } = this.config
    const sizeW = this.width / col
    const sizeH = this.height / row
    const size = Math.min(sizeW, sizeH)
    for (const cell of activeCells!) {
      if (Array.isArray(cell)) {
        const [r, c, pipeType] = cell
        this.addSquare({
          x: c * size,
          y: r * size,
          size,
          type: 'normal',
          pipeType,
          debug,
          imageMap,
          row: r,
          col: c,
        })
        continue
      }
      const { row: r, col: c, type, connections } = cell
      this.addSquare({
        x: c * size,
        y: r * size,
        size,
        type,
        connections: connections,
        debug,
        row: r,
        col: c,
      })
    }
  }
  private _drawFlowAnimation(
    result: {
      start: Square
      end: Square
      connectedCount: number
      path: Square[]
    },
    type: 'flowing' | 'filling' = 'flowing',
  ) {
    const { path } = result
    if (!path || path.length < 2) return
    const animation: FlowAnimation = {
      path,
      progress: 0,
      speed:
        type === 'filling'
          ? WATER_ANIMATION_FILLING_SPEED
          : WATER_ANIMATION_FLOWING_SPEED,
      particles: [],
      type,
    }
    if (type === 'flowing') {
      for (let i = 0; i < 5; i++) {
        animation.particles.push({
          offset: i * 0.2,
          progress: -i * 0.2,
        })
      }
    } else {
      animation.particles.push({
        offset: 0,
        progress: 0,
      })
    }
    this.flowAnimations.push(animation)
  }
  private _renderFlowAnimation(anim: FlowAnimation) {
    if (anim.type === 'flowing') this._renderFlowingAnimation(anim)
    else this._renderFillingAnimation(anim)
  }

  private _renderFlowingAnimation(anim: FlowAnimation) {
    anim.particles.forEach((particle) => {
      if (particle.progress < 0 || particle.progress > 1) return
      const totalSegments = anim.path.length - 1
      const segmentProgress = particle.progress * totalSegments
      const segmentIndex = Math.floor(segmentProgress)
      const segmentFraction = segmentProgress - segmentIndex
      if (segmentIndex >= totalSegments) return
      const from = anim.path[segmentIndex]
      const to = anim.path[segmentIndex + 1]
      const x =
        from.x +
        from.size / 2 +
        (to.x - from.x + (to.size - from.size) / 2) * segmentFraction
      const y =
        from.y +
        from.size / 2 +
        (to.y - from.y + (to.size - from.size) / 2) * segmentFraction
      this.ctx.save()
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 8)
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.8)')
      gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.4)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0)')
      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.arc(x, y, 8, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.restore()
    })
  }

  private _renderFillingAnimation(anim: FlowAnimation) {
    const particle = anim.particles[0]
    if (!particle || particle.progress < 0) return
    const totalSegments = anim.path.length - 1
    const currentProgress = Math.min(particle.progress, 1)
    const segmentProgress = currentProgress * totalSegments
    this.ctx.save()
    this.ctx.lineWidth = 6
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    for (let i = 0; i < Math.floor(segmentProgress); i++) {
      const from = anim.path[i]
      const to = anim.path[i + 1]
      const fromX = from.x + from.size / 2
      const fromY = from.y + from.size / 2
      const toX = to.x + to.size / 2
      const toY = to.y + to.size / 2
      const gradient = this.ctx.createLinearGradient(fromX, fromY, toX, toY)
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.6)')
      this.ctx.strokeStyle = gradient
      this.ctx.beginPath()
      this.ctx.moveTo(fromX, fromY)
      this.ctx.lineTo(toX, toY)
      this.ctx.stroke()
    }
    const segmentIndex = Math.floor(segmentProgress)
    if (segmentIndex < totalSegments) {
      const segmentFraction = segmentProgress - segmentIndex
      const from = anim.path[segmentIndex]
      const to = anim.path[segmentIndex + 1]
      const fromX = from.x + from.size / 2
      const fromY = from.y + from.size / 2
      const toX = to.x + to.size / 2
      const toY = to.y + to.size / 2
      const currentX = fromX + (toX - fromX) * segmentFraction
      const currentY = fromY + (toY - fromY) * segmentFraction
      const gradient = this.ctx.createLinearGradient(
        fromX,
        fromY,
        currentX,
        currentY,
      )
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.4)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.7)')

      this.ctx.strokeStyle = gradient
      this.ctx.beginPath()
      this.ctx.moveTo(fromX, fromY)
      this.ctx.lineTo(currentX, currentY)
      this.ctx.stroke()

      const gradient2 = this.ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        10,
      )
      gradient2.addColorStop(0, 'rgba(100, 200, 255, 1)')
      gradient2.addColorStop(0.6, 'rgba(100, 200, 255, 0.6)')
      gradient2.addColorStop(1, 'rgba(100, 200, 255, 0)')
      this.ctx.fillStyle = gradient2
      this.ctx.beginPath()
      this.ctx.arc(currentX, currentY, 10, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.restore()
  }

  addSquare(options: SquareOptions) {
    const square = new Square(options)
    this.entities.push(square)
  }

  update(dt: number) {
    this.entities.forEach((e) => e.update?.(dt))
    for (const anim of this.flowAnimations) {
      const allDone = anim.particles.every((p) => p.progress > 1)
      if (allDone) continue
      anim.particles.forEach(
        (particle) => (particle.progress += anim.speed * dt),
      )
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.entities.forEach((e) => e.render?.(this.ctx))

    this.flowAnimations.forEach((anim) => {
      this._renderFlowAnimation(anim)
    })
  }

  check() {
    // Reset flow animations
    this.flowAnimations = []
    // check pipeline
    const rs = checkPipeline(this.entities)
    rs.forEach((result) => this._drawFlowAnimation(result, 'filling'))
  }

  reset() {
    this.entities = []
    this.flowAnimations = []
    this.lastTime = 0
    this._initEntities()
  }

  private _loop(ts: number) {
    const dt = ts - this.lastTime
    this.lastTime = ts
    this.update(dt)
    this.render()
    requestAnimationFrame(this._loop)
  }
}
