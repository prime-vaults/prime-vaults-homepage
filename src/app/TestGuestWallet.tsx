import { useState } from 'react'
import { BN } from 'bn.js'
import { useBalance } from 'wagmi'

import Input from '@/components/UI/Input'

import {
  compositeFloat,
  normalizeError,
  openLink,
  useDebounce,
} from '@/helpers/utils'
import { useConnectedGuestWallet } from '@/hooks/useGuestWallet'
import configs from '@/configs'
import { Hex, isAddress } from 'viem'

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
      window.jiko.message({
        msg: `Transfer successful! Click to view details`,
        onClick: () =>
          openLink(`${configs.network.blockExplorerUrls}/${path}/${hash}`),
      })
      setTo('')
      setAmount('')
    } catch (error: any) {
      window.jiko.message({
        msg: `Transfer failed: ${normalizeError(error)}`,
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
    <div className="max-w-72 flex flex-col gap-2 p-4 rounded-2xl bg-cyan-100">
      <div className="flex flex-row gap-2">
        <p>Balance:</p>
        <div className="flex flex-row gap-2">
          {loadingBalance && <span className="loading loading-spinner" />}
          {!!balance && (
            <span>
              {compositeFloat(new BN(balance.value), balance.decimals)}{' '}
              <b>{balance.symbol}</b>
            </span>
          )}
          {!loadingBalance && !balance && <span>--</span>}
        </div>
      </div>
      <Input
        className="w-full"
        placeholder="enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {!!amount && !!cost && (
        <span className="text-xs text-secondary">Est fee: {cost} BERA</span>
      )}
      <Input
        className="w-full"
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
  )
}
