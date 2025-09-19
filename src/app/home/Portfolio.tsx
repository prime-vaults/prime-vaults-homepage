import { Fragment, useMemo, useState } from 'react'
import clsx from 'clsx'

import RandomTextColor from '@/components/RandomTextColor'
import Corner from '@/components/UI/Corner'

import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { SearchQueryKey } from '@/constant'
import { HOLDING_DATA } from '@/constant/holding'

enum Token {
  USD = 'usd',
  BTC = 'btc',
  ETH = 'eth',
}

function CompareAPR() {
  const { update } = useUpdateSearchParams()
  const [tab, setTab] = useState(Token.USD)

  const onClick = (token: Token) => {
    setTab(token)
    update(SearchQueryKey.Tab, token)
  }

  const data = useMemo(() => {
    const rs = HOLDING_DATA[tab]
    if (!rs) return []
    return rs.sort((a, b) => a.apy - b.apy)
  }, [tab])

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
                Avg.APR
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ logo, name, rate, key }) => {
              const isPrime = key === 'prime'
              return (
                <Fragment>
                  <tr
                    key={name}
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
      className="section-container grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-primary text-2xl md:text-5xl text-center md:text-start font-bold">
          WATCH YOUR PORTFOLIO{' '}
          <RandomTextColor title="GROW 24/7" className="text-[#D6F3E9]" /> WITH
          BETTER INTEREST
        </h1>
        <p className="font-tomorrow text-primary">
          INTELLIGENT WEALTH ALLOCATION{' '}
          <span className="text-[#D6F3E9]">
            unlocks the earning opportunities that traditional finance kept
            off-limits.
          </span>
        </p>
        <p className="font-tomorrow text-primary">
          YOUR PRINCIPAL{' '}
          <span className="text-[#D6F3E9]">is always guaranteed.</span>
        </p>
      </div>

      <CompareAPR />
    </div>
  )
}
