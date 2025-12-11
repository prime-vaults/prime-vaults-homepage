import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'

import GamePage from '../home/game/Page'
import SubmitWallet from './SubmitWallet'
import Modal from '@/components/UI/Modal'
import Button from '@/components/UI/Button'
import Corner from '@/components/UI/Corner'
import { CheckPointModal } from './checkPoint'

import GAME from '@/static/images/landing-page/game.png'
import BANNER from '@/static/images/mini-game/banner-game.png'

export default function PlayGame() {
  const [open, setOpen] = useState(false)
  const [openCheck, setOpenCheck] = useState(false)

  const handleCheck = () => {
    setOpen(false)
    return setOpenCheck(true)
  }
  return (
    <div
      className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 group/game cursor-pointer"
      onClick={() => setOpen(true)}
    >
      <Corner />
      <div className="absolute top-0 left-0 w-0 group-hover/game:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
      <img
        className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[99]"
        src={GAME}
      />
      <div className="col-span-3 flex flex-col gap-1 md:gap-3">
        <span className="text-3xl md:text-[40px] font-bold">Play game</span>
        <div className="flex flex-row gap-2 items-center">
          <h5 className="text-primary cursor-pointer uppercase">
            A hidden hint inside
          </h5>
          <ArrowRight className="text-primary-content w-5 md:w-8" />
        </div>
      </div>
      {openCheck && <CheckPointModal open={openCheck} setOpen={setOpenCheck} />}
      {open && (
        <GameModal
          open={open}
          onClose={() => setOpen(false)}
          onOpenCheck={handleCheck}
        />
      )}
    </div>
  )
}

export function GameModal({
  open,
  onClose,
  onOpenCheck,
}: {
  open: boolean
  onClose: () => void
  onOpenCheck?: () => void
}) {
  const [start, setStart] = useState(false)

  const handleClose = (e: any) => {
    e.stopPropagation()
    setStart(false)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose()
      }}
      boxClassName="min-h-auto! md:min-w-4xl!"
    >
      {start ? (
        <GamePage onLeave={handleClose} onOpenCheck={onOpenCheck} />
      ) : (
        <div className="relative w-full h-full">
          <div className="absolute top-4 right-4 z-100">
            <X className="w-6 h-6 cursor-pointer" onClick={handleClose} />
          </div>
          <div className="grid grid-cols-3 w-full gap-4 max-w-4xl">
            <div className="flex flex-col col-span-2 items-start p-2 md:p-4">
              <img src="/logo.svg" className="w-auto h-14 object-contain" />
              <div className="flex flex-col gap-1 md:gap-2 p-3 md:p-6 h-full w-full">
                <div className="flex-1 flex flex-col gap-2 md:gap-6">
                  <h2>Yield Game</h2>
                  <span>Connect the pipes and fill the liquid to 100%.</span>
                  <span>
                    Hit <b className="text-primary">Run Flow</b> when you’re
                    done
                  </span>
                </div>
                <div className="flex-1" />
                <div className="flex flex-col gap-2 w-full">
                  <Button
                    className="btn btn-primary btn-block"
                    onClick={() => setStart(true)}
                  >
                    Start game
                  </Button>
                  <Button
                    className="btn btn-outline btn-block"
                    onClick={handleClose}
                  >
                    Later
                  </Button>
                </div>
              </div>
            </div>
            <img
              src={BANNER}
              className="h-full md:max-h-[80dvh] object-cover! w-auto md:w-full"
            />
          </div>
        </div>
      )}
    </Modal>
  )
}

export function GameSuccessModal({
  onClose,
  onOpenCheck,
}: {
  onClose: () => void
  onOpenCheck?: () => void
}) {
  const [submitWallet, setSubmitWallet] = useState(false)

  if (submitWallet)
    return (
      <div className="w-full h-full flex flex-col p-2.5 md:p-4">
        <div className="flex flex-row justify-between">
          <img src="/logo.svg" className="w-auto h-14 object-contain" />
          <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>
        <SubmitWallet onClose={onClose} />
      </div>
    )
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 right-4 z-100">
        <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>
      <div className="grid grid-cols-5 md:grid-cols-3 w-full gap-2.5 md:gap-4">
        <div className="col-span-4 md:col-span-2 flex flex-col gap-4 p-4 items-start">
          <img src="/logo.svg" className="w-auto h-14 object-contain" />
          <div className="flex flex-col gap-3 md:gap-6 p-3 md:p-6 h-full">
            <h2>Congrats! You succeeded.</h2>
            <div className="flex flex-row rounded overflow-hidden">
              <div className="relative">
                <div
                  className="absolute top-0 bottom-0 -right-9 bg-[#D6FFAB] z-10 w-12"
                  style={{
                    clipPath:
                      'polygon(25% 0%, 50% 50%, 25% 100%, 0% 100%, 25% 50%, 0% 0%)',
                  }}
                />
                <p className="py-1.5 px-2.5 md:px-4 bg-[#343434]">
                  Fragmented Yield
                </p>
              </div>
              <p className="pl-3 py-1.5 px-2 md:px-4 bg-[#B2E77B] text-[#2F4B12]">
                Unified Yield
              </p>
            </div>
            <p>
              The game shows how Prime Vaults works: instead of splitting assets
              into separate pools, it connects everything into one smart vault
              and hunts yield across the entire portfolio — that’s how it
              reaches 100%.
              <br /> <br />
              Want to maximize your earnings? Join us now
            </p>

            <div className="flex-1" />
            <div className="flex flex-row gap-2 md:gap-4 w-full">
              {onOpenCheck && (
                <Button
                  className="btn btn-primary bg-white! w-1/2"
                  onClick={onOpenCheck}
                >
                  Check Your Prime Points
                </Button>
              )}

              <Button
                className="btn btn-primary w-1/2"
                onClick={() => setSubmitWallet(true)}
              >
                Join Closed-Beta
              </Button>
            </div>
          </div>
        </div>
        <img
          src={BANNER}
          className="h-[50dvh] md:h-[70dvh] object-cover! w-full"
        />
      </div>
    </div>
  )
}
