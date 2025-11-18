export type Direction = 'top' | 'right' | 'bottom' | 'left'
export type PipeType = 'I' | 'L' | 'T' | '+'
export interface SquareOptions {
  x?: number
  y?: number
  size?: number
  pipeType?: PipeType
  debug?: boolean
  entities?: any[]
  type?: SquareType
  connections?: Direction[]
  row?: number
  col?: number
  imageMap?: Partial<Record<PipeType, HTMLImageElement>>
}
export type SquareType = 'normal' | 'start' | 'end'
export interface EndpointCell {
  row: number
  col: number
  type: 'start' | 'end'
  connections: Direction[]
}
export type NormalCell = [number, number, PipeType]
export type CellConfig = NormalCell | EndpointCell
