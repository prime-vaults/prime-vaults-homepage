import { X } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import PipelineGame from './Pipeline/main'
import Button from '@/components/UI/Button'
import SubmitWallet from '@/app/landing-page/SubmitWallet'

import { DEFAULT_CELLS } from './Pipeline/constant'
import { GAME_COL, GAME_ROW } from './Pipeline/constant/game'

import I from '@/static/images/mini-game/I.png'
import L from '@/static/images/mini-game/L.png'
import T from '@/static/images/mini-game/T.png'
import P from '@/static/images/mini-game/pipe-cross.png'
import V from '@/static/images/mini-game/vaullt.png'
import S from '@/static/images/mini-game/strategy.png'
import P2 from '@/static/images/mini-game/pipe-c.png'
import cup from '@/static/images/landing-page/cup-point.png'
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
  const [submitWallet, setSubmitWallet] = useState(false)

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

  if (submitWallet)
    return (
      <div className="w-full h-full flex flex-col p-2.5 md:p-4">
        <div className="flex flex-row justify-between">
          <img src="/logo.svg" className="w-auto h-14 object-contain" />
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => onLeave({ stopPropagation: () => {} })}
          />
        </div>
        <SubmitWallet onClose={() => onLeave({ stopPropagation: () => {} })} />
      </div>
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
            <div className="absolute text-center inset-0 flex flex-col gap-2 p-2.5 md:p-4 items-center justify-center bg-transparent backdrop-blur-xl border border-primary">
              <h2>Congrats! You succeeded.</h2>
              <img src={cup} className="w-24 md:w-48 -mb-4 md:-mb-8" />
              <p className="px-0 md:px-40">
                The game shows how Prime Vaults works: instead of splitting
                assets into separate pools, it connects everything into one
                smart vault and hunts yield across the entire portfolio — that’s
                how it reaches 100%.
                <br /> <br />
                Want to maximize your earnings?{' '}
                <span className="text-primary-content">Join us now!</span>
              </p>

              <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-8">
                {onOpenCheck && (
                  <Button
                    className="btn btn-primary bg-white! w-full md:w-62 text-nowrap!"
                    onClick={onOpenCheck}
                  >
                    Check Your Prime Points
                  </Button>
                )}
                <Button
                  className="btn btn-primary w-full md:w-62"
                  onClick={() => setSubmitWallet(true)}
                >
                  Join Closed-Beta
                </Button>
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
              onClick={() => {
                gameInstance.current?.check()
              }}
            >
              Run flow
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
