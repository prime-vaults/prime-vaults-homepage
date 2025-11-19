import Square from '../entities/square'

export interface PipelineGameConfig {
  canvas: HTMLCanvasElement
  debug?: boolean
  imageMap?: Partial<Record<string, HTMLImageElement>>
  [key: string]: any
}

export interface FlowAnimation {
  path: Square[]
  progress: number
  speed: number
  particles: FlowParticle[]
  type: 'flowing' | 'filling'
  count?: number
  point?: number
  currentSegmentIndex?: number // Track segment hiện tại
  visitedSquares?: Set<string> // Track squares đã đi qua
}

export interface FlowParticle {
  offset: number
  progress: number
}
