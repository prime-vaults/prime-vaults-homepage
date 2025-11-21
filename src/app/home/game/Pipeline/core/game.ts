import ActionManager from './action'
import Square from '../entities/square'
import {
  PIPE_POINT,
  WATER_ANIMATION_FILLING_SPEED,
  WATER_ANIMATION_FLOWING_SPEED,
  WAYPOINT,
} from '../constant/game'
import { checkPipeline } from '../utils'
import { SquareOptions } from '../types/square'

import {
  FlowAnimation,
  GameResult,
  PipelineGameConfig,
  VisualEffect,
} from '../types/game'
import { PIPE_WIDTH_RATIO } from '../constant/pipe'
import { numericFormat } from '@/helpers/utils'

export default class PipelineGame {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  config: PipelineGameConfig
  dpr: number
  results: GameResult[] = []

  public entities: Square[] = []
  private lastTime = 0
  private actionManager: ActionManager
  private flowAnimations: FlowAnimation[] = []
  private visualEffects: VisualEffect[] = []

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
    const { row, col, activeCells, debug = false, imageMap } = this.config
    const sizeW = this.width / col
    const sizeH = this.height / row
    const size = Math.min(sizeW, sizeH)
    for (const cell of activeCells!) {
      if (Array.isArray(cell)) {
        const [c, r, pipeType, point] = cell
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
          point,
        })
        continue
      }
      const { row: r, col: c, ...rest } = cell
      this.addSquare({
        x: c * size,
        y: r * size,
        size,
        debug,
        row: r,
        col: c,
        ...rest,
      })
    }
  }

  private _drawFlowAnimation(
    result: {
      start: Square
      end: Square
      connectedCount: number
      path: Square[]
      totalPoints: number
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
      count: result.connectedCount,
      point: result.totalPoints,
      currentSegmentIndex: -1,
      visitedSquares: new Set(),
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

      const currentSquare = anim.path[segmentIndex + 1]
      if (
        currentSquare &&
        !anim.visitedSquares?.has(`${currentSquare.row},${currentSquare.col}`)
      ) {
        anim.visitedSquares?.add(`${currentSquare.row},${currentSquare.col}`)
        this._onReachSquare(currentSquare, anim)
      }

      const from = anim.path[segmentIndex]
      const to = anim.path[segmentIndex + 1]
      const { fromX, fromY, toX, toY } = this._getConnectionPoints(from, to)
      const x = fromX + (toX - fromX) * segmentFraction
      const y = fromY + (toY - fromY) * segmentFraction
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
    const currentSegmentIndex = Math.floor(segmentProgress)
    if (currentSegmentIndex !== anim.currentSegmentIndex) {
      anim.currentSegmentIndex = currentSegmentIndex
      const currentSquare = anim.path[currentSegmentIndex + 1]
      if (
        currentSquare &&
        !anim.visitedSquares?.has(`${currentSquare.row},${currentSquare.col}`)
      ) {
        anim.visitedSquares?.add(`${currentSquare.row},${currentSquare.col}`)
        this._onReachSquare(currentSquare, anim)
      }
    }
    this.ctx.save()
    this.ctx.lineWidth = 6
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    for (let i = 0; i < Math.floor(segmentProgress); i++) {
      const from = anim.path[i]
      const to = anim.path[i + 1]
      const { fromX, fromY, toX, toY } = this._getConnectionPoints(from, to)
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
      const { fromX, fromY, toX, toY } = this._getConnectionPoints(from, to)
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

  private _getConnectionPoints(
    from: Square,
    to: Square,
  ): {
    fromX: number
    fromY: number
    toX: number
    toY: number
  } {
    const fromCenterX = from.getCenterX()
    const fromCenterY = from.getCenterY()
    const toCenterX = to.getCenterX()
    const toCenterY = to.getCenterY()

    const dx = toCenterX - fromCenterX
    const dy = toCenterY - fromCenterY

    let direction: 'top' | 'bottom' | 'left' | 'right'
    if (Math.abs(dx) > Math.abs(dy)) {
      direction = dx > 0 ? 'right' : 'left'
    } else {
      direction = dy > 0 ? 'bottom' : 'top'
    }

    let fromX = fromCenterX
    let fromY = fromCenterY
    let toX = toCenterX
    let toY = toCenterY

    if (to.type !== 'normal') {
      switch (direction) {
        case 'right':
          toX = to.x
          toY = fromCenterY
          break
        case 'left':
          toX = to.x + to.size
          toY = fromCenterY
          break
        case 'bottom':
          toX = fromCenterX
          toY = to.y
          break
        case 'top':
          toX = fromCenterX
          toY = to.y + to.size
          break
      }
    }

    if (from.type !== 'normal') {
      switch (direction) {
        case 'right':
          fromX = from.x + from.size
          fromY = toCenterY
          break
        case 'left':
          fromX = from.x
          fromY = toCenterY
          break
        case 'bottom':
          fromX = toCenterX
          fromY = from.y + from.size
          break
        case 'top':
          fromX = toCenterX
          fromY = from.y
          break
      }
    }

    return { fromX, fromY, toX, toY }
  }

  private _onReachSquare(square: Square, anim: FlowAnimation) {
    const x = square.x + square.size / 2
    const y = square.y + square.size / 2

    if (!!square.point)
      this._addTextEffect(x, y, `+${square.point} pts`, {
        type: 'fadeUp',
        fontSize: 16,
        color: 'green',
        duration: 1400,
      })

    if (square.type === 'end') this._addResults(anim, square)
    // this._addHighlightEffect(square, 800)
  }

  private _addTextEffect(
    x: number,
    y: number,
    text: string,
    options: {
      type: 'fadeUp' | 'flip'
      color: string
      duration: number
      fontSize?: number
    },
  ) {
    this.visualEffects.push({
      type: 'text',
      x,
      y,
      text,
      animationType: options.type,
      color: options.color,
      duration: options.duration,
      fontSize: options.fontSize ?? 20,
      startTime: performance.now(),
      progress: 0,
    })
  }

  private _addResults(anim: FlowAnimation, square: Square) {
    if (!anim.count) return
    this.ctx.save()

    this.results.push({
      count: anim.count,
      point: anim.point || 0,
      path: anim.path,
      square,
      timestamp: Date.now(),
    })
    this.ctx.restore()
  }

  // private _addHighlightEffect(square: Square, duration: number = 800) {
  //   this.visualEffects.push({
  //     type: 'highlight',
  //     square,
  //     duration,
  //     startTime: performance.now(),
  //     progress: 0,
  //   })
  // }

  private _renderVisualEffects() {
    const now = performance.now()

    this.visualEffects = this.visualEffects.filter((effect) => {
      const elapsed = now - effect.startTime
      effect.progress = Math.min(elapsed / effect.duration, 1)

      if (effect.progress >= 1) return false

      if (effect.type === 'highlight') {
        this._renderHighlight(effect)
      } else if (effect.type === 'text') {
        this._renderTextEffect(effect)
      }

      return true
    })
  }

  private _renderHighlight(effect: VisualEffect & { type: 'highlight' }) {
    const alpha = 1 - effect.progress
    const { square } = effect

    this.ctx.save()
    this.ctx.fillStyle = `rgba(255, 255, 0, ${alpha * 0.2})`
    this.ctx.fillRect(
      square.x + square.size / 2 - (square.size * PIPE_WIDTH_RATIO) / 2,
      square.y,
      square.size * PIPE_WIDTH_RATIO,
      square.size,
    )
    this.ctx.restore()
  }

  private _renderTextEffect(effect: VisualEffect & { type: 'text' }) {
    this.ctx.save()
    const fs = this.width * 0.018

    if (effect.animationType === 'fadeUp') {
      const alpha = 1 - effect.progress
      const offsetY = effect.progress * 40

      this.ctx.font = `${fs}px ${effect.fontWeight} Space Grotesk, sans-serif`
      this.ctx.fillStyle = effect.color.includes('rgba')
        ? effect.color
        : effect.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba')

      if (!effect.color.includes('rgb')) {
        this.ctx.globalAlpha = alpha
        this.ctx.fillStyle = effect.color
      }

      this.ctx.textAlign = 'center'
      this.ctx.fillText(effect.text, effect.x, effect.y - offsetY - 20)
    } else if (effect.animationType === 'flip') {
      const alpha = 1 - effect.progress
      const scale = 1 + effect.progress * 0.5
      const rotation = effect.progress * Math.PI * 2

      this.ctx.translate(effect.x, effect.y - 20)
      this.ctx.rotate(rotation)
      this.ctx.scale(scale, scale)

      this.ctx.font = `bold ${fs}px Arial`
      this.ctx.globalAlpha = alpha
      this.ctx.fillStyle = effect.color
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillText(effect.text, 0, 0)
    }

    this.ctx.restore()
  }

  private _renderResult() {
    if (!this.results || !this.results.length) return
    this.ctx.save()
    const params = this.results[0]
    const DURATION = 1500
    const square = params.square

    const totalPoint = this.results.reduce((a, b) => a + b.point, 0)
    const totalPipeCount = this.results.reduce((a, b) => {
      const wp = b.path.filter((p) => p.type === 'waypoint')
      const m = wp.length
      const mse = 2 // trừ 2 điểm của start và end
      return a + (b.count - (mse + m))
    }, 0)
    const totalPipePoint = totalPipeCount * PIPE_POINT + WAYPOINT * 3
    const totalRatio = totalPoint / totalPipePoint

    const ttl = params.timestamp - (Date.now() - DURATION)
    const ratio = Math.max(ttl / DURATION, 0)

    const x = square.x + square.size / 2
    const y = square.y + square.size / 2 + ratio
    const alpha = 1 - ratio

    // endpoint: water effect
    const h = square.size * alpha * totalRatio
    square.update(0, { h, y: square.y + square.size - h })

    // point
    const fs = this.width * 0.018
    this.ctx.font = `bold ${fs}px 'Space Grotesk', sans-serif`
    this.ctx.fillStyle = totalRatio < 0.6 ? '#fff' : '#141510'
    this.ctx.globalAlpha = alpha
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(
      `${numericFormat(Math.min(totalRatio * 100, 100))}%`,
      x,
      y,
    )

    this.ctx.restore()
  }

  addSquare(options: SquareOptions) {
    const square = new Square({ ...options, imageMap: this.config.imageMap })
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
    this._renderResult()
    this._renderVisualEffects()
  }

  check() {
    this.results = []
    this.flowAnimations = []
    const rs = checkPipeline(this.entities)
    rs.forEach((r) => this._drawFlowAnimation(r, 'filling'))
  }

  reset() {
    // reset inside
    this.entities.forEach((e) => {
      if (e.type === 'end') e.reset()
    })
    // clear state
    this.entities = []
    this.flowAnimations = []
    this.visualEffects = []
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
