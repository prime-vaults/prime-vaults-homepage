import clsx from 'clsx'
import { isAddress } from 'viem'
import { Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  Badge,
  getTopWhitelist,
  getWhitelistByAddressOrBadge,
  Whitelist,
} from '../api/supabase'
import { shortenString, useDebounce } from '@/helpers/utils'

import cup from '@/static/images/landing-page/cup-point.png'
import whale from '@/static/images/badge/icon/whale.png'
import active from '@/static/images/badge/icon/active.png'
import og from '@/static/images/badge/icon/og.png'
import newSaver from '@/static/images/badge/icon/new.png'

const BadgeSelect = [
  {
    name: 'All',
    badge: undefined,
  },
  {
    name: 'Prime OG',
    badge: Badge.PrimeOG,
  },
  {
    name: 'Prime Whale',
    badge: Badge.PrimeWhale,
  },
  {
    name: 'Active Wallet',
    badge: Badge.ActiveWallet,
  },
  {
    name: 'New Saver',
    badge: Badge.NewSaver,
  },
]

export default function Leaderboard() {
  const [input, setInput] = useState('')
  const [address, setAddress] = useState('')
  const [badge, setBadge] = useState<Badge>()

  const getBadgeInfo = (badge: Badge) => {
    switch (badge) {
      case Badge.PrimeOG:
        return {
          badgeImage: og,
          badgeText: 'PRIME OG',
        }
      case Badge.PrimeWhale:
        return {
          badgeImage: whale,
          badgeText: 'PRIME WHALE',
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
    }
  }

  const { data: whitelisted, isLoading } = useQuery({
    queryKey: ['whitelist-closed-beta', badge, address.toLowerCase()],
    queryFn: async () => {
      if (!badge && !address) {
        const { data: whitelisted, error } = await getTopWhitelist()
        if (error) {
          console.log('get whitelist error:', error.message)
          return []
        }
        return whitelisted as Whitelist[]
      }
      const { data: whitelisted, error } = await getWhitelistByAddressOrBadge(
        address,
        badge,
      )
      if (error) {
        console.log('get whitelist error:', error.message)
        return []
      }
      return whitelisted as Whitelist[]
    },
  })

  const onSearchAddress = useCallback(() => {
    if (!input || !isAddress(input)) return
    setAddress(input)
  }, [input])

  useDebounce(
    () => {
      onSearchAddress()
    },
    700,
    [onSearchAddress],
  )

  return (
    <div className="flex flex-col gap-3 md:grid md:grid-cols-11 md:gap-6 w-full">
      <div className="col-span-5 grid grid-cols-11 relative">
        <div className="col-span-5 relative"></div>
        <div className="relative col-span-6 flex flex-col gap-6 md:gap-10 justify-center">
          <img
            src={cup}
            className="w-[200px]! md:w-[400px]! absolute -left-5/6 top-1/2 -translate-y-1/2"
          />

          <span className="text-[28px] md:text-[41px] text-[#69BE6E] font-bold uppercase leading-[30px] md:leading-[40px]">
            closed-beta <br />{' '}
            <span className="text-[42px] md:text-[60px] text-white font-medium leading-[96%]!">
              league
            </span>
          </span>
          <div className="relative">
            <input
              placeholder="Search address"
              className="input bg-transparent w-full outline-none! border! border-secondary! pr-8"
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
            <div className="absolute flex items-center top-0 bottom-0 right-2">
              {input ? (
                <X
                  className="cursor-pointer text-secondary z-10"
                  size={20}
                  onClick={() => {
                    setInput('')
                    setAddress('')
                  }}
                >
                  X
                </X>
              ) : (
                <Search size={20} className="text-secondary" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 flex flex-col items-end gap-3">
        <select
          defaultValue={BadgeSelect[0].badge}
          className="select select-ghost px-3! py-0! outline-none! border border-secondary w-[140px]"
        >
          {BadgeSelect.map((item) => (
            <option
              key={item.name}
              value={item.name}
              onClick={() => setBadge(item.badge)}
            >
              {item.name}
            </option>
          ))}
        </select>
        <div className="overflow-x-auto w-full max-h-[400px] md:max-h-[555px] border border-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="pl-6">
                  <span className="font-normal">#</span>
                </th>
                <th>
                  <span className="font-normal">Address</span>
                </th>
                <th>
                  <span className="font-normal">Badge</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : whitelisted?.length ? (
                whitelisted?.map((item, idx) => {
                  return (
                    <tr
                      key={item.wallet_address}
                      className={clsx(
                        'border-none!',
                        { 'bg-[#346600]': idx === 0 },
                        { 'bg-[#284F00]': idx === 1 },
                        { 'bg-[#1C3700]': idx === 2 },
                      )}
                    >
                      <td className="py-2">
                        <span className="pl-3 py-4!">{idx + 1}</span>
                      </td>
                      <td>
                        <span className="underline underline-offset-2">
                          {shortenString(item.wallet_address, { maxLength: 6 })}
                        </span>
                      </td>
                      <td>
                        {!!item.badge && (
                          <div className="flex flex-row items-center gap-2">
                            <img
                              src={getBadgeInfo(item.badge).badgeImage}
                              className="w-14 h-14"
                            />
                            <h5 className="badge-text">
                              {getBadgeInfo(item.badge).badgeText}
                            </h5>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
