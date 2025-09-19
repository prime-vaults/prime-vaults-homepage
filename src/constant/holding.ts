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
      rate: '15-19%',
      apy: 17,
      key: 'prime',
    },
    { name: 'AAVE', logo: aave_logo, rate: '5.1%', apy: 5.1, key: 'aave' },
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
    { name: 'PrimeBTC', logo: prime_logo, rate: '3-5%', apy: 4, key: 'prime' },
    {
      name: 'Dolomite',
      logo: dolomite,
      rate: '0.35%',
      apy: 0.35,
      key: 'dolomite',
    },
    { name: 'Euler', logo: euler, rate: '0.49%', apy: 0.49, key: 'euler' },
    { name: 'Morpho', logo: morpho, rate: '0.8%', apy: 0.8, key: 'morpho' },
  ],
  eth: [
    {
      name: 'PrimeETH',
      logo: prime_logo,
      rate: '9-11%',
      apy: 10,
      key: 'prime',
    },
    { name: 'AAVE', logo: aave_logo, rate: '1.68%', apy: 1.68, key: 'aave' },
    { name: 'Morpho', logo: morpho, rate: '3.13%', apy: 3.13, key: 'morpho' },
    { name: 'Euler', logo: euler, rate: '3.53%', apy: 3.53, key: 'euler' },
  ],
}
