import { useLayoutEffect, useRef, useState } from 'react'

import { useElementSize, useScaledPath } from '@/hooks/useMotionPath'

import PRIME_TOKEN from '@/static/images/intro/factory/pt-4.png'

const PATHS: {
  path: string
  viewBoxDelta: [number, number]
  img: string
  duration: number // millisecond
}[] = [
  {
    path: 'M25.8174 618.32L56.3174 497.32L1.31738 444.32L56.3174 367.82L16.8174 295.82L119.317 246.32L257.817 295.82L453.317 258.82L624.469 295.745C624.694 295.794 624.929 295.763 625.135 295.658L721.817 246.32L855.317 283.32L896.817 198.32L855.317 138.32L896.817 69.8203L873.317 0.320312',
    viewBoxDelta: [0, 0],
    img: PRIME_TOKEN,
    duration: 14000,
  },
  {
    path: 'M24.1284 592.164L52.6582 414.664L1.1582 346.664L52.6582 234.164L140.658 270.164L274.158 225.664L458.658 270.164L584.418 225.749C584.576 225.693 584.745 225.678 584.91 225.704L821.158 263.664L900.158 196.664L848.658 116.664L906.158 54.1641L858.658 0.664062',
    viewBoxDelta: [0, 0],
    img: PRIME_TOKEN,
    duration: 8000,
  },
  {
    path: 'M31.083 612.91L69.083 450.402L1.58301 390.402L62.083 345.402L19.583 278.402L117.083 265.402L261.583 220.402L453.83 261.349C453.996 261.384 454.168 261.376 454.33 261.327L621.583 210.402L745.083 269.402L884.583 246.902L838.083 188.902L916.083 139.902L847.083 103.902L892.583 0.402344',
    viewBoxDelta: [0, 0],
    img: PRIME_TOKEN,
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
      className="absolute w-[5%] h-auto top-[18px] left-0 object-contain"
      src={img}
      style={{
        offsetPath: `path("${scaledPath}")`,
        offsetRotate: 'auto',
        animation: `move-reverse ${duration}ms cubic-bezier(0.4, 0.8, 0.6, 1.9), spin-reverse 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`,
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
    <div className="absolute w-full h-full bottom-0" ref={elmRef}>
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
