import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

import Checking from './Checking'
import InputWallet from './InputWallet'
import Modal from '@/components/UI/Modal'
import SubmitWallet from '../SubmitWallet'
import Corner from '@/components/UI/Corner'

import { getBalances } from '@/app/api'
import {
  ChainInfoWithPercentage,
  DebankChain,
  UserAssetOverview,
  UserInfoBalance,
} from '@/app/api/types'

import ASSET from '@/static/images/landing-page/asset.png'

export function calculateChainPercentages(
  userAssetOverview: UserAssetOverview,
): ChainInfoWithPercentage[] {
  const { total_usd_value, chain_list } = userAssetOverview

  const validChains = Object.values(DebankChain)

  const knownChains: ChainInfoWithPercentage[] = []
  let otherUsdValue = 0

  chain_list.forEach((chain) => {
    if (validChains.includes(chain.id as DebankChain)) {
      knownChains.push({
        ...chain,
        percentage:
          total_usd_value === 0 ? 0 : (chain.usd_value / total_usd_value) * 100,
      })
    } else {
      otherUsdValue += chain.usd_value
    }
  })

  if (otherUsdValue > 0) {
    knownChains.push({
      id: 'other',
      community_id: 0,
      name: 'Others',
      logo_url: null,
      native_token_id: '',
      wrapped_token_id: '',
      usd_value: otherUsdValue,
      percentage:
        total_usd_value === 0 ? 0 : (otherUsdValue / total_usd_value) * 100,
    })
  }

  return knownChains
}

export default function CheckPoint() {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [isReadySubmit, setIsReadySubmit] = useState(false)
  const [chainInfo, setChainInfo] = useState<ChainInfoWithPercentage[]>()
  const [userInfo, setUserInfo] = useState<UserInfoBalance>()

  const onClose = (e: any) => {
    e.stopPropagation()
    setOpen(false)
    setAddress('')
    setIsReadySubmit(false)
    setChainInfo(undefined)
    setUserInfo(undefined)
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
      <div className="col-span-3 flex flex-col">
        <p className="text-2xl md:text-4xl">Check Your Points</p>
        <span className="text-primary cursor-pointer">
          You might be surprised
        </span>
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false)
            setAddress('')
            setIsReadySubmit(false)
            setChainInfo(undefined)
            setUserInfo(undefined)
          }}
        >
          <div className="check-point">
            <div className="flex flex-row items-center justify-between">
              <img className="w-auto h-10 object-contain" src="/logo.svg" />
              <X onClick={onClose} />
            </div>
            {!chainInfo && !userInfo && <InputWallet onCheck={onChecking} />}
            {!isReadySubmit && !!address && !!chainInfo && !!userInfo && (
              <Checking
                chainsInfo={chainInfo}
                userInfo={userInfo}
                address={address}
                onDone={() => setIsReadySubmit(true)}
              />
            )}
            {isReadySubmit && (
              <SubmitWallet
                address={address}
                onClose={() => onClose({ stopPropagation: () => {} })}
                playGame={true}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
