import { CellConfig } from '../types/square'
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
    point: 20,
    sizeMultiplier: 2,
    occupiedRows: 2,
    occupiedCols: 2,
    backgroundImage: S,
  },

  // pipe line
  [1, 3, 'I'],
  [1, 4, 'T'],
  [1, 5, 'I'],
  [1, 6, 'L'],

  // [2, 3, 'T'],
  [2, 4, 'I'],
  [2, 6, 'T'],
  [2, 7, 'L'],

  [3, 3, 'T'],
  [3, 4, 'L'],
  [3, 5, 'L'],
  [3, 6, 'I'],
  [3, 7, 'I'],

  [4, 2, 'L'],
  [4, 3, 'L'],
  [4, 5, 'L'],
  [4, 6, '+'],

  [5, 2, 'T'],

  [6, 2, 'I'],

  [7, 2, '+'],
  [7, 3, 'T'],
  [7, 4, 'L'],

  [8, 3, 'L'],
  [8, 4, 'L'],
  [8, 7, 'I'],

  [9, 4, 'I'],
  [9, 6, 'T'],
  [9, 7, 'L'],

  [10, 5, '+'],
  [10, 6, 'L'],

  [11, 2, 'L'],
  [11, 5, 'I'],

  [12, 2, 'T'],
  [12, 3, 'I'],
  [12, 4, 'I'],
  [12, 5, 'L'],

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
