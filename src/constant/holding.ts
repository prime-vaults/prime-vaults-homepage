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
}

export interface HoldingApy {
  usd: HoldingItem[]
  btc: HoldingItem[]
  eth: HoldingItem[]
}

export const HOLDING_DATA: HoldingApy = {
  usd: [
    { name: 'PrimeUSD', logo: prime_logo, rate: '18-25%', apy: 21.5 },
    { name: 'AAVE', logo: aave_logo, rate: '5.1%', apy: 5.1 },
    { name: 'US Bonds', logo: money_logo, rate: '4.22%', apy: 4.22 },
    { name: 'Bank', logo: bank_logo, rate: '0.5%', apy: 0.5 },
  ],
  btc: [
    { name: 'PrimeUSD', logo: prime_logo, rate: '3-5%', apy: 4 },
    { name: 'Dolomite', logo: dolomite, rate: '0.35%', apy: 0.35 },
    { name: 'Euler', logo: euler, rate: '0.49%', apy: 0.49 },
    { name: 'Morpho', logo: morpho, rate: '0.8%', apy: 0.8 },
  ],
  eth: [
    { name: 'PrimeUSD', logo: prime_logo, rate: '9-11%', apy: 10 },
    { name: 'AAVE', logo: aave_logo, rate: '1.68%', apy: 1.68 },
    { name: 'Morpho', logo: morpho, rate: '3.13%', apy: 3.13 },
    { name: 'Euler', logo: euler, rate: '3.53%', apy: 3.53 },
  ],
}
