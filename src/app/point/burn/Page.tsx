import Corner from '@/components/UI/Corner'
import BurnLeaderboard from './Leaderboard'
import BurnHistory from './History'
import CreditPointPage from './CreditPoint'

import { useSearchParams } from 'react-router'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { SearchQueryKey } from '@/constant/query'

enum BurnTab {
  Leaderboard = 'leaderboard',
  BurnHistory = 'burn-history',
}

export default function BurnPage() {
  const [searchParams] = useSearchParams()
  const { update } = useUpdateSearchParams()
  const cat = searchParams.get('cat') || BurnTab.BurnHistory

  const onClick = (t: string) => {
    update(SearchQueryKey.Category, t)
  }

  return (
    <div className="flex flex-col border border-base-100 bg-repeating">
      <CreditPointPage />
      <div className="flex flex-col border-t border-base-100">
        <div
          role="tablist"
          className="relative tabs w-full border-b border-base-100"
        >
          {Object.values(BurnTab).map((t) => {
            const active = t === cat
            return (
              <button
                key={t}
                className={`tab tab-lifted flex-1 px-6 md:px-11 py-2.5 m-1 font-medium transition-colors duration-100 uppercase ${
                  active ? '!text-primary bg-base-200' : ''
                }`}
                onClick={() => onClick(t)}
              >
                {t}
                {active && <Corner />}
              </button>
            )
          })}
        </div>

        {cat === BurnTab.Leaderboard && <BurnLeaderboard />}
        {cat === BurnTab.BurnHistory && <BurnHistory />}
      </div>
    </div>
  )
}
