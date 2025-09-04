import { useMemo } from 'react'
import {
  TokenAmount,
  TokenAvatar,
  TokenBalance,
  TokenSymbol,
  usePool,
} from '@beraji/web3-sdk'
import { Link } from 'react-router-dom'

import PoolCap from './PoolCap'
import PoolAPR from './PoolAPR'
import PoolName from './PoolName'
import PoolRewards from './PoolRewards'
import Harvest from '@/components/staking/Harvest'
import StakeToken from '@/components/staking/Stake'

import { usePoolStat } from '@/hooks/staking/usePools'
import { formatUiNumber } from '@/helpers/utils'
import { useTotalStakedByPoolId } from '@/hooks/staking/useStaking'
import { useEarnedRewardsByPool } from '@/hooks/staking/useRewards'

export default function PoolCard({ poolId }: { poolId: number }) {
  const { data: pool } = usePool(poolId)
  const { stakingToken } = pool
  const { apr } = usePoolStat(poolId)
  const staked = useTotalStakedByPoolId(poolId)
  const rewardsEarned = useEarnedRewardsByPool(poolId)

  const isCanHarvest = useMemo(() => {
    let existRewards = false

    rewardsEarned.forEach((item) => {
      if (Number(item.earnedAmount) > 0) {
        existRewards = true
      }
    })
    return existRewards
  }, [rewardsEarned])

  return (
    <div className="pool-card">
      <div className="pool-card-avatar">
        <TokenAvatar token={stakingToken} className="w-16 h-16" />
        <PoolCap poolId={poolId} />
      </div>
      <PoolAPR poolId={poolId}>
        <p className="leading-7 border-b border-dotted text-2xl font-bold text-[#0F9D4F] !text-nowrap">
          {formatUiNumber(apr * 100)}% APR
        </p>
      </PoolAPR>
      <PoolName className="font-bold" poolId={poolId} />
      <div className="flex flex-col gap-2 p-4 pt-0 h-full">
        <div className="pool-card-content">
          <div>
            <p>Current Staked</p>
            <p className="font-bold">
              <TokenAmount
                token={stakingToken}
                rawAmount={BigInt(staked.toString())}
              />{' '}
              <TokenSymbol token={stakingToken} />
            </p>
          </div>
          <div>
            <p>Value Staked</p>
            <p className="font-bold !text-[#2171E2]">
              $
              <TokenAmount
                token={stakingToken}
                rawAmount={BigInt(staked.toString())}
                usd
              />
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] border border-t-[#D3DAED]" />
        <div className="pool-card-reward">
          <div className="flex flex-row items-center w-full min-h-10">
            <p className="flex-1 text-black font-bold">Unclaimed Assets</p>
            {isCanHarvest && (
              <Harvest size="sm" className="!px-3" poolId={poolId} />
            )}
          </div>
          <PoolRewards poolId={poolId} />
        </div>
        <div className="flex-1" />
        <div className="pool-card-action">
          <div className="w-full flex flex-row gap-2">
            <div className="tutorial-staking-btn flex-1">
              <StakeToken poolId={poolId} />
            </div>
            {!staked.isZero() && (
              <div className="flex-1">
                <Link className="text-anton w-full" to="">
                  unstake
                </Link>
              </div>
            )}
          </div>
          <div className="w-full flexbox-col gap-2 items-center">
            <div className="flex flex-row gap-1 text-black text-base">
              <p>Wallet balance:</p>
              <TokenBalance token={stakingToken} />{' '}
              <TokenSymbol token={stakingToken} />
              <TokenAvatar token={stakingToken} className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
