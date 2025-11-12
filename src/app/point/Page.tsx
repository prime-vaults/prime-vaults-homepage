import { Link, useSearchParams } from 'react-router'
// import { useAccountUser } from '@beraji/web3-sdk'

import Container from '@/components/UI/Container'
import BurnPage from './burn/Page'
import clsx from 'clsx'
import BankPage from './bank/Page'

const POINT_TABS = [
  { path: 'burn', label: 'Burn' },
  { path: 'bank', label: 'Bank' },
  { path: 'referral', label: 'Referral' },
]

const Point = () => {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || POINT_TABS[0].path

  return (
    <Container innerClassName="p-4 md:p-6">
      <div className="flex flex-col">
        <div
          role="tablist"
          className="tabs tabs-border py-4 md:py-6 bg-base-300"
        >
          {POINT_TABS.map(({ label, path }) => {
            const isActive = tab === path

            return (
              <Link
                role="tab"
                to={`?tab=${path}`}
                className={clsx(
                  'tab text-2xl md:text-4xl uppercase hover:text-primary',
                  {
                    'text-primary tab-active': isActive,
                  },
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>
        {tab === 'burn' && <BurnPage />}
        {tab === 'bank' && <BankPage />}
      </div>
    </Container>
  )
}

export default Point
