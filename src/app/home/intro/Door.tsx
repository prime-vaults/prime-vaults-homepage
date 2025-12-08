import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import DOOR_BORDER from '@/static/images/intro/door/door-border.svg'
import DOOR_L from '@/static/images/intro/door/door-l.png'
import DOOR_R from '@/static/images/intro/door/door-r.png'
import TOKEN_L from '@/static/images/intro/door/token-l.png'
import TOKEN_R from '@/static/images/intro/door/token-r.png'

interface DoorProps {
  trigger?: boolean
  onDone?: () => void
  tokenDuration?: number // ms
}

export default function Door({
  trigger = false,
  onDone = () => {},
  tokenDuration = 3000,
}: DoorProps) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const doneFired = useRef(false)
  const [tokenRun, setTokenRun] = useState(false)

  // Step 1: Door open
  useEffect(() => {
    if (!trigger) return
    doneFired.current = false
    setTokenRun(false)

    const left = leftRef.current
    const right = rightRef.current
    if (!left || !right) return

    // Reset cửa
    left.style.transition = ''
    right.style.transition = ''
    left.style.transform = 'perspective(250px) rotateY(0deg)'
    right.style.transform = 'perspective(250px) rotateY(0deg)'

    // Mở cửa
    requestAnimationFrame(() => {
      left.style.transition = 'transform 1s linear'
      right.style.transition = 'transform 1s linear'
      left.style.transform = 'perspective(250px) rotateY(-135deg)'
      right.style.transform = 'perspective(250px) rotateY(135deg)'
    })

    // Khi cửa mở xong → bắt đầu token translate
    const doorTimer = setTimeout(() => {
      setTokenRun(true)
    }, 1000)

    return () => clearTimeout(doorTimer)
  }, [trigger])

  // Step 2: Token translate done → gọi onDone()
  useEffect(() => {
    if (!tokenRun) return
    const timer = setTimeout(() => {
      if (doneFired.current) return
      doneFired.current = true
      onDone()
    }, tokenDuration)
    return () => clearTimeout(timer)
  }, [tokenRun, tokenDuration, onDone])

  return (
    <div className="relative w-full h-fit flex flex-row items-center justify-center">
      {/* door border */}
      <img
        className="absolute top-0 left-0 w-full h-auto object-contain"
        src={DOOR_BORDER}
      />
      {/* door */}
      <div
        ref={leftRef}
        className="w-1/2 origin-bottom-left"
        style={{ transform: 'perspective(250px) rotateY(0deg)' }}
      >
        <img className="w-full h-auto object-contain" src={DOOR_L} />
      </div>
      <div
        ref={rightRef}
        className="w-1/2 origin-bottom-right"
        style={{ transform: 'perspective(250px) rotateY(0deg)' }}
      >
        <img className="w-full h-auto object-contain" src={DOOR_R} />
      </div>

      {/* token left 1 */}
      <div
        className={clsx('absolute bottom-0 transition-all', {
          'translate-y-96 -translate-x-36 md:-translate-x-96': tokenRun,
        })}
        style={{ transitionDuration: `${tokenDuration * 1.6}ms` }}
      >
        <img
          className={clsx(
            'w-[2vw] h-auto object-contain scale-0 transition-all',
            { 'scale-200': tokenRun },
          )}
          style={{
            transitionDuration: `${tokenDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0, 0.99, 1, 1)',
          }}
          src={TOKEN_L}
        />
      </div>

      {/* token left 2 */}
      <div
        className={clsx('absolute bottom-0 transition-all', {
          'translate-y-96 -translate-x-40 md:-translate-x-96': tokenRun,
        })}
        style={{ transitionDuration: `${tokenDuration * 1.2}ms` }}
      >
        <img
          className={clsx(
            'w-[5vw] h-auto object-contain scale-0 transition-all',
            { 'scale-200': tokenRun },
          )}
          style={{
            transitionDuration: `${tokenDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0, 0.99, 1, 1)',
          }}
          src={TOKEN_L}
        />
      </div>

      {/* token right */}
      <div
        className={clsx('absolute bottom-0 transition-all', {
          'translate-y-96 translate-x-40 md:translate-x-96': tokenRun,
        })}
        style={{ transitionDuration: `${tokenDuration}ms` }}
      >
        <img
          className={clsx(
            'w-[4vw] h-auto object-contain scale-0 transition-all',
            { 'scale-200': tokenRun },
          )}
          style={{
            transitionDuration: `${tokenDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0, 0.99, 1, 1)',
          }}
          src={TOKEN_R}
        />
      </div>
    </div>
  )
}
