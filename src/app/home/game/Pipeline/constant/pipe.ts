export const DIR = {
  top: 1,
  right: 2,
  bottom: 4,
  left: 8,
}
export const OPPOSITE = {
  [DIR.top]: DIR.bottom,
  [DIR.bottom]: DIR.top,
  [DIR.left]: DIR.right,
  [DIR.right]: DIR.left,
}
export const PIPE_WIDTH_RATIO = 0.125
