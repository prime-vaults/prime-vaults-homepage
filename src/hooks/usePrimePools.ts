import { useLocks, usePools, useRewards } from '@beraji/web3-sdk'
import { useMemo } from 'react'

const FILTERED_TOKENS = [
  '0x312203a9df1b39824a826e4ceb266541d6e0feaa',
  '0xde9decc3a84cf9cd197ca51ec998a475cc4e8469',
  '0x7e6e5cb67b93f57789749e8dee3ca94cd30656e9',
  '0x7b1d19216d8d3e95bab262c369dacea954d3a7bc',
]

export const usePrimePools = () => {
  const pools = usePools()
  const primePools = pools.data.filter((pool) =>
    FILTERED_TOKENS.includes(pool.stakingToken),
  )
  return {
    ...pools,
    data: primePools,
  }
}

export const usePoolStat = (poolId: number) => {
  const locks = useLocks(poolId)
  const rewards = useRewards(poolId)
  const liveRewards = rewards.data?.filter((r) => r.finishTime > Date.now())

  return useMemo(() => {
    const stat = {
      totalRewardPerDay: 0,
      totalStaked: 0,
      totalValue: 0,
      totalValueLocked: 0,
      totalStakedLocked: 0,
      apr: 0,
    }
    for (const rw of liveRewards) {
      stat.totalRewardPerDay += rw.usdPerDay
      stat.apr += rw.apr
    }
    for (const lock of locks.data) {
      stat.totalValue += lock.tvl
      stat.totalStaked += lock.totalStaked
      if (lock.duration > 0) {
        stat.totalValueLocked += lock.tvl
        stat.totalStakedLocked += lock.totalStaked
      }
    }
    return stat
  }, [liveRewards, locks.data])
}
