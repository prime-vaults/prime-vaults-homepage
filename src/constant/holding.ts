import bank_logo from '@/static/images/logo/bank.svg'
import money_logo from '@/static/images/logo/money.svg'
import aave_logo from '@/static/images/logo/aave.svg'
import prime_logo from '@/static/images/logo/prime.svg'
import dolomite from '@/static/images/logo/dolomite.svg'
import euler from '@/static/images/logo/euler.svg'
import morpho from '@/static/images/logo/morpho.svg'

export interface HoldingItem {
  name: string
  logo: string
  rate: string
  apy: number
  key: string
  benchmark?: boolean
}

export interface HoldingApy {
  usd: HoldingItem[]
  btc: HoldingItem[]
  eth: HoldingItem[]
}

export const HOLDING_DATA: HoldingApy = {
  usd: [
    {
      name: 'PrimeUSD',
      logo: prime_logo,
      rate: '8.1%',
      apy: 8.1,
      key: 'prime',
    },
    {
      name: 'AAVE',
      logo: aave_logo,
      rate: '5.1%',
      apy: 5.1,
      key: 'aave',
      benchmark: true,
    },
    {
      name: 'US Bonds',
      logo: money_logo,
      rate: '4.22%',
      apy: 4.22,
      key: 'us-bonds',
    },
    { name: 'Bank', logo: bank_logo, rate: '0.5%', apy: 0.5, key: 'bank' },
  ],
  btc: [
    {
      name: 'PrimeBTC',
      logo: prime_logo,
      rate: '2.2%',
      apy: 2.2,
      key: 'prime',
    },
    {
      name: 'Dolomite',
      logo: dolomite,
      rate: '0.35%',
      apy: 0.35,
      key: 'dolomite',
    },
    { name: 'Euler', logo: euler, rate: '0.49%', apy: 0.49, key: 'euler' },
    { name: 'Morpho', logo: morpho, rate: '0.8%', apy: 0.8, key: 'morpho' },
    {
      name: 'AAVE',
      logo: aave_logo,
      rate: '0.01%',
      apy: 0.01,
      key: 'aave',
      benchmark: true,
    },
  ],
  eth: [
    {
      name: 'PrimeETH',
      logo: prime_logo,
      rate: '5.65%',
      apy: 5.65,
      key: 'prime',
    },
    {
      name: 'AAVE',
      logo: aave_logo,
      rate: '1.68%',
      apy: 1.68,
      key: 'aave',
      benchmark: true,
    },
    { name: 'Morpho', logo: morpho, rate: '3.13%', apy: 3.13, key: 'morpho' },
    { name: 'Euler', logo: euler, rate: '3.53%', apy: 3.53, key: 'euler' },
  ],
}
