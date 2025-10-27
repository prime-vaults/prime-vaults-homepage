import { Fragment } from 'react'

import Button from '@/components/UI/Button'
import { MoveRight } from 'lucide-react'

function CardItem() {
  return (
    <Fragment>
      <div className="col-span-3 flex flex-row items-center gap-1 text-black font-bold">
        <p className="py-0.5 px-2 bg-primary">7d</p>
        <span className="text-white">:</span>
        <p className="py-0.5 px-2 bg-primary">22h</p>
        <span className="text-white">:</span>
        <p className="py-0.5 px-2 bg-primary">32m</p>
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <p className="text-sm md:text-base">
            0.1 <b>USDC.e</b>
          </p>
          <div className="w-4 h-4 rounded-full bg-amber-200" />
        </div>
        <span className="text-xs md:text-sm text-secondary">$0.01</span>
      </div>
      <div className="col-span-3 flex flex-col">
        <div className="flex flex-row gap-1 items-center">
          <MoveRight className="w-4 text-primary" />
          <p className="text-sm md:text-base text-primary">
            0.1 <b className="text-white">USDC</b>
          </p>
          <div className="w-4 h-4 rounded-full bg-amber-200" />
        </div>
        <span className="text-xs md:text-sm text-secondary">$0.01</span>
      </div>
      <div className="col-span-3">
        <Button className="btn btn-primary">Speed claim</Button>
      </div>
    </Fragment>
  )
}

export default function WithdrawCard() {
  return (
    <div className="flex flex-col gap-2 border border-base-100 bg-base-200">
      <div className="flex flex-row gap-4 items-center justify-between p-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-200" />
          <p className="text-xl md:text-2xl font-medium">PrimeUSD</p>
        </div>
        <div className="flex flex-row gap-2 items-center border border-base-100 py-2 px-4 bg-fixed-img">
          <p>Total Withdrawing:</p>
          <p className="text-primary">$19.001</p>
        </div>
      </div>
      <div className="flex flex-col border-t border-base-100">
        {/* header */}
        <div className="col-span-full grid grid-cols-12 border-b border-base-100 p-4 bg-fixed-img">
          <div className="col-span-3">
            <p className="text-secondary">Claim Timer</p>
          </div>
          <div className="col-span-3">
            <p className="text-secondary">Total withdrawing</p>
          </div>
          <div className="col-span-3">
            <p className="text-secondary">Withdraw to</p>
          </div>
          <div className="col-span-3">
            <p className="text-secondary">Action</p>
          </div>
        </div>
        {/* body */}
        <div className="grid grid-cols-12 p-4 gap-2 bg-base-300">
          {new Array(3).fill('').map((_, idx) => (
            <CardItem key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}
