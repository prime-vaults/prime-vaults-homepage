import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { ArrowRight } from 'lucide-react'
import Corner from '@/components/UI/Corner'

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

type RangeItemProps = {
  label?: string
  onChange?: (val: number) => void
  min?: number
  max?: number
  value?: number
}

export const RangeItem = ({
  onChange = () => {},
  label,
  min = 0,
  max = 100000,
  value = 0,
}: RangeItemProps) => {
  const [percentage, setPercentage] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const thumbRef = useRef<HTMLDivElement | null>(null)

  const draggingRef = useRef(false)
  const pointerOffsetRef = useRef(0)
  const percRef = useRef(percentage)

  // Convert value to percentage when value prop changes
  useEffect(() => {
    if (max > min) {
      const newPercentage = (value - min) / (max - min)
      setPercentage(clamp(newPercentage, 0, 1))
    }
  }, [value, min, max])

  useEffect(() => {
    percRef.current = percentage
  }, [percentage])

  useLayoutEffect(() => {
    const container = containerRef.current
    const thumb = thumbRef.current
    if (!container || !thumb) return

    const onPointerMove = (ev: PointerEvent) => {
      if (!draggingRef.current) return
      const containerRect = container.getBoundingClientRect()
      const thumbRect = thumb.getBoundingClientRect()
      const available = Math.max(0, containerRect.width - thumbRect.width)
      let newLeft = ev.clientX - containerRect.left - pointerOffsetRef.current
      newLeft = Math.max(0, Math.min(available, newLeft))
      const newPerc = available > 0 ? newLeft / available : 0
      const actualValue = min + newPerc * (max - min)
      setPercentage(newPerc)
      onChange(actualValue)
    }

    const onPointerUp = () => {
      draggingRef.current = false
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    const onPointerDown = (ev: PointerEvent) => {
      ev.preventDefault()
      draggingRef.current = true
      const thumbRect = thumb.getBoundingClientRect()
      pointerOffsetRef.current = ev.clientX - thumbRect.left
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
    }

    thumb.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const ro = new ResizeObserver(() => {
      const cw = container.offsetWidth
      const thw = thumb.offsetWidth
      const available = Math.max(0, cw - thw)
      const clamped = available > 0 ? clamp(percRef.current, 0, 1) : 0
      if (clamped !== percRef.current) {
        setPercentage(clamped)
      }
    })
    ro.observe(container)
    ro.observe(thumb)

    return () => {
      thumb.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      ro.disconnect()
    }
  }, [onChange, min, max])

  const cw = containerRef.current?.offsetWidth ?? 0
  const thw = thumbRef.current?.offsetWidth ?? 0
  const available = Math.max(0, cw - thw)
  const leftPx = percentage * available

  const currentValue = min + percentage * (max - min)

  return (
    <div
      ref={containerRef}
      className="relative w-full h-14 bg-base-200 select-none"
    >
      <div
        ref={thumbRef}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(currentValue)}
        tabIndex={0}
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center px-3 py-1 bg-base-100 cursor-grab z-10"
        style={{ left: `${leftPx}px` }}
      >
        <p className="text-primary text-xs text-nowrap">{label}</p>
        <p className="text-primary text-sm text-nowrap font-bold">
          ${Math.round(currentValue).toLocaleString()}
        </p>
        <Corner />
      </div>
    </div>
  )
}

type RangeProps = {
  onChange?: (key: string, value: number) => void
  fund?: number
  goal?: number
}

export default function Range({
  onChange = () => {},
  fund = 0,
  goal = 0,
}: RangeProps) {
  const handleChange = useCallback(
    (key: string, value: number) => {
      onChange(key, value)
    },
    [onChange],
  )

  // Calculate min/max for goal based on fund
  const goalMin = fund * 2
  const goalMax = fund * 10

  return (
    <div className="grid grid-cols-7 items-center">
      <div className="col-span-3">
        <RangeItem
          label="Your Fund"
          min={0}
          max={1000000}
          value={fund}
          onChange={(value) => handleChange('fund', value)}
        />
      </div>
      <div className="col-span-1 w-full flex flex-col items-center">
        <ArrowRight className="text-primary" size={24} />
      </div>
      <div className="col-span-3">
        <RangeItem
          label="Your Financial Goal"
          min={goalMin}
          max={goalMax}
          value={goal}
          onChange={(value) => handleChange('goal', value)}
        />
      </div>
    </div>
  )
}
