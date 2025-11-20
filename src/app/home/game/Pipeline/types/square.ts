export type Direction = 'top' | 'right' | 'bottom' | 'left'
export type PipeType = 'I' | 'L' | 'T' | '+'
export type SquareType = 'normal' | 'start' | 'end' | 'waypoint'
export type PipePoint = number
// types/square.ts
export interface SquareOptions {
  x?: number
  y?: number
  size?: number
  pipeType?: PipeType
  type?: SquareType
  connections?: Direction[]
  debug?: boolean
  imageMap?: Partial<Record<PipeType, HTMLImageElement>>
  row?: number
  col?: number
  point?: number
  sizeMultiplier?: number
  occupiedRows?: number
  occupiedCols?: number
  backgroundImage?: string
}
export interface EndpointCell {
  row: number
  col: number
  type: SquareType
  connections: Direction[]
  point?: PipePoint
  sizeMultiplier?: number
  backgroundImage?: SquareOptions['backgroundImage']
  occupiedRows?: number
  occupiedCols?: number
}
export type NormalCell = [number, number, PipeType]
export type CellConfig = NormalCell | EndpointCell
