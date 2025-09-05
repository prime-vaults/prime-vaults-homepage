import { createConnector, injected } from 'wagmi'
import type { TransactionRequest, TransactionSerializable } from 'viem'
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { Wallet } from '@rainbow-me/rainbowkit'

const STORAGE_KEY = 'jiko-guest-wallet'
let privKey = localStorage.getItem(STORAGE_KEY)

if (!privKey) {
  privKey = generatePrivateKey()
  localStorage.setItem(STORAGE_KEY, privKey)
}

const account = privateKeyToAccount(privKey as any)

export const jikoGuestWallet = (): Wallet => {
  async function ethAccounts() {
    return [account.address]
  }

  async function ethRequestAccounts() {
    return [account.address]
  }

  async function ethSignMessage(message: string) {
    return account.signMessage({ message })
  }

  async function ethSendTransaction(payload: TransactionRequest) {
    const chainIdHex = await getChain()
    const chainId = Number(chainIdHex)

    const tx: TransactionSerializable = {
      to: payload.to ?? null,
      data: payload.data,
      gas: payload.gas,
      nonce: payload.nonce,
      value: payload.value,
      type: payload.type as any,
      chainId,
      maxFeePerGas: payload.maxFeePerGas,
      maxPriorityFeePerGas: payload.maxPriorityFeePerGas,
      // gasPrice: payload.gasPrice,
    }

    return account.signTransaction(tx)
  }

  async function getChain() {
    return '0x1' // default Ethereum mainnet
  }

  async function walletRevokePermissions() {
    localStorage.removeItem(STORAGE_KEY)
    return true
  }

  const provider = {
    async request({ method, params }: { method: string; params?: any[] }) {
      switch (method) {
        case 'eth_accounts':
          return ethAccounts()
        case 'eth_chainId':
          return getChain()
        case 'eth_requestAccounts':
          return ethRequestAccounts()
        case 'eth_sendTransaction':
          return ethSendTransaction(params?.[0])
        case 'personal_sign':
          return ethSignMessage(params?.[0])
        case 'wallet_revokePermissions':
          return walletRevokePermissions()
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    },
    on(event: string, listener: (...args: any[]) => void) {
      console.log('on', event, listener)
    },
    removeListener(event: string, listener: (...args: any[]) => void) {
      console.log('removeListener', event, listener)
    },
  }

  return {
    id: 'jiko',
    name: 'Guest Wallet',
    iconUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Fake',
    iconBackground: '#000',
    installed: true,
    downloadUrls: {},
    extension: {},
    createConnector: () =>
      createConnector((config) => ({
        ...injected()(config),
        async getProvider() {
          return provider
        },
      })),
  }
}
