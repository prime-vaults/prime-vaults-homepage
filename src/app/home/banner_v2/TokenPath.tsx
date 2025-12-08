import { useLayoutEffect, useRef, useState } from 'react'

import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

import PRIME_TOKEN from '@/static/images/intro/factory/pt-4.png'

const PATHS: {
  path: string
  originalViewBox: [number, number, number, number]
  img: string
  duration: number // millisecond
}[] = [
  {
    path: 'M50.5 514L82.6881 378.741L46 310.6L96.1559 250.674L46 195.567L82.6881 57.8477L159.5 102L261.5 39L375.849 89.5916C376.071 89.6897 376.321 89.7039 376.552 89.6315L538.5 39L687.81 89.7437L868 57.8477',
    originalViewBox: [0, 0, 869, 516],
    img: PRIME_TOKEN,
    duration: 14000,
  },
  {
    path: 'M54.9172 516L97.2415 316.29L44 236.205L68.3816 70.0306L147 101.063L322.15 41L463.961 101.564L628.695 43.666C628.988 43.563 629.312 43.6021 629.572 43.7717L718.227 101.564L868 71.5321',
    originalViewBox: [0, 0, 869, 516],
    img: PRIME_TOKEN,
    duration: 8000,
  },
  {
    path: 'M67.6262 516L76.0012 381L46 332L92.6929 265L46 177.5L76.0012 63.0206L243 95L402.721 50.0785C402.903 50.0272 403.096 50.0288 403.278 50.0829L553.724 95L697.734 50L865.5 70',
    originalViewBox: [0, 0, 869, 516],
    img: PRIME_TOKEN,
    duration: 12000,
  },
]

type TokenPathProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  originalViewBox?: [number, number, number, number]
  onCompleted?: () => void
}
function TokenPath({
  img,
  path,
  duration,
  parentBox,
  originalViewBox,
  onCompleted = () => {},
}: TokenPathProps) {
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
      className="absolute w-[6%] h-auto top-0 left-0 object-contain"
      src={img}
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto',
        animation: `move-reverse ${duration}ms cubic-bezier(0.4, 0.8, 0.6, 1.9), spin-reverse 3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 2`,
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
  const elmRef = useRef<HTMLDivElement | null>(null)
  const { width, height } = useElementSize(elmRef)
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
    <div className="absolute w-full h-full top-0 left-0" ref={elmRef}>
      {tokens.map((t) => {
        const p = PATHS[t.pathIndex]
        return (
          <TokenPath
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
