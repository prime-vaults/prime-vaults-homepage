import Square from '../entities/square'
import { CellConfig } from './square'

export interface PipelineGameConfig {
  canvas: HTMLCanvasElement
  debug?: boolean
  imageMap?: Partial<Record<string, HTMLImageElement>>
  activeCells?: CellConfig[]
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
export type VisualEffect =
  | {
      type: 'highlight'
      square: Square
      duration: number
      startTime: number
      progress: number
    }
  | {
      type: 'text'
      x: number
      y: number
      text: string
      animationType: 'fadeUp' | 'flip'
      color: string
      duration: number
      fontSize: number
      startTime: number
      progress: number
      fontWeight?: string
    }
export interface GameResult {
  count: number
  point: number
  path: Square[]
  square: Square
}
