import VAULT_B from '@/static/images/intro/factory/vault-b.png'
import VAULT_T from '@/static/images/intro/factory/vault-t.png'
import BTC from '@/static/images/intro/factory/btc.png'
import ETH from '@/static/images/intro/factory/eth.png'
import COG from '@/static/images/intro/factory/cog.png'
import USD from '@/static/images/intro/factory/usd.png'
import { useLayoutEffect, useRef, useState } from 'react'
import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

const PATHS: {
  path: string
  img: string
  duration: number // millisecond
}[] = [
  {
    path: 'M0 0.5H13C67.6762 0.5 112 44.8238 112 99.5V385.5',
    img: BTC,
    duration: 14000,
  },
  {
    path: 'M0 0.5C22.0914 0.5 40 18.4086 40 40.5V385.5',
    img: ETH,
    duration: 8000,
  },
  {
    path: 'M105.5 0.5C53.1505 0.5 10.2998 42.1452 8.80626 94.4734L0.500001 385.5',
    img: USD,
    duration: 12000,
  },
]

type TokenProps = {
  path: string
  img: string
  duration: number
  parentBox: [number, number]
  viewBoxDelta?: [number, number]
  onCompleted?: () => void
}
function Token({
  img,
  path,
  duration,
  parentBox,
  viewBoxDelta,
  onCompleted = () => {},
}: TokenProps) {
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
    <div className="absolute w-1/4 -top-[50%] h-fit z-0">
      <img
        className="w-full h-auto object-contain animate-bounce"
        src={img}
        style={{
          offsetPath: `path("${scaledPath}")`,
          offsetRotate: 'auto',
          animation: `move ${duration}ms cubic-bezier(0.25, 0.85, 0.45, 1)`,
        }}
        onAnimationEnd={handleAnimationEnd}
      />
    </div>
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
    <div className="relative flex flex-col items-center justify-center">
      <img className="relative w-44 h-auto object-contain z-0" src={VAULT_T} />
      <img className="relative w-44 h-auto object-contain z-10" src={VAULT_B} />
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
