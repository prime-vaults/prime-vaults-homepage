import { useLayoutEffect, useRef, useState } from 'react'

import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

import RIVER from '@/static/images/intro/factory/river.png'
import PT_1 from '@/static/images/intro/factory/pt-4.png'

const PATHS: {
  path: string
  img: string
  duration: number // millisecond
  originalViewBox: [number, number, number, number]
}[] = [
  {
    path: 'M97.0382 0.399414C60.3987 84.5871 22.2221 339.724 152.461 375.322C299.77 415.586 597.354 169.964 690.5 134.899C755.892 110.283 901.5 87.8994 837.5 642.399',
    originalViewBox: [0, 0, 972, 643],
    img: PT_1,
    duration: 5000,
  },
  {
    path: 'M97.2702 0.399414C70.8713 76.7586 38.8674 316.179 176.176 345.585C331.482 378.845 587.079 144.426 685.426 113.892C854.5 61.3994 898.5 165.899 837.5 642.399',
    originalViewBox: [0, 0, 972, 643],
    img: PT_1,
    duration: 4000,
  },
  {
    path: 'M97.2667 0.399414C66.6053 79.8818 -21.1878 367.279 141.464 405C304.115 442.721 554.12 226.005 656.968 193.154C698.751 179.809 899.5 16.8994 837.5 642.399',
    originalViewBox: [0, 0, 972, 643],
    img: PT_1,
    duration: 7000,
  },
]

type RiverTokenPathProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  originalViewBox?: [number, number, number, number]
  onCompleted?: () => void
}
function RiverTokenPath({
  img,
  path,
  duration,
  parentBox,
  originalViewBox,
  onCompleted = () => {},
}: RiverTokenPathProps) {
  const scaledPath = useScaledPath({
    basePath: path,
    parentSize: parentBox,
    originalViewBox,
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
      className="absolute top-0 left-[4%] w-1/12 h-auto object-contain z-10"
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto -90deg',
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
