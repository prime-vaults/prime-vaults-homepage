import { useEffect, useLayoutEffect, useRef, useState } from 'react'

type RangeProps = { onChange?: (range: { min: number; max: number }) => void }
export default function Range({ onChange = () => {} }: RangeProps) {
  const [range, setRange] = useState({ min: 0, max: 1 })
  const rightRef = useRef<HTMLDivElement | null>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!leftRef.current || !rightRef.current || !containerRef.current) return

    const l = leftRef.current
    const r = rightRef.current
    const container = containerRef.current

    const initialHandleSize = 16

    const updateRange = () => {
      const containerWidth = container.offsetWidth
      const leftWidth = l.offsetWidth
      const rightWidth = r.offsetWidth
      let min =
        (leftWidth - initialHandleSize) /
        (containerWidth - initialHandleSize * 2)
      let max =
        1 -
        (rightWidth - initialHandleSize) /
          (containerWidth - initialHandleSize * 2)
      // Clamp values
      min = Math.max(0, Math.min(1, min))
      max = Math.max(0, Math.min(1, max))
      // Ensure min <= max
      if (min > max) {
        const temp = min
        min = max
        max = temp
      }
      setRange({ min, max })
    }

    const observer = new ResizeObserver(updateRange)
    observer.observe(l)
    observer.observe(r)
    observer.observe(container)

    // Initial calculation
    setTimeout(updateRange, 0)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    onChange(range)
  }, [onChange, range])

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-row items-center h-1 bg-secondary relative"
    >
      {/* left handle */}
      <div className="relative w-fit h-full min-w-2.5 max-w-[calc(100% - 16px)]">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 border-2 border-neutral bg-base-200 cursor-pointer z-[1]" />
        <div
          ref={leftRef}
          className="relative top-1/2 -translate-y-1/2 h-4 w-4 max-w-full resize-x overflow-hidden opacity-0 z-[2]"
        />
      </div>
      {/* track */}
      <div className="flex-1 h-full bg-primary" />
      {/* right handle */}
      <div className="relative w-fit h-full min-w-2.5 max-w-[calc(100% - 16px)]">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 border-2 border-neutral bg-base-200 z-[1]" />
        <div
          ref={rightRef}
          style={{ direction: 'rtl' }}
          className="relative top-1/2 -translate-y-1/2 h-4 w-4 max-w-full resize-x overflow-hidden opacity-0 z-[2]"
        />
      </div>
    </div>
  )
}
