import { useMemo } from 'react'

export default function StrokeVertical({
  dur = '3s',
  begin = '4s',
  reverse = false,
}: {
  dur?: string
  begin?: string
  reverse?: boolean
}) {
  const d = useMemo(() => {
    if (reverse) return 'M2.00001 143 L2 0'
    return 'M2 0L2.00001 143'
  }, [reverse])

  return (
    <svg
      width="10"
      height="143"
      viewBox="-2.5 0 10 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 0L2.00001 143"
        stroke="url(#paint0_linear_2664_478211)"
        strokeWidth="4"
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
          id="paint0_linear_2664_478211"
          x1="2.03209"
          y1="8.70663e-06"
          x2="2.04649"
          y2="143"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7E578" />
          <stop offset="1" stopColor="#78CF6E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
