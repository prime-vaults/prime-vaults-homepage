import { useLayoutEffect, useRef } from 'react'
import clsx from 'clsx'

import BG from '@/static/images/intro/clock/background.png'
import COG_1 from '@/static/images/intro/clock/cog-1.png'
import COG_2 from '@/static/images/intro/clock/cog-2.png'
import COG_3 from '@/static/images/intro/clock/cog-3.png'
import COG_4 from '@/static/images/intro/clock/cog-4.png'
import HH from '@/static/images/intro/clock/hour-hand.png'
import MH from '@/static/images/intro/clock/minute-hand.png'
import CIRCLE from '@/static/images/intro/clock/cir.png'

const COG_RATIO_1 = 1
const COG_RATIO_2 = 0.67
const COG_RATIO_3 = 0.746
const COG_RATIO_4 = 0.662
const FIRST_COG_DURATION = 5

const COGS = [
  {
    className: 'w-[35.5%] -translate-x-1/2 z-0',
    src: COG_2,
    spinDuration: `${FIRST_COG_DURATION * COG_RATIO_1}s`,
    cogClass: 'animate-spin',
  },
  {
    className: 'w-[26.5%] translate-x-1/2 -translate-y-1/2 z-[1]',
    src: COG_4,
    spinDuration: `${FIRST_COG_DURATION * COG_RATIO_2}s`,
    cogClass: 'animate-spin-reverse',
  },
  {
    className: 'w-[23.8%] translate-x-1/2 translate-y-1/2 z-[2]',
    src: COG_3,
    spinDuration: `${FIRST_COG_DURATION * COG_RATIO_3}s`,
    cogClass: 'animate-spin',
  },
  {
    className: 'w-[23.5%] z-[3]',
    src: COG_1,
    spinDuration: `${FIRST_COG_DURATION * COG_RATIO_4}s`,
    cogClass: 'animate-spin-reverse',
  },
]

interface ClockProps {
  trigger?: boolean
  onDone?: () => void
  fadeInDuration?: number
  showDuration?: number
  fadeOutDuration?: number
  infinite?: boolean
}

export default function Clock({
  trigger = false,
  onDone = () => {},
  infinite = false,
  fadeInDuration = 1000,
  showDuration = 3000,
  fadeOutDuration = 1000,
}: ClockProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!trigger || !ref.current || infinite) return
    const el = ref.current
    let timeoutFadeOut: NodeJS.Timeout
    let timeoutDone: NodeJS.Timeout

    el.style.transition = 'none'
    el.style.opacity = '0'

    // small delay to force reflow
    requestAnimationFrame(() => {
      // fade in
      el.style.transition = `opacity ${fadeInDuration}ms ease`
      el.style.opacity = '1'

      // schedule fade out
      timeoutFadeOut = setTimeout(() => {
        el.style.transition = `opacity ${fadeOutDuration}ms ease`
        el.style.opacity = '0'
      }, fadeInDuration + showDuration)

      // schedule done callback
      timeoutDone = setTimeout(() => {
        onDone()
      }, fadeInDuration + showDuration + fadeOutDuration)
    })

    return () => {
      clearTimeout(timeoutFadeOut)
      clearTimeout(timeoutDone)
    }
  }, [fadeInDuration, fadeOutDuration, infinite, onDone, showDuration, trigger])

  return (
    <div
      ref={ref}
      className={clsx('relative w-fit h-fit', {
        'opacity-0': !infinite,
      })}
    >
      <img src={BG} className="relative w-60 h-auto object-contain z-0" />
      {/* absolute content: cog, hand */}
      <div className="absolute w-full h-auto aspect-square bottom-0 left-0 z-10">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* absolute cogs */}
          {COGS.map((cog, i) => (
            <div key={i} className={`absolute aspect-square ${cog.className}`}>
              <img
                src={cog.src}
                className={`w-full h-full object-contain ${cog.cogClass}`}
                style={{ animationDuration: cog.spinDuration }}
              />
            </div>
          ))}
          <div className="absolute w-[20.5%] aspect-[1.45] -translate-x-[calc(50%-5px)] -translate-y-[calc(50%-5px)] z-[4]">
            <img
              src={HH}
              className="w-full h-full object-contain animate-spin origin-[calc(100%-5px)_calc(100%-5px)]"
              style={{ animationDuration: '30s' }}
            />
          </div>
          <div className="absolute w-[28.8%] aspect-[1.17] translate-x-[calc(50%-5px)] -translate-y-[calc(50%-5px)] z-[5]">
            <img
              src={MH}
              className="w-full h-full object-contain animate-spin origin-[5px_calc(100%-5px)]"
              style={{ animationDuration: '0.5s' }}
            />
          </div>
          <img
            src={CIRCLE}
            className="absolute w-[5%] h-auto object-contain z-[6]"
          />
        </div>
      </div>
    </div>
  )
}
