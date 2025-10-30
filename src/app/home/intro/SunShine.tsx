import { useLayoutEffect } from 'react'

const BASE_LIGHT_WIDTH = 100

export default function SunShine() {
  useLayoutEffect(() => {
    const element = document.querySelector<HTMLElement>('.trapezoid')
    if (!element) return

    const BASE_WIDTH = 1440 // mày tune trên cỡ này
    const m = -0.115
    const c = 0.5

    function animate(time: number) {
      const duration = 14000
      const progress = (time % duration) / duration // 0..1
      const tPx = progress * window.innerWidth
      const tNorm = (tPx / BASE_WIDTH) * 100
      const thetaDeg = (Math.atan(m * tNorm + c) * 180) / Math.PI
      const scale = 1 + 0.35 * Math.sin(progress * Math.PI) // max +35%
      const width = BASE_LIGHT_WIDTH * scale // px

      element!.style.width = `${width}px`
      element!.style.transform = `
          perspective(35px)
          rotateX(14deg)
          translateX(${progress * 100}vw)
          skewX(${thetaDeg}deg)
        `

      requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <div className="trapezoid h-[200px] bg-white/40" />
}
