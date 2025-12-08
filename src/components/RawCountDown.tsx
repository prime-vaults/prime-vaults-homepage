import React, { useEffect, useState, useMemo } from 'react'

type PropsType = {
  finishAt: string
  className?: string
  onFinish?: () => void
}

export default function RawCountDown({
  finishAt,
  className,
  onFinish = () => {},
}: PropsType) {
  const finishAtUTC = useMemo(() => {
    const date = new Date(finishAt)
    return isNaN(date.getTime()) ? 0 : date.getTime()
  }, [finishAt])

  const [timeLeft, setTimeLeft] = useState(finishAtUTC - Date.now())

  useEffect(() => {
    if (!finishAtUTC) return

    const update = () => {
      const diff = finishAtUTC - Date.now()
      setTimeLeft(diff)
      if (diff <= 0) {
        if (onFinish) onFinish()
        clearInterval(interval)
      }
    }

    const interval = setInterval(update, 1000)
    update()

    return () => clearInterval(interval)
  }, [finishAtUTC, onFinish])

  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const segments: { label: string; value: number }[] = []
  if (days > 0) segments.push({ label: 'd', value: days })
  if (days > 0 || hours > 0) segments.push({ label: 'h', value: hours })
  if (days > 0 || hours > 0 || minutes > 0)
    segments.push({ label: 'm', value: minutes })
  segments.push({ label: 's', value: seconds })

  return (
    <div className="flex flex-row gap-2 items-center">
      {segments.map((seg) => (
        <div
          key={seg.label}
          className={`flex flex-row gap-0.5 items-baseline ${className}`}
        >
          <span className="countdown">
            <span
              style={{ '--value': seg.value } as React.CSSProperties}
              aria-live="polite"
            />
          </span>
          <span className="text-xs opacity-70">{seg.label}</span>
        </div>
      ))}
    </div>
  )
}
