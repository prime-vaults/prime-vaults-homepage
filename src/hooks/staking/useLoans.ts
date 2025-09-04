import { useMultiCheques, useMultiLoans } from '@beraji/web3-sdk'
import { useMemo } from 'react'

export const useLoansByPool = (poolId: number) => {
  const { data: loans } = useMultiLoans()
  const { data: cheques } = useMultiCheques()

  return useMemo(() => {
    if (!loans || !cheques) return []
    return loans.filter((loan) => {
      const cheque = cheques.find((cheque) => cheque.id === loan.chequeId)
      return (
        cheque &&
        Number(cheque.poolId) === poolId &&
        Number(loan.debtASugarAmount) > 0
      )
    })
  }, [cheques, loans, poolId])
}
