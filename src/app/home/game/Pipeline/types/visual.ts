// Thêm vào file types/game.ts

import Square from '../entities/square'

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
