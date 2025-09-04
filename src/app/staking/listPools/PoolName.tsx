import { TokenSymbol, usePool } from '@beraji/web3-sdk'
import clsx from 'clsx'

export default function PoolName({
  poolId,
  className,
}: {
  poolId: number
  className?: string
}) {
  const { data: pool } = usePool(poolId)

  if (!pool) return null
  return (
    <span className={clsx('text-sm md:text-base text-nowrap', className)}>
      Stake <TokenSymbol token={pool.stakingToken} />
    </span>
  )
}
