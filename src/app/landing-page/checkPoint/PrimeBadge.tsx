import { toast } from 'react-toastify'
import { ArrowUpRight, Copy } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'

import Button from '@/components/UI/Button'
import ShieldIcon from './ShieldIcon'
import Modal from '@/components/UI/Modal'

import { htmlToImageURL } from '@/helpers/screenshot'
import { formatUiNumber, shortenString } from '@/helpers/utils'

import whale from '@/static/images/badge/whale.png'
import active from '@/static/images/badge/active.png'
import og from '@/static/images/badge/og.png'
import newSaver from '@/static/images/badge/new.png'
import x from '@/static/images/logo/x-primary.svg'
import { Badge } from '@/app/api/supabase'

const tweets = [
  "I'm officially a [Prime Whale].\nJust checked my Prime Points and registered for the Closed-Beta. Curious to see what these unlock.",

  "[Prime Whale] unlocked.\nPrime Points checked, Closed-Beta registered. Let's see what's next.",

  "Looks like I'm a [Prime Whale] now.\nChecked my Prime Points and joined the Closed-Beta. Interested to see how this plays out.",

  'Just checked my Prime Points on PrimeVaults.\n[Prime Whale] tier and Closed-Beta registration done. Wonder what comes next.',

  'Prime Points checked. [Prime Whale] confirmed.\nClosed-Beta registered. Curious how these points will be used.',

  "Didn't expect this — [Prime Whale].\nPrime Points checked and Closed-Beta secured. Let's see where this goes.",

  '[Prime Whale] unlocked on PrimeVaults.\nPoints checked, Closed-Beta registered. Waiting to see what these unlock.',

  "Turns out I'm a [Prime Whale].\nChecked my Prime Points and signed up for the Closed-Beta. Curious what's ahead.",

  '[Prime Whale] status confirmed.\nPrime Points checked and Closed-Beta registered. Interested to see what comes next.',

  'Just checked my Prime Points.\n[Prime Whale] tier and Closed-Beta registration done. Wonder how this plays out.',
]

function getRandomTweet(rank: string) {
  const randomIndex = Math.floor(Math.random() * tweets.length)
  const selectedTweet = tweets[randomIndex]

  const resultTweet = selectedTweet.replace(/\[Prime Whale\]/g, `[${rank}]`)

  return resultTweet
}

export function getBadge(badge: number) {
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
  onOpenGame,
}: {
  tvl: number
  point: number
  address: string
  onDone: () => void
  onOpenGame?: () => void
}) {
  const [openDownload, setOpenDownload] = useState(false)
  const ssRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)

  const badge = getBadge(tvl)
  const { badgeImage, badgeText } = useMemo(() => {
    switch (badge) {
      case Badge.PrimeWhale:
        return {
          badgeImage: whale,
          badgeText: 'PRIME WHALE',
        }
      case Badge.PrimeOG:
        return {
          badgeImage: og,
          badgeText: 'PRIME OG',
        }
      case Badge.ActiveWallet:
        return {
          badgeImage: active,
          badgeText: 'ACTIVE WALLET',
        }
      case Badge.NewSaver:
        return {
          badgeImage: newSaver,
          badgeText: 'NEW SAVER',
        }
      default:
        return {
          badgeImage: '',
          badgeText: '',
        }
    }
  }, [badge])

  const handleSaveImage = useCallback(async () => {
    try {
      setLoading(true)
      const url = await htmlToImageURL(ssRef.current)
      if (!url) return
      const link = document.createElement('a')
      link.href = url
      link.download = `prime_rank.png`
      return link.click()
    } catch (er: any) {
      toast.error(er.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const shareOnTwitter = useCallback(() => {
    const tweet = getRandomTweet(badgeText)
    const text = encodeURIComponent(tweet + '\n🔗 https://primevaults.finance/')
    const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`
    window.open(tweetUrl, '_blank')
  }, [badgeText])

  if (openDownload)
    return (
      <Modal open={openDownload} boxClassName="min-w-[360px] md:min-w-2xl!">
        <div className="flex flex-col gap-2.5 md:gap-4 p-3 md:p-6">
          <span className="text-xs text-[#B3BFA6] text-center">
            To share on X, download this image and upload it with your post.
          </span>
          <div
            ref={ssRef}
            className="relative border border-base-100 rounded-lg gap-2.5 md:gap-4 overflow-hidden"
          >
            <div className="flex flex-col">
              <div
                style={{
                  background:
                    'linear-gradient(270deg, rgba(17, 21, 12, 0.00) 38.92%, #4D6138 100%)',
                }}
                className="w-full"
              >
                <div className="w-1/2 flex flex-row items-center gap-1 md:gap-2 px-2 py-3 md:p-5 rounded-t-lg">
                  <span className="text-[#B3BFA6] text-xs flex-1">You are</span>
                  <h5 className="uppercase text-[#39F391]">{badgeText}</h5>
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
                <div className="w-1/2 flex flex-col gap-3 md:gap-4 px-2 py-3 md:p-5 min-h-[160px] md:min-h-[280px]!">
                  <p className="text-[#B3BFA6] text-xs">Your Prime Points </p>
                  <div className="flex flex-1 flex-row items-center justify-center">
                    <span className="text-primary font-bold text-3xl md:text-5xl">
                      {formatUiNumber(point)}{' '}
                      <span className="text-white">P.P</span>
                    </span>
                  </div>
                  <span className="text-[#8E9D7F] text-[10px] md:text-[12px]">
                    You’ll be able to claim your points <br /> when the Closed
                    Beta opens.
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 bottom-4 right-4 z-10">
              <img src={badgeImage} className="w-full h-full" />
            </div>
          </div>
          <div className="mt-2 flex flex-row gap-2 md:gap-4 items-center justify-between">
            <div className="flex-1">
              <Button
                className="btn btn-ghost text-primary"
                onClick={() => setOpenDownload(false)}
              >
                <p>Back</p>
              </Button>
            </div>
            <Button
              className="btn btn-outline border-white md:px-6!"
              loading={loading}
              onClick={handleSaveImage}
            >
              <p>Download image</p>
            </Button>
            <Button
              className="btn btn-primary md:px-6!"
              onClick={shareOnTwitter}
            >
              <p>Tweet now</p> <ArrowUpRight size={24} />
            </Button>
          </div>
        </div>
      </Modal>
    )
  return (
    <div className="flex flex-col gap-2.5 md:gap-4 p-2 md:p-4">
      <div className="flex flex-row justify-between">
        <h5>PRIME RANK</h5>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs">
            {shortenString(address, { maxLength: 4 })}
          </span>
          <Copy size={16} />
          <img src={x} alt="x" className="ml-2 w-4 h-4" />
          <span
            className="text-xs text-primary-content cursor-pointer"
            onClick={() => setOpenDownload(true)}
          >
            Share on X
          </span>
        </div>
      </div>
      <div className="relative border border-base-100 rounded-lg gap-2 md:gap-4 overflow-hidden">
        <div className="flex flex-col">
          <div
            style={{
              background:
                'linear-gradient(270deg, rgba(17, 21, 12, 0.00) 38.92%, #4D6138 100%)',
            }}
            className="w-full"
          >
            <div className="w-1/2 flex flex-row items-center gap-1 md:gap-2 px-2 py-2 md:p-5 rounded-t-lg">
              <span className="text-[#B3BFA6] text-xs flex-1">You are</span>
              <h5 className="uppercase badge-text">{badgeText}</h5>
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
            <div className="w-1/2 flex flex-col gap-2 md:gap-4 p-2 md:p-5 min-h-[160px] md:min-h-[280px]!">
              <p className="text-[#B3BFA6] text-xs ">Your Prime Points </p>
              <div className="flex flex-1 flex-row items-center justify-center">
                <span className="text-primary font-bold text-3xl md:text-5xl">
                  {formatUiNumber(point)}{' '}
                  <span className="text-white">P.P</span>
                </span>
              </div>
              <span className="text-[#8E9D7F] text-[12px]">
                You’ll be able to claim your points <br /> when the Closed Beta
                opens.
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-4 bottom-4 right-4 z-10">
          <img src={badgeImage} className="w-full h-full" />
        </div>
      </div>
      <div className="col-span-full flex flex-row gap-1 md:gap-2 items-center w-full mt-2 md:mt-4">
        {onOpenGame ? (
          <Button
            className="btn btn-ghost text-primary w-1/2"
            onClick={onOpenGame}
          >
            Play Yield Game
          </Button>
        ) : (
          <div className="w-1/2" />
        )}

        <Button className="btn btn-primary md:!px-6 w-1/2" onClick={onDone}>
          Join Closed-Beta
        </Button>
      </div>
    </div>
  )
}
