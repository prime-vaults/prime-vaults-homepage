import { Fragment, useLayoutEffect, useRef, useState } from 'react'

import { useScaledPath } from '@/hooks/useMotionPath'

import PRIME_TOKEN from '@/static/images/intro/factory/pt-4.png'
import PRIME_TOKEN_2 from '@/static/images/intro/factory/pt-1.png'

const PATHS: {
  path: string
  viewBoxDelta: [number, number]
  img: string
  duration: number // millisecond
}[] = [
  {
    path: 'M29.3066 373.07L59.8066 257.57L1.30664 203.57L59.8066 116.07L21.8066 38.0703L116.807 1.07031L250.307 50.5703L453.807 1.07031L627.976 50.4766C628.19 50.5373 628.419 50.5249 628.625 50.4411L750.307 1.07031L837.807 26.0703',
    viewBoxDelta: [0, -116],
    img: PRIME_TOKEN,
    duration: 14000,
  },
  {
    path: 'M26.0713 400.426L54.0713 265.43L1.07129 121.93L43.5713 15.4297L143.571 52.9297L286.571 2.42969L468.071 52.9297L606.213 1.0642C606.444 0.977588 606.698 0.979199 606.928 1.06872L736.071 51.4297L839.071 24.918',
    viewBoxDelta: [0, -116],
    img: PRIME_TOKEN,
    duration: 8000,
  },
  {
    path: 'M23.3477 393.541L48.3477 237.033L1.34766 170.033L54.3477 126.033L11.8477 59.0332L109.348 46.0332L253.848 1.0332L446.137 41.9883C446.276 42.0179 446.419 42.0176 446.558 41.9873L613.848 5.5332L836.348 18.0332',
    viewBoxDelta: [0, -116],
    img: PRIME_TOKEN_2,
    duration: 12000,
  },
]

type TokenPathProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  viewBoxDelta?: [number, number]
  onCompleted?: () => void
}
function TokenPath({
  img,
  path,
  duration,
  parentBox,
  viewBoxDelta,
  onCompleted = () => {},
}: TokenPathProps) {
  const scaledPath = useScaledPath(path, parentBox, viewBoxDelta)
  const fallbackTimer = useRef<number | null>(null)

  useLayoutEffect(() => {
    fallbackTimer.current = window.setTimeout(() => {
      onCompleted()
    }, duration + 200)

    return () => {
      if (fallbackTimer.current !== null) {
        window.clearTimeout(fallbackTimer.current)
        fallbackTimer.current = null
      }
    }
  }, [duration, onCompleted])

  function handleAnimationEnd() {
    if (fallbackTimer.current !== null) {
      window.clearTimeout(fallbackTimer.current)
      fallbackTimer.current = null
    }
    onCompleted()
  }

  return (
    <img
      className="absolute w-6 h-auto top-3 left-2 object-contain"
      src={img}
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto',
        animation: `move-reverse ${duration}ms cubic-bezier(0.25, 0.85, 0.45, 1)`,
      }}
      onAnimationEnd={handleAnimationEnd}
    />
  )
}

type TokenInstance = {
  id: string
  pathIndex: number
}

export default function WrappedTokenPath() {
  const [tokens, setTokens] = useState<TokenInstance[]>([])
  const spawnInterval = 2000

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random().toString(36).slice(2)
      const pathIndex = Math.floor(Math.random() * PATHS.length)
      setTokens((prev) => [...prev, { id, pathIndex }])
    }, spawnInterval)

    return () => clearInterval(interval)
  }, [spawnInterval])

  // Khi animation xong thì xóa token
  const handleRemove = (id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <Fragment>
      {tokens.map((t) => {
        const p = PATHS[t.pathIndex]
        return (
          <TokenPath
            {...p}
            parentBox={[447.45, 176]}
            onCompleted={() => handleRemove(t.id)}
            key={t.id}
          />
        )
      })}
    </Fragment>
  )
}
