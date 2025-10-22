import { useAccount } from 'wagmi'

import { Copy, SquareArrowOutUpRight, SquareArrowUpRight } from 'lucide-react'
import { shortenString } from '@/helpers/utils'

export default function Details() {
  const { address } = useAccount()
  return (
    <div className="flex flex-col gap-2 border border-base-100 bg-base-300 p-4">
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Strategist</p>
        <div className="flex flex-row gap-1 items-center">
          <img src="/favicon.svg" className="w-4 object-contain" />
          <p>PrimeAI</p>
          <SquareArrowUpRight className="w-6" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Yield Source</p>
        <div className="flex flex-row gap-1 items-center">
          <p>Kodiak</p>
          <img src="/favicon.svg" className="w-4 object-contain" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Symbol Token</p>
        <div className="flex flex-row gap-1 items-center">
          <p>USDC.e</p>
          <img src="/favicon.svg" className="w-4 object-contain" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="tooltip">
          <div className="tooltip-content">
            <p>Content Platform Fee</p>
          </div>
          <p>Platform Fee</p>
        </div>
        <p>2%</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="tooltip">
          <div className="tooltip-content">
            <p>Content Performance Fee</p>
          </div>
          <p>Performance Fee</p>
        </div>
        <p>0%</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="tooltip">
          <div className="tooltip-content">
            <p>Content Withdrawal Fee</p>
          </div>
          <p>Withdrawal Fee</p>
        </div>
        <p>0%</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>List date</p>
        <p>9 months ago</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Rewards</p>
        <div className="flex flex-row gap-1 items-center">
          <p>USDC</p>
          <img src="/favicon.svg" className="w-4 object-contain" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Contract Address</p>
        <div className="flex flex-row gap-1 items-center text-primary cursor-pointer">
          {address && <p className="underline">{shortenString(address)}</p>}
          <Copy className="w-4" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center gap-2">
        <p>Audit by</p>
        <div className="flex flex-row gap-1 items-center cursor-pointer">
          <p>0xEthan</p>
          <SquareArrowOutUpRight className="w-4" />
        </div>
      </div>
    </div>
  )
}
