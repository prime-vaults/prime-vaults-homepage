import {
  useCheques,
  useMultiCheques,
  useMultiLoans,
  usePools,
  useReceipts,
} from '@beraji/web3-sdk'
import BN from 'bn.js'
import { useMemo } from 'react'

import { useLoansByPool } from './useLoans'

export const useTotalCollateralByPool = (poolId: number) => {
  const loans = useLoansByPool(poolId)

  return useMemo(() => {
    if (!loans) return 0n
    return loans.reduce((a, b) => a + b.collateralStakedAmount, 0n)
  }, [loans])
}

export const useChequeByLock = (poolId: number, lockId?: number) => {
  const { data: cheques } = useCheques(poolId)

  return useMemo(() => {
    if (!cheques || !lockId) return
    return cheques.find((cheque) => Number(cheque.lockId) === lockId)
  }, [cheques, lockId])
}

export const useStakedPools = () => {
  const { data: pools } = usePools()
  const { data: cheques } = useMultiCheques()
  const { data: loans } = useMultiLoans()

  return useMemo(() => {
    if (!pools || !cheques) return []

    const loansByChequeId = new Map()
    loans?.forEach((loan) => {
      loansByChequeId.set(loan.chequeId, loan)
    })

    const stakedPoolIds = new Set()

    cheques.forEach((cheque) => {
      const loan = loansByChequeId.get(cheque.id)

      const totalStaked =
        BigInt(cheque.stakedAmount) +
        (loan ? BigInt(loan.collateralStakedAmount) : 0n)

      if (totalStaked > 0n) {
        stakedPoolIds.add(Number(cheque.poolId))
      }
    })

    return pools.filter((pool) => stakedPoolIds.has(pool.poolId))
  }, [cheques, loans, pools])
}

export const useTotalUnStaked = (poolId: number) => {
  const { data: receipts } = useReceipts(poolId)

  const unstaked = useMemo(() => {
    if (!receipts) return new BN(0)
    return receipts
      .filter(({ status }) => status !== 1)
      .reduce((a, b) => a.add(new BN(b.amount.toString())), new BN(0))
  }, [receipts])

  return unstaked
}
