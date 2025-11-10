type DashType = {
  from: string
  to: string
}

function AnimatePath({
  d,
  id,
  dur = '3s',
  begin = '0s',
  repeatCount = 'indefinite',
  array = { from: '50 500', to: '50 500' },
  offset = { from: '850', to: '50' },
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

export default function BranchRight() {
  const d1 = 'M0 91.2004H142.85M142.85 91.2004'
  const d3 =
    'M142.85 91.2004 V170.658 C142.85 178.883 149.517 185.551 157.742 185.551 H256.061'

  const d4 =
    'M142.85 91.2004 V17.366 C142.85 9.14115 149.517 2.47363 157.742 2.47363 H199.455 H256.061'

  const d5 = 'M142.85 91.2004V58.7089H256.061'
  const d6 = 'M142.85 91.2004V127.441H256.061'
  const path = `${d1}${d3}${d4}${d5}${d6}`

  return (
    <svg
      width="257"
      height="195"
      viewBox="0 -2.5 257 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d={path} stroke="url(#paint0_linear_2664_478191)" strokeWidth="5" />
      <AnimatePath d={d3} />
      <AnimatePath d={d4} />
      <AnimatePath d={d5} />
      <AnimatePath d={d6} />
      <AnimatePath
        d={d1}
        array={{ from: '50 500', to: '50 500' }}
        offset={{ from: '600', to: '50' }}
      />
      <defs>
        <linearGradient
          id="paint0_linear_2664_478191"
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
