import { useId, useMemo } from 'react'

export default function StrokeHorizontal({
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
    if (reverse) return 'M163.285 2.47363 L0 2.47363'
    return 'M0 2.47363L163.285 2.47363'
  }, [reverse])

  return (
    <svg
      viewBox="0 -2.5 164 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0 2.47363L163.285 2.47363"
        stroke={`url(#${gradientId})`}
        strokeWidth="4.94803"
      />
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
          fill="freeze"
        />
        <animate
          from="600"
          to="50"
          attributeName="stroke-dashoffset"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
          fill="freeze"
        />
      </path>
      <defs>
        <linearGradient
          id={gradientId}
          x1="9.9433e-06"
          y1="2.44155"
          x2="163.285"
          y2="2.42277"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7E578" />
          <stop offset="1" stopColor="#78CF6E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
