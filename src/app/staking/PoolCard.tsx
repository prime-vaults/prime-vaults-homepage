import {
  formatNumber,
  IPool,
  TokenAvatar,
  TokenName,
  TokenSymbol,
  // useRewards,
} from '@beraji/web3-sdk'

import Deposit from '@/components/staking/deposit/Page'

import { usePoolStat } from '@/hooks/usePrimePools'

const PoolCard = (props: { pool: IPool }) => {
  const poolStat = usePoolStat(props.pool.poolId)
  // const rewards = useRewards(props.pool.poolId)

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="avatar">
              <TokenAvatar
                token={props.pool.stakingToken}
                className="size-10"
              />
            </div>
            <div className="flex flex-col ">
              <TokenName
                token={props.pool.stakingToken}
                className="text-xl font-bold"
              />
              <TokenSymbol
                token={props.pool.stakingToken}
                className="text uppercase"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 md:gap-8">
            <div className="flex flex-col items-center py-1 px-4 border border-base-100 bg-base-300">
              <span className="text-secondary">TVL</span>
              <p className="text-xl md:text-2xl font-bold">
                {formatNumber(poolStat.totalValueLocked, '$')}
              </p>
            </div>
            <div className="flex flex-col items-center py-1 px-4 border bg-base-300 shadow-[0_0_14px] shadow-primary">
              <span className="text-secondary">APR</span>
              <p className="text-xl md:text-2xl font-bold">100%</p>
            </div>
          </div>
        </div>

        <div>
          <p>
            PrimeUSD delivers stable yield on USD-based assets by tapping into
            top-tier money markets. It balances safety and performance with
            automated execution, ensuring consistent returns on stablecoins for
            risk-averse investors.
          </p>
        </div>
        <div className="flex flex-row gap-4 justify-between mt-6">
          <div className="tooltip">
            <div className="tooltip-content">
              <p className="text-orange-400 text-2xl">oh! wow wow wow</p>
            </div>
            <p className="border-animate bg-base-100 p-2 cursor-pointer">
              Prime Point Boost
            </p>
          </div>
          <Deposit poolId={props.pool.poolId} />
        </div>
      </div>
    </div>
  )
}

export default PoolCard
