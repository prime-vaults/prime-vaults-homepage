import { Fragment, useMemo } from 'react'
import { TokenAmount, usePool, useTokenWeb3 } from '@beraji/web3-sdk'
import { formatUnits } from 'viem'

import Progress from '@/components/UI/Progress'

import { useTotalStakedByPoolId } from '@/hooks/staking/useStaking'
import { formatUiNumber } from '@/helpers/utils'
import { usePoolStat } from '@/hooks/staking/usePools'

export default function PoolCap({ poolId }: { poolId: number }) {
  const { data: pool } = usePool(poolId)
  const { decimals } = useTokenWeb3(pool.stakingToken)
  const staked = useTotalStakedByPoolId(poolId)
  const { totalValue } = usePoolStat(poolId)

  const progress = useMemo(() => {
    if (!staked || !pool || !decimals) return 0
    return (
      (Number(formatUnits(BigInt(staked.toString()), decimals)) /
        pool?.maxStakedAmount) *
      100
    )
  }, [decimals, pool, staked])

  return (
    <div className="cap">
      <div className="tvl">
        <p>TVL: </p>
        <p>${formatUiNumber(totalValue)}</p>
      </div>
      {!!pool.maxStakedAmount && pool.maxStakedAmount > 0 && (
        <Fragment>
          <div className="staked-cap">
            <p>pool cap:</p>
            <p>
              $
              <TokenAmount
                token={pool.stakingToken}
                rawAmount={BigInt(staked.toString())}
                usd
              />
            </p>
            <p>/</p>
            <p>
              $
              <TokenAmount
                token={pool.stakingToken}
                amount={pool.maxStakedAmount}
                usd
              />
            </p>
          </div>
          <Progress progress={progress} />
        </Fragment>
      )}
    </div>
  )
}
