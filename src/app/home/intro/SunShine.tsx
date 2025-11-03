import { useLayoutEffect, useEffect, useRef, useState } from 'react'

const BASE_LIGHT_WIDTH = 100
const ANIM_DURATION = 8000

interface SunShineProps {
  trigger?: boolean
  onDone?: () => void
  fadeInDuration?: number // ms
  fadeOutDuration?: number // ms
  className?: string
  onProgress?: (progress: number) => void
}

export default function SunShine({
  trigger = false,
  onDone = () => {},
  fadeInDuration = 500,
  fadeOutDuration = 500,
  className = 'trapezoid h-[200px] bg-white/40',
  onProgress = () => {},
}: SunShineProps) {
  const [mounted, setMounted] = useState(false)
  const elRef = useRef<HTMLDivElement | null>(null)

  // controllers for timeouts & raf so we can cleanup anytime
  const fadeInTimer = useRef<number | null>(null)
  const fadeOutTimer = useRef<number | null>(null)
  const startTranslateTimer = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  // mount when trigger true, unmount when false
  useEffect(() => {
    if (trigger) setMounted(true)
    else setMounted(false)
  }, [trigger])

  // Main sequence controller:
  // 1) fade-in -> 2) start translate (1 full ANIM_DURATION) -> 3) fade-out -> 4) onDone + unmount
  useLayoutEffect(() => {
    const el = elRef.current
    if (!mounted || !el) return
    // Ensure no leftover transitions
    el.style.transition = 'none'
    el.style.opacity = '0'

    // small rAF to flush
    requestAnimationFrame(() => {
      // 1) start fade-in
      el.style.transition = `opacity ${fadeInDuration}ms ease`
      el.style.opacity = '1'

      // after fadeInDuration, start translate animation (exactly 1 cycle)
      fadeInTimer.current = window.setTimeout(() => {
        // 2) start translate animation for one full ANIM_DURATION
        const BASE_WIDTH = 1440 // same as gốc
        const m = -0.115
        const c = 0.5
        const startTimeRef = { value: 0 as number }

        function animate(time: number) {
          if (startTimeRef.value === 0) startTimeRef.value = time
          const elapsed = time - startTimeRef.value
          const clamped = Math.min(elapsed, ANIM_DURATION)
          const progress = clamped / ANIM_DURATION // 0..1

          const tPx = progress * window.innerWidth
          const tNorm = (tPx / BASE_WIDTH) * 100
          const thetaDeg = (Math.atan(m * tNorm + c) * 180) / Math.PI
          const scale = 1 + 0.35 * Math.sin(progress * Math.PI) // max +35%
          const width = BASE_LIGHT_WIDTH * scale // px

          // emit progress 👇
          onProgress(progress)

          // DO NOT CHANGE this transform logic — copied exactly
          el!.style.width = `${width}px`
          el!.style.transform = `
            perspective(35px)
            rotateX(14deg)
            translateX(${progress * 100}vw)
            skewX(${thetaDeg}deg)
          `

          if (elapsed < ANIM_DURATION) {
            rafRef.current = requestAnimationFrame(animate)
          } else {
            // finished 1 full translate cycle
            rafRef.current = null

            // 3) start fade-out
            el!.style.transition = `opacity ${fadeOutDuration}ms ease`
            el!.style.opacity = '0'

            // after fadeOutDuration -> call onDone and unmount
            fadeOutTimer.current = window.setTimeout(() => {
              try {
                onDone()
                onProgress(1)
              } finally {
                setMounted(false)
              }
            }, fadeOutDuration)
          }
        }

        rafRef.current = requestAnimationFrame(animate)
      }, fadeInDuration / 2)
    })

    // cleanup if unmount or trigger false
    return () => {
      if (fadeInTimer.current != null) {
        clearTimeout(fadeInTimer.current)
        fadeInTimer.current = null
      }
      if (fadeOutTimer.current != null) {
        clearTimeout(fadeOutTimer.current)
        fadeOutTimer.current = null
      }
      if (startTranslateTimer.current != null) {
        clearTimeout(startTranslateTimer.current)
        startTranslateTimer.current = null
      }
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (el) {
        el.style.transition = ''
        el.style.opacity = ''
      }
    }
  }, [mounted, fadeInDuration, fadeOutDuration, onDone, onProgress])

  if (!mounted) return null
  return <div ref={elRef} className={className} />
}
