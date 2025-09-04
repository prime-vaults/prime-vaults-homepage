import {
  TokenAmount,
  TokenAvatar,
  TokenSymbol,
  useRewards,
} from '@beraji/web3-sdk'

import { useEarnedRewardsByPool } from '@/hooks/staking/useRewards'

export default function PoolRewards({ poolId }: { poolId: number }) {
  const { data: rewards } = useRewards(poolId)
  const earnedRewards = useEarnedRewardsByPool(poolId)

  if (!rewards || !rewards.length) return null
  return (
    <div className="h-full relative flex flex-col border border-black bg-[#E3FFEC] rounded-lg overflow-hidden font-bold text-black">
      <div className="absolute w-6 h-6 top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#21FF04]" />
      {rewards.map((item, i) => {
        const earned = earnedRewards.find(
          (reward) => reward.rewardId === item.rewardId,
        )?.earnedAmount
        return (
          <div className="flexbox-col p-2 pb-0 gap-2" key={i}>
            <div className="flexbox-col gap-1">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-1">
                  <TokenAvatar token={item.token} className="w-5" />
                  <TokenSymbol token={item.token} />
                </div>
                <p className="text-green-weight">
                  <TokenAmount token={item.token} rawAmount={earned ?? 0n} />
                </p>
              </div>
              <div className="flex flex-row justify-between text-xs text-[#676767]">
                <p>Reward</p>
                <TokenAmount token={item.token} rawAmount={earned ?? 0n} usd />
              </div>
            </div>
            <div className="h-[0.5px] w-full bg-[#D3DAED]" />
          </div>
        )
      })}
    </div>
  )
}
