import { useId, useMemo } from 'react'

export default function StrokeV({
  dur = '3s',
  begin = '4s',
  reverse = false,
  className,
}: {
  dur?: string
  begin?: string
  reverse?: boolean
  className?: string
}) {
  const gradientId = useId()

  const d = useMemo(() => {
    if (reverse) return 'M0 123H207V0'
    return 'M207 0V123H0'
  }, [reverse])

  return (
    <svg
      viewBox="2.5 2.5 208 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M207 0V123H0" stroke={`url(#${gradientId})`} strokeWidth="4" />
      {/* animate */}
      <path
        d={d}
        stroke="#BAE678"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="50 500"
        strokeDashoffset="600"
      >
        <animate
          from="50 500"
          to="50 500"
          attributeName="stroke-dasharray"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
        <animate
          from="600"
          to="50"
          attributeName="stroke-dashoffset"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <linearGradient
          id={gradientId}
          x1="-61.6058"
          y1="-0.141144"
          x2="-61.6055"
          y2="28.5345"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7E578" />
          <stop offset="1" stopColor="#78CF6E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
