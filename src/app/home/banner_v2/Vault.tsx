import { useLayoutEffect, useRef, useState } from 'react'
import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

import VAULT_B from '@/static/images/intro/factory/vault-b.png'
import VAULT_T from '@/static/images/intro/factory/vault-t.png'
import BTC from '@/static/images/intro/factory/btc.png'
import ETH from '@/static/images/intro/factory/eth.png'
import COG from '@/static/images/intro/factory/cog.png'
import USD from '@/static/images/intro/factory/usd.png'

const PATHS: {
  path: string
  img: string
  duration: number // millisecond
  originalViewBox: [number, number, number, number]
}[] = [
  {
    path: 'M0.078125 0.494141L48.9102 8.26848C99.19 16.2733 141.955 49.2832 162.434 95.896C170.772 114.876 175.078 135.381 175.078 156.112V186.048V397.494',
    img: BTC,
    duration: 4000,
    originalViewBox: [0, 0, 350, 398],
  },
  {
    path: 'M200 0.5C172.386 0.5 150 22.8858 150 50.5V397.5',
    img: ETH,
    duration: 2000,
    originalViewBox: [0, 0, 350, 398],
  },
  {
    path: 'M200 0.5C172.386 0.5 150 22.8858 150 50.5V397.5',
    img: USD,
    duration: 3200,
    originalViewBox: [0, 0, 350, 398],
  },
]

type TokenProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  originalViewBox?: [number, number, number, number]
  onCompleted?: () => void
}
function Token({
  img,
  path,
  duration,
  parentBox,
  originalViewBox,
  onCompleted = () => {},
}: TokenProps) {
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
      className="absolute w-1/4 h-auto -top-1/2 left-0 object-contain z-0"
      src={img}
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto',
        animation: `move ${duration}ms cubic-bezier(0.39, 0.575, 0.565, 1)`,
      }}
      onAnimationEnd={handleAnimationEnd}
    />
  )
}

type TokenInstance = {
  id: string
  pathIndex: number
}
export default function Vault() {
  const elmRef = useRef<HTMLDivElement | null>(null)
  const [tokens, setTokens] = useState<TokenInstance[]>([])
  const { width, height } = useElementSize(elmRef)
  const spawnInterval = 1000

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
    <div
      ref={elmRef}
      className="relative w-fit h-fit flex flex-col items-center justify-center pointer-events-none select-none"
    >
      <img
        className="relative w-[26.5dvw] h-auto object-contain z-0"
        src={VAULT_T}
      />
      <img
        className="relative w-[26.5dvw] h-auto object-contain z-10"
        src={VAULT_B}
      />
      <img
        className="absolute w-1/2 h-auto object-contain animate-spin z-20"
        style={{ animationTimingFunction: 'steps(5, end)' }}
        src={COG}
      />
      {tokens.map((t) => {
        const p = PATHS[t.pathIndex]
        return (
          <Token
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
