import configs from '@/configs'
import { jikoGuestWallet } from '@/wallets'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  berasigWallet,
  desigWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { http } from 'viem'

// export const projectId = 'd8dc4b0ca61852c2b499bb73d0c489d2'
export const projectId = '54538b1e6d3f2f6a91084ed8f25b7830'
const { chain } = configs.chain

export const wagmiConfig = getDefaultConfig({
  appName: 'JIKO App',
  projectId,
  chains: [chain],
  wallets: [
    {
      groupName: 'guest',
      wallets: [jikoGuestWallet],
    },

    {
      groupName: 'Others',
      wallets: [rainbowWallet, walletConnectWallet, metaMaskWallet],
    },
  ],
  transports: {
    [chain.id]: http(),
  },
})
