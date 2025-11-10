type DashType = {
  from: string
  to: string
}

function AnimatePath({
  d,
  id,
  dur = '3s',
  begin = '2s',
  repeatCount = 'indefinite',
  array = { from: '50 500', to: '50 500' },
  offset = { from: '600', to: '50' },
}: {
  d: string
  id?: string
  dur?: string
  begin?: string
  repeatCount?: string
  array?: DashType
  offset?: DashType
}) {
  return (
    <path
      d={`${d}`}
      stroke="orange"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="50 500"
      strokeDashoffset="600"
    >
      <animate
        id={id}
        {...array}
        attributeName="stroke-dasharray"
        dur={dur}
        begin={begin}
        repeatCount={repeatCount}
        fill="freeze"
      />
      <animate
        {...offset}
        attributeName="stroke-dashoffset"
        dur={dur}
        begin={begin}
        repeatCount={repeatCount}
        fill="freeze"
      />
    </path>
  )
}

export default function BranchLeft() {
  const d1 = 'M113.211 91.2004H256.061'
  const d2 =
    'M-8.84533e-05 185.551H98.3184C106.543 185.551 113.211 178.883 113.211 170.658V127.441 91.2004'

  const d3 =
    'M-8.84533e-05 2.47363H56.6053H98.3184C106.543 2.47363 113.211 9.14115 113.211 17.366V58.7089 91.2004'

  const d4 = 'M-8.84533e-05 58.7089H113.211 113.211V58.7089 91.2004'

  const d5 = 'M-8.84533e-05 127.441H113.211 V127.441 91.2004'
  const path = `${d1}${d2}${d3}${d4}${d5}`

  return (
    <svg
      width="257"
      height="194"
      viewBox="0 -2.5 257 194"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} stroke="url(#paint0_linear_2664_478284)" strokeWidth="5" />

      <AnimatePath d={d2} />
      <AnimatePath d={d3} />
      <AnimatePath d={d4} />
      <AnimatePath d={d5} />
      <AnimatePath
        d={d1}
        array={{ from: '100 500', to: '100 500' }}
        offset={{ from: '1000', to: '100' }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_2664_478284"
          x1="128.03"
          y1="2.47364"
          x2="128.03"
          y2="185.551"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7E578" />
          <stop offset="1" stopColor="#78CF6E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
