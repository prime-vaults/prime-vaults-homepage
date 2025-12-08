import { CellConfig } from '../types/square'
import { PIPE_POINT, WAYPOINT } from './game'

import V from '@/static/images/mini-game/vaullt.png'
import S from '@/static/images/mini-game/strategy.png'
import BTC from '@/static/images/intro/factory/btc.png'
import ETH from '@/static/images/intro/factory/eth.png'
import USD from '@/static/images/intro/factory/usd.png'

export const DEFAULT_CELLS: CellConfig[] = [
  // Start point
  {
    col: 0,
    row: 1,
    type: 'start',
    connections: ['right', 'bottom', 'top'],
    backgroundImage: BTC,
  },
  {
    col: 6,
    row: 0,
    type: 'start',
    connections: ['right', 'bottom', 'left'],
    backgroundImage: ETH,
  },

  {
    col: 11,
    row: 0,
    type: 'start',
    connections: ['left', 'bottom', 'right'],
    backgroundImage: USD,
  },

  // waypoint
  {
    col: 9,
    row: 2,
    type: 'waypoint',
    connections: ['left', 'top', 'bottom', 'right'],
    point: WAYPOINT,
    sizeMultiplier: 2,
    occupiedRows: 2,
    occupiedCols: 2,
    backgroundImage: S,
  },

  // pipe line
  [0, 2, 'I', PIPE_POINT],
  [0, 3, 'L', PIPE_POINT],
  [0, 4, 'T', PIPE_POINT],
  [0, 5, 'L', PIPE_POINT],

  [1, 2, 'T', PIPE_POINT],
  [1, 3, 'L', PIPE_POINT],
  [1, 4, 'L', PIPE_POINT],
  [1, 5, 'T', PIPE_POINT],
  [1, 6, 'L', PIPE_POINT],

  [2, 2, 'T', PIPE_POINT],
  [2, 3, 'L', PIPE_POINT],
  [2, 4, 'L', PIPE_POINT],
  [2, 5, 'I', PIPE_POINT],
  [2, 6, 'I', PIPE_POINT],

  [3, 1, 'L', PIPE_POINT],
  [3, 2, 'L', PIPE_POINT],
  [3, 4, 'L', PIPE_POINT],
  [3, 5, '+', PIPE_POINT],

  [4, 1, 'T', PIPE_POINT],

  [5, 1, 'I', PIPE_POINT],

  [6, 1, '+', PIPE_POINT],
  [6, 2, 'T', PIPE_POINT],
  [6, 3, 'L', PIPE_POINT],

  [7, 2, 'L', PIPE_POINT],
  [7, 3, 'L', PIPE_POINT],
  [7, 6, 'I', PIPE_POINT],

  [8, 3, 'I', PIPE_POINT],
  [8, 5, 'T', PIPE_POINT],
  [8, 6, 'L', PIPE_POINT],

  [9, 4, '+', PIPE_POINT],
  [9, 5, 'L', PIPE_POINT],

  [10, 1, 'L', PIPE_POINT],
  [10, 4, 'I', PIPE_POINT],

  [11, 1, 'T', PIPE_POINT],
  [11, 2, 'I', PIPE_POINT],
  [11, 3, 'I', PIPE_POINT],
  [11, 4, 'L', PIPE_POINT],

  // end point
  {
    col: 4,
    row: 4,
    type: 'end',
    connections: ['left', 'top', 'right', 'bottom'],
    sizeMultiplier: 3,
    occupiedRows: 3,
    occupiedCols: 3,
    backgroundImage: V,
  },
]
