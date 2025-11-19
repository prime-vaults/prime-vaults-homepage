import { useCallback, useLayoutEffect, useRef } from 'react'
import PipelineGame from './Pipeline/main'

import I from '@/static/images/mini-game/I.png'
import L from '@/static/images/mini-game/L.png'
import T from '@/static/images/mini-game/T.png'
import P from '@/static/images/mini-game/pipe-cross.png'

export default function GamePage() {
  const gameRef = useRef<HTMLCanvasElement | null>(null)
  const gameInstance = useRef<PipelineGame | null>(null)

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }, [])

  // Preload tất cả images
  const preloadImages = useCallback(async () => {
    return await Promise.all([
      loadImage(I),
      loadImage(L),
      loadImage(T),
      loadImage(P),
    ])
  }, [loadImage])

  useLayoutEffect(() => {
    if (!gameRef.current) return
    if (gameInstance.current) {
      gameInstance.current = null
    }

    // Tạo async function bên trong
    const initGame = async () => {
      const [I, L, T, P] = await preloadImages()
      const imageMap = { T, L, I, '+': P }
      if (!gameRef.current) return
      gameInstance.current = new PipelineGame({
        canvas: gameRef.current,
        row: 10,
        col: 11,
        imageMap,
        debug: false,
      })
    }

    initGame()
  }, [preloadImages])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <p>Game</p>
        <div className="flex flex-row gap-2 items-center">
          <button
            className="btn btn-primary btn-xs"
            onClick={() => gameInstance.current?.check()}
          >
            check
          </button>
          <button
            className="btn btn-error btn-xs"
            onClick={() => gameInstance.current?.reset()}
          >
            reset
          </button>
        </div>
      </div>
      <canvas
        ref={gameRef}
        className="w-full md:w-1/2 h-auto aspect-square bg-base-100"
      />
    </div>
  )
}
