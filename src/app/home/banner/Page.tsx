import { useLayoutEffect, useState } from 'react'

import Button from '@/components/UI/Button'
import Welcome from './Welcome'
import MatrixEffect from '../components/MatrixEffect'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTypingDecrypt } from '@/hooks/useTyping'

const TEXTS = [
  'Prime Strategies.',
  'Best Returns.',
  'Your On-Chain Wealth Solution.',
  'Start now',
]

export default function BannerPage() {
  const [startTextFade, setStartTextFade] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [finished] = useLocalStorage('welcome-finished', false)
  const { textLines } = useTypingDecrypt(TEXTS, {
    start: startTextFade || trigger,
    speed: { typing: 1, flash: 30 },
    delay: 1000,
  })

  // start typing effect
  useLayoutEffect(() => {
    setTrigger(finished)
  }, [finished])

  useLayoutEffect(() => {
    const nextEl = document.querySelector('#portfolio_section')
    if (!nextEl || !(finished && startTextFade)) return
    nextEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [finished, startTextFade])

  return (
    <div className="relative w-full">
      {finished && (
        <div className="absolute w-full h-full z-0">
          <MatrixEffect debug />
        </div>
      )}
      <div className="relative w-full min-h-screen grid grid-cols-7 gap-4 p-6 md:gap-24 z-10">
        <div className=" col-span-full md:col-span-3">
          <Welcome onFinished={() => setStartTextFade(true)} />
        </div>
        <div className="col-span-full md:col-span-4 flex flex-col gap-2 md:gap-5 h-full items-center md:items-start justify-center text-center md:text-start uppercase">
          {[...textLines].splice(0, 3).map((text, i) => (
            <div
              className="text-2xl md:text-5xl text-primary font-bold font-space"
              key={i}
            >
              {text}
            </div>
          ))}
          {!!textLines[3] && (
            <Button className="btn btn-primary btn-block md:w-fit md:min-w-3xs text-base-300">
              {textLines[3]}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
