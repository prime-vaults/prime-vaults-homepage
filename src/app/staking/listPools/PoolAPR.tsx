import { Fragment } from 'react'
import {
  useRewards,
  formatNumber,
  TokenAvatar,
  TokenSymbol,
} from '@beraji/web3-sdk'

import Tooltip from '@/components/UI/Tooltip'

import { numericFormat } from '@/helpers/utils'
import { usePoolStat } from '@/hooks/staking/usePools'

export default function PoolAPR({
  poolId,
  children,
}: {
  poolId: number
  children: React.ReactNode
}) {
  const { data: rewards } = useRewards(poolId)
  const liveRewards = rewards?.filter((r) => r.finishTime > Date.now())
  const { apr } = usePoolStat(poolId)

  return (
    <Tooltip target={children}>
      <div className="pool-apr-tooltip">
        <div className="tooltip-suffix" />
        {!!liveRewards && !!liveRewards.length && (
          <div className="tooltip-item gap-1">
            <p>Stake APR</p>
            <div className="flex flex-col gap-2">
              {liveRewards.map((reward, i) => (
                <div key={i} className="flex flex-row justify-between">
                  <div className="flex flex-row gap-1 font-bold">
                    <TokenAvatar token={reward.token} className="w-5" />
                    <p>
                      <TokenSymbol token={reward.token} />
                    </p>
                  </div>
                  <p className="font-bold text-[#DA2ACB]">
                    {numericFormat(
                      !!reward?.cApr && reward.cApr > 0
                        ? reward.cApr * 100
                        : reward.apr * 100,
                      {
                        mantissa: 2,
                      },
                    )}
                    %
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!rewards && !!rewards.length && (
          <Fragment>
            <div className="divider" />
            <div className="tooltip-item">
              <div className="flex flex-row justify-between">
                <p>Total APR</p>
                <p className="font-bold text-[#09FF52]">
                  {formatNumber(apr * 100)}%
                </p>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Tooltip>
  )
}
