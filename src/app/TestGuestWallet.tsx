import { useState } from 'react'
import { BN } from 'bn.js'
import { useBalance } from 'wagmi'
import { toast } from 'react-toastify'
import { Hex, isAddress } from 'viem'

import {
  compositeFloat,
  normalizeError,
  numericFormat,
  openLink,
  useDebounce,
} from '@/helpers/utils'
import { useConnectedGuestWallet } from '@/hooks/useGuestWallet'
import configs from '@/configs'

export default function TestGuestWallet() {
  const { address, provider, estimateTransferCost, transfer } =
    useConnectedGuestWallet()
  const { data: balance, isLoading: loadingBalance } = useBalance({ address })
  const [amount, setAmount] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [cost, setCost] = useState('')

  const handleTransfer = async () => {
    if (!provider || !to || !amount) return

    setLoading(true)
    try {
      const hash = await transfer({ to: to as Hex, amount })
      const path = isAddress(hash) ? 'address' : 'tx'
      toast('Transfer successful! Click to view details', {
        onClick: () =>
          openLink(`${configs.network.blockExplorerUrls}/${path}/${hash}`),
      })
      setTo('')
      setAmount('')
    } catch (error: any) {
      toast(`Transfer failed: ${normalizeError(error)}`, {
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useDebounce(
    async () => {
      const cost = await estimateTransferCost(amount)
      setCost(cost.totalCost)
    },
    1000,
    [amount],
  )
  return (
    <div className="max-w-72 card bg-primary shadow-sm">
      <div className="card-body">
        <p>Test wallet</p>
        <div className="flex flex-row gap-2">
          <p>Balance:</p>
          <div className="flex flex-row gap-2">
            {loadingBalance && <span className="loading loading-spinner" />}
            {!!balance && (
              <span>
                {numericFormat(
                  Number(
                    compositeFloat(new BN(balance.value), balance.decimals),
                  ),
                  { mantissa: 4 },
                )}{' '}
                <b>{balance.symbol}</b>
              </span>
            )}
            {!loadingBalance && !balance && <span>--</span>}
          </div>
        </div>
        <input
          className="input"
          placeholder="enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {!!amount && !!cost && (
          <span className="text-xs text-secondary">Est fee: {cost} BERA</span>
        )}
        <input
          className="input"
          placeholder="enter address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button
          className="btn btn-primary"
          disabled={!amount || !to || loading}
          onClick={handleTransfer}
        >
          {loading && <span className="loading loading-spinner" />}
          send
        </button>
      </div>
    </div>
  )
}
