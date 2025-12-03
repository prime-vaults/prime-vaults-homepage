import { useState } from 'react'
import clsx from 'clsx'

import Corner from '@/components/UI/Corner'
import Modal from '@/components/UI/Modal'
import Button from '@/components/UI/Button'
import GamePage from '../home/game/Page'

import GAME from '@/static/images/landing-page/game.png'

export default function PlayGame() {
  const [open, setOpen] = useState(false)
  const [start, setStart] = useState(false)

  const onClose = (e: any) => {
    e.stopPropagation()
    setStart(false)
    setOpen(false)
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
      <div className="col-span-3 flex flex-col">
        <p className="text-2xl md:text-4xl">Play game</p>
        <span className="text-primary cursor-pointer">
          A hidden hint inside
        </span>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="game-modal">
          <div className={clsx('game-mask p-4', { starting: start })}>
            <img src="/logo.svg" className="w-auto h-14 object-contain" />
            <div className="flex-1 flex flex-col gap-4 md:gap-6 px-4 md:px-6 py-6 md:py-12">
              <p className="text-xl md:text-4xl font-medium">Yield Game</p>
              <span>Connect the pipes and fill the liquid to 100%.</span>
              <span>
                Hit <b className="text-primary">Run Flow</b> when you’re done
              </span>
            </div>
            <div className="flex flex-col gap-2 px-4 md:px-6">
              <Button
                className="btn btn-primary btn-block"
                onClick={() => setStart(true)}
              >
                Start game
              </Button>
              <Button className="btn btn-outline btn-block" onClick={onClose}>
                Later
              </Button>
            </div>
          </div>
          <GamePage onLeave={onClose} />
        </div>
      </Modal>
    </div>
  )
}
