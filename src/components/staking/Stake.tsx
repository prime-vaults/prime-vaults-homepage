import {
  TokenBalance,
  TokenSymbol,
  useApproveToken,
  useContracts,
  useLock,
  useLocks,
  usePool,
  useRequestStake,
  useStake,
  useToken,
  useTokenBalance,
} from '@beraji/web3-sdk'
import { Fragment, useCallback, useMemo, useState } from 'react'
import Modal from '../UI/Modal'
import Input from '../UI/Input'
import { decimalize, isEqualAddress } from '@/helpers/utils'
import { maxInt256, parseUnits, zeroAddress } from 'viem'
import { BN } from 'bn.js'
import { useAccount, useBalance } from 'wagmi'
import clsx from 'clsx'

function StakeContainer({ poolId }: { poolId: number }) {
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [lockSelected, setLockSelected] = useState<number | undefined>()
  const { address } = useAccount()
  const { data: balanceNative, refetch: refetchNative } = useBalance({
    address,
  })

  const {
    data: { stakingToken, chainId },
  } = usePool(poolId)
  const { data: tokenStake } = useTokenBalance({ token: stakingToken })

  const { data: locks } = useLocks(poolId)
  const { data: lock } = useLock(lockSelected)
  const { data: tokenAnalyticFee } = useToken(lock?.feeToken || zeroAddress)
  const { data: tokenAnalytic } = useToken(stakingToken)
  const stake = useStake(poolId)
  const { data: tokenFee, refetch: refetchTokenFee } = useTokenBalance({
    token: lock?.feeToken || zeroAddress,
  })
  const {
    contracts: { stakingKo: stakingKoContract },
  } = useContracts()

  const rawAmount = parseUnits(amount, tokenStake?.decimals ?? 0)

  const feeAmount = useMemo(() => {
    if (
      !Number(amount) ||
      !tokenAnalytic ||
      !tokenAnalyticFee ||
      !lock ||
      !lock.feeRate
    )
      return 0

    return (
      (Number(amount) * tokenAnalytic.price * lock.feeRate) /
      tokenAnalyticFee.price
    ).toFixed(8)
  }, [amount, lock, tokenAnalytic, tokenAnalyticFee])

  const approveTokenStake = useApproveToken({
    token: stakingToken,
    spender: stakingKoContract,
    amount: rawAmount,
  })

  const approvedTokenFee = useApproveToken({
    spender: stakingKoContract,
    token: lock?.feeToken || zeroAddress,
  })

  const isApprovedFeeToken = useMemo(() => {
    if (
      !Number(amount) ||
      !tokenAnalyticFee ||
      (lock?.feeToken && isEqualAddress(lock.feeToken, zeroAddress))
    )
      return true

    const rawAmount = decimalize(
      feeAmount.toString(),
      tokenAnalyticFee.decimals,
    )
    return new BN(approvedTokenFee.allowance).gte(new BN(rawAmount))
  }, [amount, approvedTokenFee, feeAmount, lock?.feeToken, tokenAnalyticFee])

  const { data: requestStake } = useRequestStake({
    account: address!,
    chainId: chainId,
    lockId: lock?.lockId,
    rawAmount: rawAmount.toString(),
  })

  const onStake = useCallback(async () => {
    try {
      setLoading(true)
      if (!approveTokenStake.isApproved)
        return await approveTokenStake.approve(maxInt256)
      if (
        lock?.feeToken &&
        !isEqualAddress(lock.feeToken, zeroAddress) &&
        !isApprovedFeeToken
      )
        return await approvedTokenFee.approve(maxInt256)
      if (!lock) throw new Error('No lock selected')
      if (!requestStake) throw new Error('Invalid request stake')
      await stake.mutateAsync(requestStake!)

      if (lock?.feeToken) {
        if (!isEqualAddress(lock.feeToken, zeroAddress)) await refetchTokenFee()
        else refetchNative()
      }

      return setAmount('0')
    } catch (error: any) {
      window.jiko.message({ msg: error.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [
    approveTokenStake,
    approvedTokenFee,
    isApprovedFeeToken,
    lock,
    refetchNative,
    refetchTokenFee,
    requestStake,
    stake,
  ])

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-2">
        {locks.map((lock) => (
          <div
            className={clsx('p-4 rounded border border-blue cursor-pointer', {
              '!border-success bg-cyan text-black':
                !!lockSelected && lockSelected === lock.lockId,
            })}
            onClick={() => setLockSelected(lock.lockId)}
            key={lock.lockId}
          >
            <p>{lock.duration}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <p>
          Available:{' '}
          <b>
            <TokenBalance token={stakingToken} />{' '}
            <TokenSymbol token={stakingToken} />
          </b>
        </p>
      </div>
      <Input
        placeholder="enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onStake}>
        {loading && <span className="loading loading-spinner" />}
        {isApprovedFeeToken ? 'stake' : 'approve'}
      </button>
    </div>
  )
}

export default function StakeToken({ poolId }: { poolId: number }) {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <button className="btb btn-primary" onClick={() => setOpen(true)}>
        Stake
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <StakeContainer poolId={poolId} />
      </Modal>
    </Fragment>
  )
}
