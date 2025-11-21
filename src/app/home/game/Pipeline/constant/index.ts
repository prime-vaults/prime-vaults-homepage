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
    col: 1,
    row: 2,
    type: 'start',
    connections: ['right', 'bottom', 'top'],
    backgroundImage: BTC,
  },
  {
    col: 7,
    row: 1,
    type: 'start',
    connections: ['right', 'bottom', 'left'],
    backgroundImage: ETH,
  },

  {
    col: 12,
    row: 1,
    type: 'start',
    connections: ['left', 'bottom', 'right'],
    backgroundImage: USD,
  },

  // waypoint
  {
    col: 10,
    row: 3,
    type: 'waypoint',
    connections: ['left', 'top', 'bottom', 'right'],
    point: WAYPOINT,
    sizeMultiplier: 2,
    occupiedRows: 2,
    occupiedCols: 2,
    backgroundImage: S,
  },

  // pipe line
  [1, 3, 'I', PIPE_POINT],
  [1, 4, 'L', PIPE_POINT],
  [1, 5, 'T', PIPE_POINT],
  [1, 6, 'L', PIPE_POINT],

  [2, 3, 'T', PIPE_POINT],
  [2, 4, 'L', PIPE_POINT],
  [2, 5, 'L', PIPE_POINT],
  [2, 6, 'T', PIPE_POINT],
  [2, 7, 'L', PIPE_POINT],

  [3, 3, 'T', PIPE_POINT],
  [3, 4, 'L', PIPE_POINT],
  [3, 5, 'L', PIPE_POINT],
  [3, 6, 'I', PIPE_POINT],
  [3, 7, 'I', PIPE_POINT],

  [4, 2, 'L', PIPE_POINT],
  [4, 3, 'L', PIPE_POINT],
  [4, 5, 'L', PIPE_POINT],
  [4, 6, '+', PIPE_POINT],

  [5, 2, 'T', PIPE_POINT],

  [6, 2, 'I', PIPE_POINT],

  [7, 2, '+', PIPE_POINT],
  [7, 3, 'T', PIPE_POINT],
  [7, 4, 'L', PIPE_POINT],

  [8, 3, 'L', PIPE_POINT],
  [8, 4, 'L', PIPE_POINT],
  [8, 7, 'I', PIPE_POINT],

  [9, 4, 'I', PIPE_POINT],
  [9, 6, 'T', PIPE_POINT],
  [9, 7, 'L', PIPE_POINT],

  [10, 5, '+', PIPE_POINT],
  [10, 6, 'L', PIPE_POINT],

  [11, 2, 'L', PIPE_POINT],
  [11, 5, 'I', PIPE_POINT],

  [12, 2, 'T', PIPE_POINT],
  [12, 3, 'I', PIPE_POINT],
  [12, 4, 'I', PIPE_POINT],
  [12, 5, 'L', PIPE_POINT],

  // end point
  {
    col: 5,
    row: 5,
    type: 'end',
    connections: ['left', 'top', 'right', 'bottom'],
    sizeMultiplier: 3,
    occupiedRows: 3,
    occupiedCols: 3,
    backgroundImage: V,
  },
]
