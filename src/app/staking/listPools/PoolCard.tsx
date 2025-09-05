import {
  TokenAmount,
  TokenAvatar,
  TokenBalance,
  TokenSymbol,
  usePool,
} from '@beraji/web3-sdk'

import { useTotalStakedByPoolId } from '@/hooks/staking/useStaking'

export default function PoolCard({ poolId }: { poolId: number }) {
  const { data: pool } = usePool(poolId)
  const { stakingToken } = pool
  const staked = useTotalStakedByPoolId(poolId)

  return (
    <div className="pool-card">
      <div className="pool-card-avatar">
        <TokenAvatar token={stakingToken} className="w-16 h-16" />
      </div>

      <div className="flex flex-col gap-2 p-4 pt-0 h-full">
        <div className="pool-card-content">
          <div className="flex flex-row justify-between">
            <p>Current Staked</p>
            <p className="font-bold">
              <TokenAmount
                token={stakingToken}
                rawAmount={BigInt(staked.toString())}
              />{' '}
              <TokenSymbol token={stakingToken} />
            </p>
          </div>
          <div className="flex flex-row justify-between">
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
        <div className="pool-card-action">
          <div className="w-full flex flex-row gap-2"></div>
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
