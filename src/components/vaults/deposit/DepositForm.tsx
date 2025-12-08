import { useState } from 'react'

import { ArrowDown, WalletMinimal } from 'lucide-react'
import Button from '@/components/UI/Button'
import Range from '@/components/UI/Range'

import { useTokenSelection } from '@/hooks/useTokenAvailable'

export default function DepositForm() {
  const [value, setValue] = useState(0)
  const { reset } = useTokenSelection()

  return (
    <div className="flex flex-col p-4 md:p-6 gap-1">
      {/* input form */}
      <div className="relative flex flex-col border border-primary p-2 md:p-4 gap-2">
        <p>Amount</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex-1 flex flex-col">
            <input
              className="w-full text-3xl outline-none font-bold"
              type="number"
              placeholder="0"
            />
            <span className="text-xs text-secondary">$22.22</span>
          </div>
          <div
            className="flex flex-row gap-2 items-center py-1 px-2 bg-base-200 border border-base-100 cursor-pointer select-none"
            onClick={reset}
          >
            <div className="w-8 aspect-square rounded-full bg-amber-200" />
            <div className="flex flex-col">
              <p>ETH</p>
              <span className="text-xs text-secondary uppercase">Arbitrum</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between items-start">
          <div className="w-2/3">
            <Range value={value} onChange={setValue} step={25} />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <WalletMinimal className="w-4" />
            <p className="text-sm font-bold">1022.22</p>
          </div>
        </div>
        {/* arrow absolute */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center w-8 h-8 aspect-square bg-base-300 border border-primary">
          <ArrowDown className="w-4" />
        </div>
      </div>
      {/* view information */}
      <div className="bg-base-200 flex flex-col gap-2 py-2 md:py-4">
        <div className="flex flex-row justify-between items-center px-2 md:px-4">
          <p className="text-sm">Received vault</p>
        </div>
        <div className="flex flex-row justify-between items-center px-2 md:px-4">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-12 aspect-square rounded-full bg-blue-400" />
            <p className="text-xl md:text-2xl font-bold">PrimeUSD</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xl md:text-2xl text-primary font-bold">
              20.00 USDC.e
            </p>
            <span className="text-xs text-secondary">$20.00</span>
          </div>
        </div>
        {/* divider */}
        <div className="divider h-0 after:h-[1px] before:h-[1px]" />
        <div className="flex flex-col gap-2 px-2 md:px-4">
          <p className="text-base md:text-xl font-medium">DEPOSIT SUMMARY</p>
          <div className="flex flex-row justify-between items-center">
            <p>APR:</p>
            <span className="text-primary">32.75%</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p>Estimate fees:</p>
            <span className="text-primary">$0.5</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p>Receiving vaults:</p>
            <span className="text-primary">$50.5</span>
          </div>
        </div>
      </div>
      {/* action */}
      <Button className="btn btn-primary w-full mt-4">Deposit</Button>
    </div>
  )
}
