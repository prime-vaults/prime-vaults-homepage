import Button from '@/components/UI/Button'
import Range from './components/Range'

export default function TimePage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-2xl md:text-5xl text-primary font-bold">
          TIME IS MONEY
        </p>
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
            <Range />
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
        <p>12 YEARS 3 MONTHS</p>
        <span>From 10,000 → 100,000 with APY 20% (compounded annually)</span>
      </div>
    </div>
  )
}
