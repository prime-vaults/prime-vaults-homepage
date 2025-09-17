import { useLayoutEffect, useState } from 'react'

import Button from '@/components/UI/Button'
import Welcome from './Welcome'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTypingDecrypt } from '@/hooks/useTyping'
import MatrixEffect from '../components/MatrixEffect'

const TEXTS = [
  'High returns. Low complexity.',
  "Achieve 15-25% APY without navigating DeFi's complexity.",
  'Start now',
  `*APY is variable and subject to change. Actual performance may
              differ, and deposits are not insured or guaranteed.`,
]

export default function BannerPage() {
  const [startTextFade, setStartTextFade] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [finished] = useLocalStorage('welcome-finished', false)
  const { textLines } = useTypingDecrypt(TEXTS, {
    start: startTextFade || trigger,
    speed: { typing: 0.5, flash: 15 },
    delay: 1000,
  })

  // start typing effect
  useLayoutEffect(() => {
    setTrigger(finished)
  }, [finished])

  useLayoutEffect(() => {
    const nextEl = document.querySelector('#time_section')
    if (!nextEl || !(finished && startTextFade)) return
    nextEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [finished, startTextFade])

  return (
    <div className="relative w-full">
      {finished && (
        <div className="absolute w-full h-full z-0">
          <MatrixEffect />
        </div>
      )}
      <div className="relative w-full min-h-screen grid grid-cols-7 gap-4 p-6 md:gap-24 z-10">
        <div className=" col-span-full md:col-span-3">
          <Welcome onFinished={() => setStartTextFade(true)} />
        </div>
        <div className="col-span-full md:col-span-4 flex flex-col gap-2 h-full justify-center">
          <h3 className="text-2xl md:text-5xl text-primary font-bold">
            {textLines[0]}
          </h3>
          {textLines[1]}
          {!!textLines[2] && (
            <Button className="btn btn-primary w-fit text-base-300">
              {textLines[2]}
            </Button>
          )}
          <div className="w-full flex flex-col items-end">
            <div className="w-full md:w-2/3 text-xs text-end text-secondary">
              {textLines[3]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
