import { ArrowRight, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

import Checking from './Checking'
import { GameModal } from '../PlayGame'
import InputWallet from './InputWallet'
import Modal from '@/components/UI/Modal'
import SubmitWallet from '../SubmitWallet'
import Corner from '@/components/UI/Corner'

import { getBalances } from '@/app/api'
import {
  DebankChain,
  UserAssetOverview,
  UserInfoBalance,
} from '@/app/api/types'

import ASSET from '@/static/images/landing-page/asset.png'
import ETH from '@/static/images/landing-page/logo/eth.png'
import OTHER from '@/static/images/landing-page/logo/other.png'
import ARB from '@/static/images/landing-page/logo/arb.png'
import BERA from '@/static/images/landing-page/logo/bera.png'
import BNB from '@/static/images/landing-page/logo/bnb.png'
import CORE from '@/static/images/landing-page/logo/core.png'

export type ChainInfoCheck = {
  id: string
  name: string
  logo: string
  percent: number
}
const CHAINS_CHECK = [
  {
    id: DebankChain.eth,
    name: 'Ethereum',
    logo: ETH,
    percent: 0,
  },
  {
    id: DebankChain.arb,
    name: 'Arbitrum',
    logo: ARB,
    percent: 0,
  },
  {
    id: DebankChain.bera,
    name: 'Bera',
    logo: BERA,
    percent: 0,
  },
  {
    id: DebankChain.core,
    name: 'Core',
    logo: CORE,
    percent: 0,
  },
  {
    id: DebankChain.bsc,
    name: 'BNB',
    logo: BNB,
    percent: 0,
  },
  {
    id: 'other',
    name: 'Others',
    logo: OTHER,
    percent: 0,
  },
]

export function calculateChainPercentages(
  userAssetOverview: UserAssetOverview,
): typeof CHAINS_CHECK {
  const { total_usd_value, chain_list } = userAssetOverview

  const validChains = Object.values(DebankChain)

  const chainMap = new Map<string, number>()
  let otherUsdValue = 0

  chain_list.forEach((chain) => {
    if (validChains.includes(chain.id as DebankChain)) {
      chainMap.set(chain.id, chain.usd_value)
    } else {
      otherUsdValue += chain.usd_value
    }
  })

  return CHAINS_CHECK.map((chain) => {
    let usdValue = 0

    if (chain.id === 'other') {
      usdValue = otherUsdValue
    } else {
      usdValue = chainMap.get(chain.id) ?? 0
    }

    const percent =
      total_usd_value === 0 ? 0 : (usdValue / total_usd_value) * 100

    return {
      ...chain,
      percent: Math.round(percent * 100) / 100,
    }
  })
}

export default function CheckPoint() {
  const [open, setOpen] = useState(false)
  const [openGame, setOpenGame] = useState(false)

  const onOpenGame = () => {
    setOpen(false)
    return setOpenGame(true)
  }
  return (
    <div
      onClick={() => setOpen(true)}
      className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 cursor-pointer group/point"
    >
      <Corner />
      <div className="absolute top-0 left-0 w-0 group-hover/point:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
      <img
        className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[99]"
        src={ASSET}
      />
      <div className="col-span-3 flex flex-col gap-1 md:gap-3">
        <span className="text-3xl md:text-[40px] font-bold">
          Check Your Points
        </span>
        <div className="flex flex-row gap-2 items-center">
          <h5 className="text-primary cursor-pointer uppercase">
            You might be surprised
          </h5>
          <ArrowRight className="text-primary-content w-5 md:w-8" />
        </div>
      </div>
      {openGame && (
        <GameModal open={openGame} onClose={() => setOpenGame(false)} />
      )}
      {open && (
        <CheckPointModal
          open={open}
          setOpen={setOpen}
          onOpenGame={onOpenGame}
        />
      )}
    </div>
  )
}
export function CheckPointModal({
  open,
  setOpen,
  onOpenGame,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onOpenGame?: () => void
}) {
  const [address, setAddress] = useState('')
  const [isReadySubmit, setIsReadySubmit] = useState(false)
  const [chainInfo, setChainInfo] = useState<ChainInfoCheck[]>()
  const [userInfo, setUserInfo] = useState<UserInfoBalance>()

  const onClose = () => {
    setAddress('')
    setIsReadySubmit(false)
    setChainInfo(undefined)
    setUserInfo(undefined)
    return setOpen(false)
  }

  const onChecking = useCallback(async (address: string) => {
    try {
      if (!address) throw new Error('Please enter your address')
      const balances = await getBalances({ wallet_address: address })
      const chain_list = calculateChainPercentages(balances)
      setChainInfo(chain_list)
      setUserInfo(balances)
      return setAddress(address)
    } catch (error: any) {
      toast.error(error.message)
    }
  }, [])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="check-point">
        <div className="flex flex-row items-center justify-between">
          <img className="w-auto h-10 object-contain" src="/logo.svg" />
          <X
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
        </div>
        {!chainInfo && !userInfo && <InputWallet onCheck={onChecking} />}
        {!isReadySubmit && !!address && !!chainInfo && !!userInfo && (
          <Checking
            chainsInfo={chainInfo}
            userInfo={userInfo}
            address={address}
            onDone={() => setIsReadySubmit(true)}
            onOpenGame={onOpenGame}
          />
        )}
        {isReadySubmit && (
          <SubmitWallet address={address} onClose={onClose} playGame={true} />
        )}
      </div>
    </Modal>
  )
}
