import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { ArrowLeft } from 'lucide-react'
import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'
import Corner from '@/components/UI/Corner'
import Details from './Details'
import Deposit from '@/components/staking/deposit/Page'
import Withdraw from '@/components/staking/withdraw/Page'
import SimilarVault from './SimilarVault'

import { CoreRoutes } from '@/constant/router'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { SearchQueryKey } from '@/constant/query'
import VaultPerformance from './VaultPerformance'

const TAB_ITEMS = [
  {
    key: 'details',
    label: 'Details',
  },
  {
    key: 'metric',
    label: 'Metric',
  },
]

export default function PoolDetailsPage() {
  const [searchParams] = useSearchParams()
  const poolId = searchParams.get('id') || ''
  const tab = searchParams.get('tab') || TAB_ITEMS[0].key
  const nav = useNavigate()
  const { update } = useUpdateSearchParams()

  const onClick = (t: string) => {
    update(SearchQueryKey.Tab, t)
  }

  useEffect(() => {
    if (!poolId) nav(CoreRoutes.staking())
  }, [nav, poolId])

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <Button
          className="btn w-fit my-2"
          onClick={() => nav(CoreRoutes.staking())}
        >
          <ArrowLeft className="w-6" />
          Back
        </Button>
        <div className="flex flex-col bg-base-200 p-4 md:p-6">
          {/* token */}
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400" />
            <p className="text-xl md:text-3xl">PrimeUSD #{poolId}</p>
            <span className="text-sm md:text-base">
              <b className="text-primary">PrimeUSD</b> delivers stable yield on
              USD-based assets by tapping into top-tier money markets. It
              balances safety and performance with automated execution, ensuring
              consistent returns on stablecoins for risk-averse investors.
            </span>
          </div>
          {/* information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center border border-base-100 bg-base-300">
              <span className="text-sm md:text-base text-secondary">TVL</span>
              <p className="text-xl md:text-3xl">$600.0M</p>
            </div>
            <div className="flex flex-col items-center justify-center border border-base-100 bg-base-300">
              <span className="text-sm md:text-base text-secondary">APR</span>
              <p className="text-xl md:text-3xl text-primary">22.3%</p>
            </div>
            <div className="col-span-full flex flex-col md:flex-row md:items-center justify-between border border-base-100 bg-base-300 p-4 gap-4 md:gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-row justify-between gap-2">
                  <p>Your staked</p>
                  <div className="flex flex-col items-end md:border-r border-base-100 md:pr-6">
                    <p className="text-xl md:text-3xl">20.01 USDC.e</p>
                    <span className="text-sm md:text-base text-primary">
                      $20.01
                    </span>
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <p>Reward Vaults</p>
                  <div className="flex flex-col items-end md:border-r border-base-100 md:pr-6">
                    <p className="text-xl md:text-3xl">0.1 USDC</p>
                    <span className="text-sm md:text-base text-primary">
                      $0.01
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-2 gap-2">
                  <Withdraw poolId={Number(poolId)}>
                    <Button className="btn btn-outline">Withdraw</Button>
                  </Withdraw>
                  <Deposit poolId={Number(poolId)}>
                    <Button className="btn bg-white text-black btn-outline">
                      Deposit
                    </Button>
                  </Deposit>
                </div>
                <Button className="btn btn-primary btn-block">Claim</Button>
              </div>
            </div>
          </div>

          {/* tab */}
          <div role="tablist" className="relative tabs w-full bg-base-300">
            {TAB_ITEMS.map((t) => {
              const active = t.key === tab
              return (
                <button
                  key={t.key}
                  className={`tab tab-lifted flex-1 px-6 md:px-11 py-2.5 m-1 font-medium transition-colors duration-100 uppercase ${
                    active ? '!text-primary bg-[#a3e96b0d]' : ''
                  }`}
                  onClick={() => onClick(t.key)}
                >
                  {t.label}
                  {active && <Corner />}
                </button>
              )
            })}
          </div>
          {/* tab content */}
          {tab === 'details' && <Details />}
          {tab === 'metric' && (
            <div className="flex flex-col p-4 bg-base-300 border border-base-100">
              <p>Metric</p>
              <span>No metric found</span>
            </div>
          )}
        </div>
        <VaultPerformance />
        <SimilarVault />
      </div>
    </Container>
  )
}
