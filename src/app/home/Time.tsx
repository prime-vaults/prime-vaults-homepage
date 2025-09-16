import Button from '@/components/UI/Button'
import Range from './components/Range'
import { useState } from 'react'

export default function TimePage() {
  const [range, setRange] = useState({ min: 0, max: 1 })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-2xl md:text-5xl text-primary font-bold">
          TIME IS MONEY
        </h3>
        <span>
          <b className="text-primary">PrimeVault</b> turns your deposits into
          continuous growth, harnessing real-time DeFi strategies so your assets
          never stop working.
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <div className="col-span-1 flex flex-col gap-1">
            <span>Starting amount</span>
            <input className="input" />
          </div>
          <div className="col-span-1 flex flex-col gap-1">
            <span>Target amount</span>
            <input className="input" />
          </div>
          <div className="col-span-full">
            <Range onChange={setRange} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span>APR</span>
          <input className="range" type="range" />
        </div>
        <div className="col-span-full flex flex-row justify-center">
          <Button className="btn btn-primary text-neutral">Calculate</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-4">
          <div />
          <p>ESTIMATED RESULT</p>
          <div />
        </div>

        <div className="flex flex-row items-center gap-1 countdown font-mono text-5xl text-primary">
          <span
            style={
              { '--value': Math.round(range.max * 100) } as React.CSSProperties
            }
            aria-live="polite"
          />
          HOURS
          <span
            style={
              { '--value': Math.round(range.min * 100) } as React.CSSProperties
            }
            aria-live="polite"
          />
          MONTHS
        </div>
        <span>From 10,000 → 100,000 with APY 20% (compounded annually)</span>
      </div>
    </div>
  )
}
