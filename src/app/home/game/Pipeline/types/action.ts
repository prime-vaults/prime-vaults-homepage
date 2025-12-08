export interface ClickableEntity {
  containsPoint?: (x: number, y: number) => boolean
  onClick?: (x: number, y: number) => void
}
export interface SubmitEntityOptions {
  x: number
  y: number
  col: number
  row: number
  size?: number
  debug?: boolean
}
