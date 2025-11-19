import { CellConfig } from '../types/square'

export const DEFAULT_CELLS: CellConfig[] = [
  // line 1
  {
    col: 0,
    row: 0,
    type: 'start',
    connections: ['right', 'bottom'],
  },
  [0, 1, 'I'],
  [0, 2, 'I'],
  [0, 3, '+'],
  [0, 4, 'I'],
  [0, 5, 'T'],
  [0, 6, 'T'],
  [0, 7, 'I'],
  [0, 8, 'T'],
  [0, 9, 'I'],
  [0, 10, 'L'],

  [1, 3, 'L'],
  [1, 4, 'L'],
  [1, 6, 'I'],
  [1, 10, 'I'],

  [2, 4, 'T'],
  [2, 5, 'L'],
  [2, 6, 'T'],
  [2, 10, 'T'],

  [3, 4, 'T'],
  [3, 5, 'T'],
  [3, 6, 'I'],
  [3, 9, 'L'],
  [3, 10, 'T'],

  [4, 1, 'I'],
  [4, 2, 'I'],
  [4, 3, '+'],
  [4, 6, 'I'],
  [4, 7, 'I'],
  [4, 8, 'T'],
  [4, 9, 'L'],
  [4, 10, 'I'],

  [5, 6, 'I'],
  [5, 10, 'T'],

  [6, 4, 'T'],
  [6, 5, 'I'],
  [6, 6, 'T'],
  [6, 10, 'T'],

  [7, 3, 'T'],
  [7, 4, 'T'],
  [7, 5, 'I'],
  [7, 6, 'T'],
  [7, 10, 'T'],

  [8, 3, 'T'],
  // [8, 6, 'I'],
  [8, 6, 'L'],
  [8, 7, 'I'],
  [8, 8, 'I'],
  [8, 9, 'T'],
  [8, 10, 'T'],

  [9, 2, 'T'],
  [9, 3, 'T'],

  [10, 1, 'T'],
  [10, 2, 'T'],

  // line 2
  {
    col: 4,
    row: 0,
    type: 'start',
    connections: ['right', 'bottom', 'left'],
  },

  {
    col: 4,
    row: 4,
    type: 'waypoint',
    connections: ['left', 'top', 'bottom', 'right'],
    point: 20,
    sizeMultiplier: 2,
    occupiedRows: 2,
    occupiedCols: 2,
  },
  // line waipoint to end

  {
    row: 0,
    col: 10,
    type: 'start',
    connections: ['left', 'bottom'],
  },

  // end
  {
    col: 5,
    row: 7,
    type: 'end',
    connections: ['left', 'top', 'right', 'bottom'],
    sizeMultiplier: 3,
    occupiedRows: 3,
    occupiedCols: 3,
  },
]
