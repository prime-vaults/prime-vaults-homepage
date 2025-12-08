import configs from '@/configs'
import axios from 'axios'
import { DebankChain, TokenInfo, UserAssetOverview } from './types'
const { primeVaultRpc } = configs.cluster

const primeVaultApi = axios.create({
  baseURL: primeVaultRpc,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTokens = async ({
  wallet_address,
  chain_ids,
}: {
  wallet_address: string
  chain_ids?: DebankChain
}) => {
  const { data } = await primeVaultApi.get<TokenInfo>(
    '/public/api/v1/wallet/tokens',
    {
      params: {
        wallet_address,
        chain_ids,
      },
    },
  )
  return data
}

export const getBalances = async ({
  wallet_address,
}: {
  wallet_address: string
}) => {
  const { data } = await primeVaultApi.get<UserAssetOverview>(
    '/public/api/v1/wallet/total-balances',
    {
      params: {
        wallet_address,
      },
    },
  )
  return data
}
