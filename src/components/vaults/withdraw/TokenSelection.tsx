import { Repeat, WalletMinimal } from 'lucide-react'
import Button from '@/components/UI/Button'

import { useTokenSelection } from '@/hooks/useTokenAvailable'

const DUMMY_CHAINS = [
  { id: 1, name: 'Ethereum' },
  { id: 2, name: 'Binance Smart Chain' },
  { id: 3, name: 'Polygon' },
  { id: 6, name: 'Arbitrum' },
]

export default function TokenSelection() {
  const { setChain, setToken } = useTokenSelection()

  const onSelectChain = (chainId: number) => {
    setChain(chainId)
  }

  return (
    <div className="flex flex-col p-4 md:p-6 gap-4">
      <div className="flex flex-row items-center gap-2 border border-primary p-2 md:p-4">
        <div className="w-12 h-12 rounded-full bg-blue-300" />
        <div className="flex flex-col">
          <p className="text-xl md:text-2xl">PrimeUSD</p>
          <div className="flex flex-row gap-1 text-xs md:text-sm">
            <span>Your staked:</span>
            <span className="text-primary">Your staked: $20.01 USDC.e</span>
            <WalletMinimal className="w-4" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border border-base-100 p-2 md:p-4 gap-2">
        <div className="col-span-full flex flex-row justify-between items-center">
          <p>{1} chain</p>
          <Button className="btn btn-link !no-underline p-0">Select all</Button>
        </div>
        {DUMMY_CHAINS.map((chain) => {
          return (
            <label
              className="flex flex-row justify-between items-center bg-base-200 p-2 cursor-pointer select-none"
              key={chain.id}
            >
              <div className="flex flex-row items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-accent" />
                <p>{chain.name}</p>
              </div>
              <div>
                <input
                  type="radio"
                  className="radio"
                  onChange={(e) => e.target.checked && onSelectChain(chain.id)}
                />
              </div>
            </label>
          )
        })}
      </div>
      <div className="flex flex-col border border-base-100 gap-2">
        <div className="flex flex-row justify-between items-center p-2 md:p-4">
          <p>Your tokens</p>
          <Repeat className="w-4 cursor-pointer active:translate-y-[1px] transition-all" />
        </div>
        <div className="grid grid-cols-1 max-h-40 overflow-y-auto">
          {new Array(6).fill('').map((_, idx) => {
            return (
              <div
                className="flex flex-row justify-between items-center gap-2 py-1 px-2 cursor-pointer select-none nth-of-type-[2n+1]:bg-base-200"
                onClick={() => setToken(`0xFakeTokenAddress${idx}`)}
                key={idx}
              >
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-8 aspect-square rounded-full bg-amber-500" />
                  <p>Ethereum</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-base">0.13534 ETH</p>
                  <span className="text-xs text-secondary">$541.37</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
