import { useLayoutEffect, useRef } from 'react'
import PipelineGame from './Pipeline/main'

export default function GamePage() {
  const gameRef = useRef<HTMLCanvasElement | null>(null)
  const gameInstance = useRef<PipelineGame | null>(null)

  useLayoutEffect(() => {
    if (!gameRef.current) return
    if (gameInstance.current) gameInstance.current = null

    gameInstance.current = new PipelineGame({
      canvas: gameRef.current,
      row: 10,
      col: 11,
      debug: false,
    })
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col">
        <p>Game</p>
        <div className="flex flex-row gap-2 items-center">
          <button onClick={() => gameInstance.current?.check()}>check</button>
          <button onClick={() => gameInstance.current?.reset()}>reset</button>
        </div>
      </div>
      <canvas
        ref={gameRef}
        className="w-1/2 h-auto aspect-square bg-base-100"
      />
    </div>
  )
}
