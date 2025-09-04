import {
  useContracts,
  useMultiCheques,
  useMultiLoans,
  usePools,
  useTokenWeb3,
} from '@beraji/web3-sdk'
import BN from 'bn.js'
import { useMemo } from 'react'
import { useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'

import { LP_DECIMALS } from '@/constant/staking'
import { compositeFloat } from '@/helpers/utils'

export const useTotalASugarEarned = () => {
  const { data: loans } = useMultiLoans()
  const { data: cheques } = useMultiCheques()
  const { data: pools } = usePools()

  return useMemo(() => {
    if (!loans || !cheques || !pools) return 0

    const now = Date.now() / 1000
    const ONE_DAY_SECONDS = 24 * 60 * 60

    return loans.reduce((total, loan) => {
      if (loan.collateralLptAmount === 0n || loan.liquidateAt > 0n) {
        return total
      }

      const cheque = cheques.find((c) => c.id === loan.chequeId)
      if (!cheque) return total

      const pool = pools.find((p) => p.poolId === Number(cheque.poolId))
      if (!pool) return total

      const duration = now - Number(loan.lastClaimedAt)
      const asgPerDay =
        Number(formatUnits(loan.collateralLptAmount, LP_DECIMALS)) *
        pool.aSugarDailyRoi

      return total + (asgPerDay * duration) / ONE_DAY_SECONDS
    }, 0)
  }, [loans, cheques, pools])
}
export const useASugarAddress = () => {
  const {
    contracts: { aSugarToken },
  } = useContracts()
  return aSugarToken
}

export const useASugarAnalytic = () => {
  const address = useASugarAddress()

  const { decimals, isLoading } = useTokenWeb3(address)
  const { data, isLoading: loading } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address,
        abi: [
          {
            inputs: [],
            name: 'totalMinted',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'totalMinted',
      },
      {
        address,
        abi: [
          {
            inputs: [],
            name: 'totalBurned',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'totalBurned',
      },
    ],
  })

  const { totalBurned, totalMinted } = useMemo(() => {
    if (!data || !decimals || isLoading || loading)
      return { totalMinted: 0, totalBurned: 0 }
    return {
      totalMinted: Number(compositeFloat(new BN(data[0].toString()), decimals)),
      totalBurned: Number(compositeFloat(new BN(data[1].toString()), decimals)),
    }
  }, [data, decimals, isLoading, loading])

  return {
    totalMinted,
    totalBurned,
  }
}
