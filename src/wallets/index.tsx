import { createConnector, injected } from 'wagmi'
import {
  createPublicClient,
  http,
  type TransactionRequest,
  type TransactionSerializable,
} from 'viem'
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { Wallet } from '@rainbow-me/rainbowkit'
import configs from '@/configs'

export const publicClient = createPublicClient({
  chain: configs.chain.chain,
  transport: http(),
})

export const jikoGuestWallet = (): Wallet => {
  let privKey = import.meta.env.VITE_GUEST_PRIV_KEY
  if (!privKey) privKey = generatePrivateKey()

  const account = privateKeyToAccount(privKey as `0x${string}`)

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
      to: payload.to ?? undefined,
      data: payload.data,
      gas: payload.gas,
      nonce: payload.nonce,
      value: payload.value,
      type: payload.type as any,
      chainId,
      maxFeePerGas: payload.maxFeePerGas,
      maxPriorityFeePerGas: payload.maxPriorityFeePerGas,
    }

    return account.signTransaction(tx)
  }

  async function getChain() {
    return configs.network.chainId
  }

  async function walletRevokePermissions() {
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

  function createInjectedConnector(provider: any): any {
    return (walletDetails: any) => {
      // Create the injected configuration object conditionally based on the provider.
      const injectedConfig = provider
        ? {
            target: () => ({
              id: walletDetails.rkDetails.id,
              name: walletDetails.rkDetails.name,
              provider,
            }),
          }
        : {}

      return createConnector((config) => ({
        // Spread the injectedConfig object, which may be empty or contain the target function
        ...injected(injectedConfig)(config),
        ...walletDetails,
      }))
    }
  }

  return {
    id: 'jiko-guest',
    name: 'Guest Wallet',
    iconUrl: 'https://www.berachain.com/images/icons/berachain.svg',
    iconBackground: '#fff',
    installed: true,
    downloadUrls: {},
    createConnector: createInjectedConnector(provider),
  }
}
