import { useState } from 'react'
import clsx from 'clsx'

import RandomTextColor from '@/components/RandomTextColor'

import bank_logo from '@/static/images/logo/bank.svg'
import money_logo from '@/static/images/logo/money.svg'
import aave_logo from '@/static/images/logo/aave.svg'
import prime_logo from '@/static/images/logo/prime.svg'

enum Token {
  USD = 'USD',
  BTC = 'BTC',
  ETH = 'ETH',
}

enum Provider {
  Bank = 'Bank',
  Bond = 'Bond',
  Aave = 'Aave',
  Prime = 'Prime',
}

const LIST = [
  {
    provider: Provider.Bank,
    logo: bank_logo,
    title: 'Bank',
  },
  {
    provider: Provider.Bond,
    logo: money_logo,
    title: 'US Bonds',
  },
  {
    provider: Provider.Aave,
    logo: aave_logo,
    title: 'AAVE',
  },
  {
    provider: Provider.Prime,
    logo: prime_logo,
    title: 'Prime',
  },
]

const STATS: Record<Token, Record<Provider, { APR: string }>> = {
  USD: {
    Bank: {
      APR: '0.5',
    },
    Bond: {
      APR: '4.22',
    },
    Aave: {
      APR: '4.50',
    },
    Prime: {
      APR: '18-25',
    },
  },
  BTC: {
    Bank: {
      APR: '0.7',
    },
    Bond: {
      APR: '5.2',
    },
    Aave: {
      APR: '5.8',
    },
    Prime: {
      APR: '20-27',
    },
  },
  ETH: {
    Bank: {
      APR: '1.2',
    },
    Bond: {
      APR: '6.6',
    },
    Aave: {
      APR: '7.7',
    },
    Prime: {
      APR: 'Up to 33',
    },
  },
}

function CompareAPR() {
  const [tab, setTab] = useState(Token.USD)

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        className="tabs w-fit border border-b-0 border-[#3E3E3E]"
      >
        {Object.values(Token).map((token) => (
          <button
            key={token}
            className={`tab tab-lifted px-11 py-2.5 m-1 font-medium transition-colors duration-100 ${
              token === tab ? '!text-primary bg-[#a3e96b0d]' : ''
            }`}
            onClick={() => setTab(token)}
          >
            {token}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto border border-[#3E3E3E] bg-[#1E221B] font-bold">
        <table className="table">
          <thead>
            <tr>
              <th className="w-1/2">Option</th>
              <th className="w-1/2 text-primary">Avg.APR</th>
            </tr>
          </thead>
          <tbody>
            {LIST.map((item) => (
              <tr
                key={item.provider}
                className={clsx({
                  'bg-[#a3e96b3d] text-primary':
                    item.provider === Provider.Prime,
                })}
              >
                <td>
                  <div className="flex items-center gap-2">
                    <img src={item.logo} alt="" />
                    <span>
                      {item.title}
                      {item.provider === Provider.Prime && tab}
                    </span>
                  </div>
                </td>
                <td
                  className={clsx('font-medium', {
                    '!font-bold': item.provider === Provider.Prime,
                  })}
                >
                  <div className="flex flex-row justify-between items-center">
                    {STATS[tab][item.provider].APR}%
                    {item.provider === Provider.Prime && (
                      <button
                        className="btn border-0 p-2 bg-[#B2E77B] text-[#000]"
                        style={{
                          boxShadow: '1px 1px 16px 0 rgba(255, 255, 255, 0.25)',
                        }}
                      >
                        Start Earning
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <div className="grid grid-cols-2 px-[30px] py-16 gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-primary text-[50px] font-bold">
          WATCH YOUR PORTFOLIO{' '}
          <RandomTextColor title="GROW 24/7" className="text-[#D6F3E9]" /> WITH
          BETTER INTEREST
        </h1>
        <p className="font-tomorrow text-primary">
          INTELLIGENTLY AUTOMATED ASSET ALLOCATION{' '}
          <span className="text-[#D6F3E9]">
            unlock the earning opportunities that traditional finance kept
            off-limits
          </span>
        </p>
      </div>

      <CompareAPR />
    </div>
  )
}
