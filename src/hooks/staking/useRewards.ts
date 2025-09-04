import { useMultiEarnedRewards, useTokens } from '@beraji/web3-sdk'
import { useMemo } from 'react'
import { formatUnits, Hex } from 'viem'

export const useEarnedRewardsByPool = (poolId: number) => {
  const { data, isLoading } = useMultiEarnedRewards()

  const result = useMemo(() => {
    const map = new Map<
      string,
      { rewardId: number; rToken: Hex; earnedAmount: bigint }
    >()

    if (!data || isLoading) return []
    const rwByPool = data.filter((d) => Number(d.poolId) === poolId)

    rwByPool.forEach((item) => {
      const key = `${item.rewardId}-${item.rToken.toLowerCase()}`
      if (map.has(key)) {
        const existing = map.get(key)!
        existing.earnedAmount += item.earnedAmount
      } else {
        map.set(key, {
          rewardId: Number(item.rewardId),
          rToken: item.rToken,
          earnedAmount: item.earnedAmount,
        })
      }
    })

    return Array.from(map.values())
  }, [data, isLoading, poolId])

  return result
}

export const useTotalEarnedRewards = (poolId: number) => {
  const earnedRewards = useEarnedRewardsByPool(poolId)
  const { data: tokens, isLoading } = useTokens()

  return useMemo(() => {
    if (!earnedRewards || !tokens || isLoading) return 0

    const tokensByAddress = new Map(
      tokens.map((token) => [token.address.toLowerCase(), token]),
    )

    return earnedRewards.reduce((acc, item) => {
      const token = tokensByAddress.get(item.rToken.toLowerCase())
      if (!token) return acc
      return (
        acc +
        Number(formatUnits(item.earnedAmount, token.decimals)) * token.price
      )
    }, 0)
  }, [earnedRewards, isLoading, tokens])
}
