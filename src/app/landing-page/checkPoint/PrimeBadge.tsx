import { useMemo } from 'react'
import { Copy } from 'lucide-react'

import Button from '@/components/UI/Button'
import ShieldIcon from './ShieldIcon'

import { formatUiNumber, shortenString } from '@/helpers/utils'

import whale from '@/static/images/badge/whale.png'
import active from '@/static/images/badge/active.png'
import og from '@/static/images/badge/og.png'
import newSaver from '@/static/images/badge/new.png'
import x from '@/static/images/logo/x-primary.svg'

enum Badge {
  PrimeWhale,
  PrimeOG,
  ActiveWallet,
  NewSaver,
}

function getBadge(badge: number) {
  if (badge > 500_000) return Badge.PrimeWhale
  if (badge > 100_000) return Badge.PrimeOG
  if (badge > 50_000) return Badge.ActiveWallet
  return Badge.NewSaver
}

export default function PrimeBadge({
  tvl,
  point,
  address,
  onDone,
}: {
  tvl: number
  point: number
  address: string
  onDone: () => void
}) {
  const badge = getBadge(tvl)
  const { badgeImage, badgeText } = useMemo(() => {
    switch (badge) {
      case Badge.PrimeWhale:
        return {
          badgeImage: whale,
          badgeText: 'Prime Whale',
        }
      case Badge.PrimeOG:
        return {
          badgeImage: og,
          badgeText: 'Prime OG',
        }
      case Badge.ActiveWallet:
        return {
          badgeImage: active,
          badgeText: 'Active Wallet',
        }
      case Badge.NewSaver:
        return {
          badgeImage: newSaver,
          badgeText: 'New Saver',
        }
      default:
        return {
          badgeImage: '',
          badgeText: '',
        }
    }
  }, [badge])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p>PRIME TIER</p>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs">{shortenString(address)}</span>
          <Copy size={16} />
          <img src={x} alt="x" className="ml-2 w-4 h-4" />
          <span className="text-xs text-primary-content">Share on X</span>
        </div>
      </div>
      <div className="relative border border-base-100 rounded-lg gap-4 overflow-hidden">
        <div className="flex flex-col">
          <div
            style={{
              background:
                'linear-gradient(270deg, rgba(17, 21, 12, 0.00) 38.92%, #4D6138 100%)',
            }}
            className="w-full"
          >
            <div className="w-1/2 flex flex-row items-center gap-2 p-5 rounded-t-lg">
              <p className="text-[#B3BFA6] text-xs flex-1">Your are</p>
              <p className="uppercase badge-text text-lg!">{badgeText}</p>
              <ShieldIcon />
            </div>
          </div>
          <div
            className="w-full"
            style={{
              background:
                'radial-gradient(77.73% 112.66% at 0% 71.02%, rgba(173, 205, 139, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(264deg, rgba(29, 36, 35, 0.20) 54.62%, rgba(23, 33, 16, 0.20) 100.72%)',
            }}
          >
            <div className="w-1/2 flex flex-col gap-4 p-5 min-h-[280px]!">
              <p className="text-[#B3BFA6] text-xs ">Your Prime Points </p>
              <div className="flex flex-1 flex-row items-center justify-center">
                <span className="text-primary font-bold text-5xl">
                  {formatUiNumber(point)}{' '}
                  <span className="text-white">P.P</span>
                </span>
              </div>
              <p className="text-[#B3BFA6] text-[10px]!">
                These points can be used to join reward events in the
                Closed-Beta.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 bottom-4 right-4 z-10">
          <img src={badgeImage} className="w-full h-full" />
        </div>
      </div>
      <div className="col-span-full flex flex-row gap-2 items-center w-full mt-4">
        <Button className="btn btn-ghost text-primary">Cancel</Button>
        <div className="flex-1" />
        <Button className="btn btn-ghost text-primary">Play Yield Game</Button>

        <Button className="btn btn-primary !px-6" onClick={onDone}>
          Join Closed-Beta
        </Button>
      </div>
    </div>
  )
}
