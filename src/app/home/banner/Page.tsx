import clsx from 'clsx'
import { useLayoutEffect, useRef, useState } from 'react'

import Button from '@/components/UI/Button'
import Welcome from './Welcome'
import MatrixEffect from '../components/MatrixEffect'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useTypingDecrypt } from '@/hooks/useTyping'

const TEXTS = [
  'Prime Strategies.',
  'Best Returns.',
  'Your On-Chain Smart Saving Accounts.',
  'Start now',
]

export default function BannerPage() {
  const bannerRef = useRef<HTMLDivElement | null>(null)
  const [startTextFade, setStartTextFade] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [finished] = useLocalStorage('welcome-finished', false)
  const { textLines, ended } = useTypingDecrypt(TEXTS, {
    start: startTextFade || trigger,
    speed: { typing: 1, flash: 30 },
    delay: 1000,
  })

  // start typing effect
  useLayoutEffect(() => {
    setTrigger(finished)
  }, [finished])

  useLayoutEffect(() => {
    const currentEl = bannerRef.current
    const nextEl = document.querySelector('#portfolio_section')

    // animation processing or target element not found
    if (!nextEl || !currentEl || !(finished && ended)) return

    const rect = currentEl.getBoundingClientRect()
    const isInView = rect.top < window.innerHeight && rect.bottom > 0
    // banner is not inside viewport
    if (!isInView) return

    nextEl.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [ended, finished])

  return (
    <div ref={bannerRef} className="relative w-full">
      {finished && (
        <div className="absolute w-full h-full z-0">
          <MatrixEffect debug />
        </div>
      )}
      <div className="relative w-full min-h-screen grid grid-cols-7 gap-4 p-6 md:gap-24 z-10">
        <div className=" col-span-full md:col-span-3">
          <Welcome onFinished={() => setStartTextFade(true)} />
        </div>
        <div className="col-span-full md:col-span-4 flex flex-col gap-0 md:gap-5 h-fit md:h-full items-center md:items-start justify-center text-center md:text-start uppercase">
          {[...textLines].splice(0, 3).map((text, i) => (
            <div
              className={clsx('text-2xl md:text-5xl font-bold font-space', {
                'text-primary': i > 0,
                'text-white': i === 0,
              })}
              key={i}
            >
              {text}
            </div>
          ))}
          {!!textLines[3] && (
            <Button className="btn btn-primary btn-block md:w-fit md:min-w-3xs text-base-300 mt-6 md:mt-0">
              {textLines[3]}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
