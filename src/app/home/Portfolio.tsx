import { Fragment, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'

import RandomTextColor from '@/components/RandomTextColor'
import Corner from '@/components/UI/Corner'

import { getVaults } from '@/app/api'
import type { Vault, VaultMetrics } from '@/app/api/analytics.types'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { HOLDING_DATA } from '@/constant/holding'
import { SearchQueryKey } from '@/constant/query'

enum Token {
  USD = 'usd',
  BTC = 'btc',
  ETH = 'eth',
}

const formatApyRate = (value: number) =>
  `${value.toFixed(2).replace(/\.?0+$/, '')}%`

const getApyFromVault = (vault: Vault): number | null => {
  const displayApy = Number(vault.displayApy)
  if (Number.isFinite(displayApy)) return displayApy

  const snapshotApy = Number(vault.snapshot?.apy)
  if (Number.isFinite(snapshotApy)) return snapshotApy

  return null
}

const isVault = (value: unknown): value is Vault => {
  if (!value || typeof value !== 'object') return false
  return 'asset' in value && 'metadata' in value
}

const isVaultMetrics = (value: unknown): value is VaultMetrics => {
  if (!value || typeof value !== 'object') return false
  return Array.isArray((value as VaultMetrics).vaults)
}

const flattenVaults = (data: unknown): Vault[] => {
  if (!data || typeof data !== 'object') return []
  if (!('vaults' in data)) return []

  const list = (data as { vaults?: unknown }).vaults
  if (!Array.isArray(list)) return []

  return list.flatMap((item) => {
    if (isVaultMetrics(item)) return item.vaults.filter(isVault)
    if (isVault(item)) return [item]

    return []
  })
}

const getPrimeApyByToken = (
  data: Awaited<ReturnType<typeof getVaults>> | undefined,
  token: Token,
): number | null => {
  const tokenKey = token.toLowerCase()
  const vaults = flattenVaults(data)

  const candidates = vaults.filter((vault) => {
    const name = vault.metadata?.name?.toLowerCase() ?? ''
    const symbol = vault.asset?.symbol?.toLowerCase() ?? ''
    return name.includes('prime') && (name.includes(tokenKey) || symbol.includes(tokenKey))
  })

  const apys = candidates
    .map(getApyFromVault)
    .filter((apy): apy is number => apy !== null)

  if (!apys.length) return null
  return Math.max(...apys)
}

function CompareAPR() {
  const { update } = useUpdateSearchParams()
  const [tab, setTab] = useState(Token.USD)
  const { data: vaults } = useQuery({
    queryKey: ['prime-vaults-analytics'],
    queryFn: getVaults,
  })

  const onClick = (token: Token) => {
    setTab(token)
    update(SearchQueryKey.Tab, token)
  }

  const primeApy = useMemo(() => getPrimeApyByToken(vaults, tab), [tab, vaults])

  const data = useMemo(() => {
    const rs = HOLDING_DATA[tab]
    if (!rs) return []

    return rs
      .map((item) => {
        const isPrime = item.key === 'prime'
        if (!isPrime || primeApy === null) return item

        return {
          ...item,
          apy: primeApy,
          rate: formatApyRate(primeApy),
        }
      })
      .sort((a, b) => a.apy - b.apy)
  }, [primeApy, tab])

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        className="relative tabs w-full md:w-fit border border-b-0 border-[#3E3E3E]"
      >
        {Object.values(Token).map((token) => {
          const active = token === tab
          return (
            <button
              key={token}
              className={`tab tab-lifted flex-1 md:flex-none px-6 md:px-11 py-2.5 m-1 font-medium transition-colors duration-100 uppercase ${
                active ? '!text-primary bg-[#a3e96b0d]' : ''
              }`}
              onClick={() => onClick(token)}
            >
              {token}
              {active && <Corner />}
            </button>
          )
        })}
      </div>

      <div className="overflow-x-auto border border-[#3E3E3E] bg-[#1E221B] font-bold">
        <table className="table">
          <thead>
            <tr>
              <th className="w-1/2">Option</th>
              <th className="w-1/2 text-primary text-end md:text-start">
                Avg.APY
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ logo, name, rate, key, benchmark }) => {
              const isPrime = key === 'prime'
              return (
                <Fragment key={key}>
                  <tr
                    className={clsx({
                      'bg-[#a3e96b3d] text-primary': isPrime,
                    })}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-auto aspect-square object-contain"
                          src={logo}
                        />
                        <span>{name}</span>
                        {!!benchmark && '(*)'}
                      </div>
                    </td>
                    <td
                      className={clsx('font-medium', {
                        '!font-bold': isPrime,
                      })}
                    >
                      <div className="flex flex-row justify-end md:justify-between items-center">
                        {rate}
                        {isPrime && (
                          <button className="hidden md:inline-flex btn btn-primary">
                            Start Earning
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {isPrime && (
                    <tr className="md:hidden ">
                      <td colSpan={2}>
                        <button className="btn btn-primary btn-block">
                          Start Earning
                        </button>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <div
      id="portfolio_section"
      className="section-container grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6"
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="text-primary font-bold">
          SAVING - BUT WITH BETTER{' '}
          <RandomTextColor title="YIELD!" className="text-[#D6F3E9]" />
        </h1>
        <h5 className="font-tomorrow text-primary">
          <b>INTELLIGENT WEALTH ALLOCATION</b>{' '}
          <span className="text-[#D6F3E9]">
            unlocks the earning opportunities that traditional finance kept
            off-limits.
          </span>
        </h5>
        <h5 className="font-tomorrow text-primary">
          <b>Your Rewards </b>
          <span className="text-[#D6F3E9]">
            are always at or above the benchmark rate (*).
          </span>
        </h5>
      </div>

      <CompareAPR />
    </div>
  )
}
