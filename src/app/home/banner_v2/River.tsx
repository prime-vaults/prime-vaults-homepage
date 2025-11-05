import { useLayoutEffect, useRef, useState } from 'react'

import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

import RIVER from '@/static/images/intro/factory/river.png'
import PT_1 from '@/static/images/intro/factory/pt-1.png'
import PT_2 from '@/static/images/intro/factory/pt-2.png'
import PT_3 from '@/static/images/intro/factory/pt-3.png'

const PATHS: {
  path: string
  img: string
  duration: number // millisecond
}[] = [
  {
    path: 'M26.6951 0.352539C-0.805458 73.3525 -37.8442 301.24 105.194 329.353C266.981 361.15 533.394 135.544 635.694 107.853C762.194 73.6109 932.194 96.8525 823.194 445.853',
    img: PT_1,
    duration: 5000,
  },
  {
    path: 'M37.5272 0.427734C-0.573563 80.9277 -40.4716 325.889 94.9611 359.928C248.145 398.428 541.166 183.957 638.027 150.428C706.027 126.889 890.527 84.9277 770.027 448.928',
    img: PT_2,
    duration: 4000,
  },
  {
    path: 'M52.1995 0.386719C20.2782 76.4651 -67.3207 352.054 102.015 388.159C271.349 424.265 531.626 216.83 638.7 185.387C682.2 172.612 914.698 122.887 690.198 444.387',
    img: PT_3,
    duration: 7000,
  },
]

type RiverTokenPathProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  viewBoxDelta?: [number, number]
  onCompleted?: () => void
}
function RiverTokenPath({
  img,
  path,
  duration,
  parentBox,
  viewBoxDelta,
  onCompleted = () => {},
}: RiverTokenPathProps) {
  const scaledPath = useScaledPath({
    basePath: path,
    parentSize: parentBox,
    viewBoxDelta,
  })
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
      onAnimationEnd={handleAnimationEnd}
      className="absolute top-0 left-[4%] w-1/12 h-auto object-contain z-0"
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto',
        animation: `move ${duration}ms cubic-bezier(0.25, 0.85, 0.45, 1)`,
      }}
      src={img}
    />
  )
}

type TokenInstance = {
  id: string
  pathIndex: number
}
export default function River() {
  const elmRef = useRef<HTMLDivElement | null>(null)
  const { height, width } = useElementSize(elmRef)
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

  const handleRemove = (id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div
      ref={elmRef}
      className="relative w-full h-full pointer-events-none select-none"
    >
      <img className="relative w-full h-auto object-contain z-0" src={RIVER} />

      {tokens.map((t) => {
        const p = PATHS[t.pathIndex]
        return (
          <RiverTokenPath
            {...p}
            parentBox={[width, height]}
            onCompleted={() => handleRemove(t.id)}
            key={t.id}
          />
        )
      })}
    </div>
  )
}
