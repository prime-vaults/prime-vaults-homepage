import React, { useEffect, useState } from 'react'

type PropsType = {
  finishAt: number
  onFinish?: () => void
}

const CountDown = ({ finishAt, onFinish }: PropsType) => {
  const [timeLeft, setTimeLeft] = useState(finishAt - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(finishAt - Date.now())
      if (finishAt - Date.now() <= 0) {
        if (onFinish) {
          onFinish()
        }
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [finishAt, onFinish])

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ '--value': hours } as React.CSSProperties}
            aria-live="polite"
          />
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ '--value': minutes } as React.CSSProperties}
            aria-live="polite"
          />
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ '--value': seconds } as React.CSSProperties}
            aria-live="polite"
          />
        </span>
        sec
      </div>
    </div>
  )
}

export default CountDown
