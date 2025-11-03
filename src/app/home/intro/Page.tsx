import clsx from 'clsx'
import { useRef, useState } from 'react'

import Clock from './Clock'
import LoadingCanvas from '@/components/UI/Loading'
import Background from './Background'

let timer: NodeJS.Timeout
const DURATION = 600

export default function IntroPage() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const elmRef = useRef<HTMLDivElement | null>(null)

  const onFinish = () => {
    if (!elmRef.current) return
    const el = elmRef.current
    el.style.transition = `opacity ${DURATION}ms ease`
    el.style.opacity = '0'

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setVisible(false)
    }, DURATION)
  }
  if (!visible) return null

  return (
    <div
      // ref={elmRef}
      className="fixed top-0 left-0 w-screen h-screen bg-base-300 transition-all z-[999]"
    >
      <div className="relative w-full h-full">
        {/* clock loading... */}
        <div
          className={clsx(
            'absolute top-0 left-0 w-full h-full transition-all duration-700 z-10',
            {
              'opacity-100': step === 0,
              'opacity-0 pointer-events-none select-none': step > 0,
            },
          )}
        >
          <div className="relative w-full h-full">
            <LoadingCanvas mode={[]} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Clock
                trigger={step === 0}
                onDone={() => setStep((prev) => prev + 1)}
              />
            </div>
          </div>
        </div>
        <Background
          step={step}
          onDone={onFinish}
          onNextStep={() => setStep((prev) => prev + 1)}
        />
      </div>
    </div>
  )
}
