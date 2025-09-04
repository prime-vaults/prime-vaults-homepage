import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { formatUnits, Hex } from 'viem'
import BN from 'bn.js'
import {
  useCheques,
  useLock,
  useMultiCheques,
  useMultiLoans,
  useMultiLocks,
  usePool,
  usePools,
  useTokens,
} from '@beraji/web3-sdk'

import { getStakingStaked } from '@/apis/staking/api'

import { PriceChangePercentNft, TimeFrame } from '@/apis/analytics/type'
import { getNftPriceChange } from '@/apis/analytics/api'
import { useLoansByPool } from './useLoans'
import { CACHE_PREFIX } from '@/constant'

export const useTokenSharedByAddress = ({
  wallet_address,
  token_address,
}: {
  wallet_address?: string
  token_address?: Hex
}) => {
  return useQuery({
    queryKey: [CACHE_PREFIX.TokenShared, wallet_address, token_address],
    queryFn: async () => {
      if (!wallet_address || !token_address) return 0
      const data = await getStakingStaked(wallet_address as Hex)
      return data.find((item) => item.token === token_address)?.lstAmount || 0
    },
    enabled: !!wallet_address,
  })
}

export const useTotalStakedByPoolId = (poolId: number) => {
  const { data: cheques } = useCheques(poolId)
  const loans = useLoansByPool(poolId)

  const stakedLoan = useMemo(() => {
    if (!loans) return new BN(0)
    return loans.reduce(
      (a, b) => a.add(new BN(b.collateralStakedAmount.toString() || 0)),
      new BN(0),
    )
  }, [loans])

  const stakedCheque = useMemo(() => {
    if (!cheques) return new BN(0)
    return cheques.reduce(
      (a, b) => a.add(new BN(b.stakedAmount.toString() || 0)),
      new BN(0),
    )
  }, [cheques])

  return stakedCheque.add(stakedLoan)
}

export function useTotalLPMinted(lockId: number, amount: number) {
  const { data: lock } = useLock(lockId)
  const { data: pool } = usePool(lock.poolId)

  return useMemo(() => {
    if (!lock || !pool) return 0
    const tvl = amount * pool.stPrice
    return tvl * lock.leverage
  }, [amount, lock, pool])
}

export const useTotalTvl = () => {
  const { data: pools } = usePools()
  const { data: locks } = useMultiLocks()

  return useMemo(() => {
    if (!pools || !locks?.data) {
      return { tokenTvl: 0, nftTvl: 0, totalTvl: 0 }
    }

    const poolMap = new Map(pools.map((pool) => [pool.poolId, pool]))

    let tokenTvl = 0
    let nftTvl = 0

    for (const lock of locks.data) {
      const pool = poolMap.get(lock.poolId)

      if (pool)
        if (!!pool.stakingNFT) nftTvl += lock.tvl
        else tokenTvl += lock.tvl
    }

    return {
      tokenTvl,
      nftTvl,
      totalTvl: tokenTvl + nftTvl,
    }
  }, [pools, locks])
}

export const useNftPriceChange = (
  nftId: string,
  priceChangeTime: TimeFrame,
) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [CACHE_PREFIX.NFTs, 'price-change', nftId, priceChangeTime],
    queryFn: async () => getNftPriceChange(nftId, priceChangeTime),
    enabled: !!nftId,
    retry: false,
  })

  return { data: data || ({} as PriceChangePercentNft), isLoading, refetch }
}

export const useTotalStaked = () => {
  const { data: cheques } = useMultiCheques()
  const { data: loans } = useMultiLoans()
  const { data: tokens } = useTokens()

  return useMemo(() => {
    if (!cheques || !tokens) {
      return 0
    }

    const tokenMap = new Map(
      tokens.map((token) => [token.address.toLowerCase(), token]),
    )
    const chequeMap = new Map(cheques.map((cheque) => [cheque.id, cheque]))

    let totalInCheques = 0
    let totalInLoans = 0

    for (const cheque of cheques) {
      const token = tokenMap.get(cheque.token.toLowerCase())
      if (token) {
        const stakedValue =
          Number(formatUnits(cheque.stakedAmount, token.decimals)) * token.price
        totalInCheques += stakedValue
      }
    }

    if (loans) {
      for (const loan of loans) {
        const cheque = chequeMap.get(loan.chequeId)
        if (cheque) {
          const token = tokenMap.get(cheque.token.toLowerCase())
          if (token) {
            const collateralValue =
              Number(formatUnits(loan.collateralStakedAmount, token.decimals)) *
              token.price
            totalInLoans += collateralValue
          }
        }
      }
    }

    return totalInCheques + totalInLoans
  }, [cheques, loans, tokens])
}
