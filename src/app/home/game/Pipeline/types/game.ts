import Square from '../entities/square'

export interface PipelineGameConfig {
  canvas: HTMLCanvasElement
  debug?: boolean
  [key: string]: any
}

export interface FlowAnimation {
  path: Square[]
  progress: number
  speed: number
  particles: FlowParticle[]
  type: 'flowing' | 'filling'
}

export interface FlowParticle {
  offset: number
  progress: number
}
