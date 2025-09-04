import { ILoan, StakingService } from '@beraji/web3-sdk'
import { Hex } from 'viem'

import configs from '@/configs'

const chainId = configs.network.chainId

export async function getStakingStaked(walletAddress: Hex) {
  const { data } = await StakingService.pubCon.get<
    {
      token: Hex
      stakedAmount: number
      lstAmount: number
    }[]
  >(`/accounts/${walletAddress}/staked`, { params: { chainId } })
  return data
}

export async function getLiquidatedLoan(walletAddress: Hex) {
  const { data } = await StakingService.pubCon.get<{
    data: ILoan[]
    total: number
  }>(`/loans/liquidated`, { params: { account: walletAddress, chainId } })
  return data
}
