import { useLocks, usePools, useRewards } from '@beraji/web3-sdk'
import { useMemo } from 'react'
import { Address, isAddressEqual } from 'viem'

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

export const usePoolByTokenAddress = (address?: Address) => {
  const { data: pools } = usePools()

  return useMemo(() => {
    if (!pools || !address) return
    return pools?.find((p) => isAddressEqual(p.stakingToken, address))
  }, [address, pools])
}
