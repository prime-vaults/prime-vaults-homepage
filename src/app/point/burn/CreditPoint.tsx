import { useState } from 'react'

import Button from '@/components/UI/Button'
import Corner from '@/components/UI/Corner'

import FIRE from '@/static/images/prime-point/fire.svg'

export default function CreditPointPage() {
  const [percent, setPercent] = useState(0)

  return (
    <div className="flex flex-col">
      {/* Credit point */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 ">
        <div className="flex flex-col gap-2">
          <p className="text-lg md:text-2xl">💫 Your Prime CreditPoint</p>
          <span>
            Every wallet tells a story — your CreditPoint reflects how you grow,
            save, and build trust in the PrimeVaults ecosystem. Reach $1,000+ in
            deposits to activate your reward and start building your Prime
            status.
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between text-sm text-secondary">
              <span>My deposited</span>
              <span>{percent}/$100</span>
            </div>
            <div className="w-full h-1 bg-base-100">
              <div
                className="bg-white h-full transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs text-primary font-medium">
              ${percent}%
            </span>
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center justify-center border border-base-100 p-6">
          <Corner cornerClassName="h-1/12" />
          <Button
            className="btn btn-primary"
            onClick={() => setPercent((prev) => prev + 1)}
          >
            Check my reward
          </Button>
        </div>
      </div>
      {/* Burn to Earn */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 p-4 md:p-6 border-t border-base-100">
          <div className="flex flex-row gap-2 items-center">
            <img src={FIRE} alt="burn to earn" />
            <div className="flex flex-col">
              <p className="text-lg md:text-2xl font-medium">Burn-To-Earn</p>
              <span className="text-secondary">
                Next reset in: <b className="text-primary">2D : 15H : 20M</b>
              </span>
            </div>
          </div>
          <p className="text-secondary">
            Burn-To-Earn is a <b className="text-primary">3-day solo event</b>{' '}
            where you burn <b className="text-primary">P.P</b> 💎 to compete for
            real rewards in <b className="text-primary">USD.p</b>. The more you
            burn, the higher your rank — and the bigger your share of the prize
            pool.
          </p>
        </div>
        <div className="grid grid-cols-12 p-4 md:p-6 border-t border-base-100">
          <div className="col-span-full md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-base-100 p-4">
            <span className="text-sm text-secondary">Rank</span>
            <p className="text-lg md:text-2xl font-bold">#47</p>
          </div>
          <div className="col-span-full md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-base-100 p-4">
            <span className="text-sm text-secondary">Total Reward</span>
            <p className="text-lg md:text-2xl font-bold text-primary">
              1000 P.P
            </p>
          </div>
          <div className="col-span-full md:col-span-6 flex flex-col gap-2 p-4">
            <div className="flex flex-row justify-between items-center">
              <span>Enter amount to burn</span>
              <div className="flex flex-row">
                <p>Your Balance:</p>
                <p>
                  <b className="text-primary">5555</b> P.P
                </p>
              </div>
            </div>
            <label className="w-full input input-lg bg-base-300 !outline-none pr-2.5">
              <input type="number" placeholder="0" />
              <Button className="btn btn-primary btn-xs">Max</Button>
            </label>
            <Button className="btn btn-primary">Burn Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
