import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { formatUnits, Hex, parseEther } from 'viem'
import { publicClient } from '@/wallets'

export const useConnectedGuestWallet = () => {
  const { address, isConnected, connector } = useAccount()
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    const getProvider = async () => {
      if (isConnected && connector && connector.id === 'jiko-guest') {
        try {
          const connectorProvider = await connector.getProvider()
          setProvider(connectorProvider)
        } catch (error) {
          console.error('Failed to get provider:', error)
        }
      }
    }
    getProvider()
  }, [isConnected, connector])

  const getAccounts = async () => {
    if (!provider) {
      throw new Error('Guest wallet not connected')
    }
    try {
      const accounts = await provider.request({
        method: 'eth_accounts',
      })
      return accounts
    } catch (error) {
      console.error('Failed to get accounts:', error)
      throw error
    }
  }

  const getChainId = async () => {
    if (!provider) {
      throw new Error('Guest wallet not connected')
    }

    try {
      const chainId = await provider.request({
        method: 'eth_chainId',
      })
      return chainId
    } catch (error) {
      console.error('Failed to get chain ID:', error)
      throw error
    }
  }

  const signMessage = async (message: string) => {
    try {
      if (!provider) throw new Error('Guest wallet not connected')
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message],
      })
      return signature
    } catch (error) {
      console.error('Failed to sign message:', error)
      throw error
    }
  }

  const sendTransaction = async (transaction: any) => {
    try {
      if (!provider) throw new Error('Guest wallet not connected')
      const hash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })
      return hash
    } catch (error) {
      console.error('Failed to send transaction:', error)
      throw error
    }
  }

  const estimateTransferCost = async (amount: string) => {
    if (!provider) {
      throw new Error('Guest wallet not connected')
    }
    try {
      const gasPrice = await publicClient.getGasPrice()
      const gasLimit = 21000n
      const gasCost = gasPrice * gasLimit
      const totalCost = parseEther(amount) + gasCost

      return {
        gasPrice: formatUnits(gasPrice, 9) + ' gwei',
        gasLimit: gasLimit.toString(),
        gasCost: formatUnits(gasCost, 18),
        totalCost: formatUnits(totalCost, 18),
      }
    } catch (error) {
      console.error('Failed to estimate cost:', error)
      throw error
    }
  }

  const transfer = async ({ to, amount }: { to: Hex; amount: string }) => {
    try {
      const accounts = await provider.request({ method: 'eth_accounts' })
      if (!accounts || accounts.length === 0)
        throw new Error('No accounts found')

      const fromAddress = accounts[0]
      const amountWei = parseEther(amount)

      const gasPrice = await publicClient.getGasPrice()
      const block = await publicClient.getBlock({ blockTag: 'latest' })
      const nonce = await publicClient.getTransactionCount({
        address: fromAddress,
        blockTag: 'pending',
      })
      const { maxFeePerGas, maxPriorityFeePerGas } =
        await publicClient.estimateFeesPerGas()
      const gas = await publicClient.estimateGas({
        account: fromAddress,
        to,
        value: amountWei,
      })
      const params = {
        from: fromAddress,
        to,
        value: `0x${amountWei.toString(16)}`,
        nonce,
        gas,
        gasPrice: `0x${gasPrice.toString(16)}`,
      }
      let transaction: any

      if (block.baseFeePerGas) {
        transaction = {
          ...params,
          maxFeePerGas: `0x${maxFeePerGas.toString(16)}`,
          maxPriorityFeePerGas: `0x${maxPriorityFeePerGas.toString(16)}`,
        }
      } else {
        transaction = { ...params }
      }

      const hash = await provider.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })
      await publicClient.waitForTransactionReceipt({ hash })
      return hash
    } catch (error) {
      console.error('Transfer failed:', error)
      throw error
    }
  }

  return {
    provider,
    isGuestWalletConnected: isConnected && connector?.id === 'jiko-guest',
    address,
    getAccounts,
    getChainId,
    signMessage,
    sendTransaction,
    estimateTransferCost,
    transfer,
  }
}
