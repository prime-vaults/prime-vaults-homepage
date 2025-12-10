import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import PipelineGame from './Pipeline/main'
import Button from '@/components/UI/Button'
import { GameSuccessModal } from '@/app/landing-page/PlayGame'

import { GAME_COL, GAME_ROW } from './Pipeline/constant/game'
import { DEFAULT_CELLS } from './Pipeline/constant'

import I from '@/static/images/mini-game/I.png'
import L from '@/static/images/mini-game/L.png'
import T from '@/static/images/mini-game/T.png'
import P from '@/static/images/mini-game/pipe-cross.png'
import V from '@/static/images/mini-game/vaullt.png'
import S from '@/static/images/mini-game/strategy.png'
import P2 from '@/static/images/mini-game/pipe-c.png'
import { numericFormat, useDebounce } from '@/helpers/utils'

export default function GamePage({
  onLeave = () => {},
  onOpenCheck,
}: {
  onOpenCheck?: () => void
  onLeave?: (e: any) => void
}) {
  const gameRef = useRef<HTMLCanvasElement | null>(null)
  const gameInstance = useRef<PipelineGame | null>(null)
  const [rsRatio, setRsRatio] = useState(0)
  const [totalPath, setTotalPath] = useState(0)
  const [rsPercentage, setRsPercentage] = useState(0)

  useDebounce(
    () => {
      setRsPercentage(rsRatio)
    },
    2000,
    [rsRatio],
  )

  const onReset = useCallback(() => {
    setRsPercentage(0)
    if (gameInstance.current) gameInstance.current.reset()
  }, [])

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
      loadImage(V),
      loadImage(S),
      loadImage(P2),
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
        row: GAME_ROW,
        col: GAME_COL,
        imageMap,
        activeCells: DEFAULT_CELLS,
        debug: false,
        onDone: (ratio, total) => {
          setRsRatio(ratio)
          setTotalPath(total)
        },
      })
    }

    initGame()
  }, [preloadImages])

  if (rsPercentage >= 1)
    return (
      <GameSuccessModal
        onClose={() => onLeave({ stopPropagation: () => {} })}
        onOpenCheck={onOpenCheck}
      />
    )
  return (
    <div className="game-modal">
      <div
        id="pipeline_game"
        className=" w-full relative flex flex-col items-center justify-center gap-4 md:gap-6 p-4 md:p-6 pb-0"
      >
        <div className="relative flex flex-col items-center justify-center w-full h-full p-4 bg-repeating">
          <canvas
            ref={gameRef}
            className="w-full h-auto"
            style={{ aspectRatio: `${GAME_COL} / ${GAME_ROW}` }}
          />
          {(rsRatio < 0 || (rsPercentage > 0 && totalPath < 3)) && (
            <div className="absolute inset-0 flex flex-col gap-4 p-4 text-center items-center justify-center bg-[#1415105e] backdrop-blur-xs border border-red-500">
              <h2>No valid route found</h2>
              <h5 className="px-40 uppercase">
                Looks like your pipes don’t connect and the liquid can’t flow.
                Adjust the pipes and try again. <br /> <br /> Current
                percentage: {numericFormat(Math.max(rsPercentage, 0) * 100)}%
              </h5>
              <Button
                className="mt-4 btn btn-primary min-w-40"
                onClick={onReset}
              >
                Try again
              </Button>
            </div>
          )}
          {rsPercentage > 0 && rsPercentage < 1 && totalPath === 3 && (
            <div className="absolute inset-0 flex flex-col gap-4 p-4 items-center justify-center bg-[#1415105e] backdrop-blur-md border border-primary">
              <h2 className="text-center uppercase">Nice done!</h2>
              <h5 className="text-center px-10 uppercase">
                You’ve discovered three correct routes, but the vault still
                isn’t fully optimized.To complete it, look for the route where
                all three assets flow together in unity
              </h5>
              <p className="uppercase">
                Current percentage:{' '}
                <b className="text-xl text-primary">
                  {numericFormat(rsPercentage * 100)}%
                </b>
              </p>
              <Button
                className="btn btn-primary md:mt-4 min-w-40"
                onClick={onReset}
              >
                Try optimized route
              </Button>
            </div>
          )}
          {rsPercentage >= 1 && (
            <div className="absolute inset-0 flex flex-col gap-2 p-4 items-center justify-center bg-black backdrop-blur-sm border border-primary">
              <h2>Congrats! You succeeded.</h2>
              <div className="flex flex-row relative">
                <p className="py-1.5 px-4 bg-[#343434]">Fragmented Yield</p>
                <p className="py-1.5 px-4 bg-[#B2E77B] text-[#2F4B12]">
                  Unified Yield
                </p>
              </div>
              <p>
                The game shows how PrimeVaults works: instead of splitting
                assets into separate pools, it connects everything into one
                smart vault and hunts yield across the entire portfolio — that’s
                how it reaches 100%.
                <br /> <br />
                Want to maximize your earnings? Join us now
              </p>

              <div className="flex flex-row gap-4 mt-40">
                <Button className="btn btn-primary bg-white!">
                  Check Your Prime Points
                </Button>
                <Button className="btn btn-primary">Join Closed-Beta</Button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full min-h-12 relative flex flex-row items-center justify-center">
          <p
            className="absolute left-0 text-primary cursor-pointer text-xs md:text-sm"
            onClick={onLeave}
          >
            Leave game
          </p>
          {rsRatio <= 0 && (
            <button
              className="btn btn-primary md:min-w-36 btn-sm md:btn-lg"
              onClick={() => gameInstance.current?.check()}
            >
              Run flow
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
