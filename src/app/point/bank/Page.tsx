import Button from '@/components/UI/Button'
import Corner from '@/components/UI/Corner'
import BankDeposit from './Deposit'
import Withdraw from './Withdraw'
import BankManagement from './Management'

import { SearchQueryKey } from '@/constant/query'
import { useUpdateSearchParams } from '@/hooks/updateSearchParams'
import { useSearchParams } from 'react-router'

import BANK from '@/static/images/prime-point/bank.svg'

enum BankAction {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

export default function BankPage() {
  const [searchParams] = useSearchParams()
  const { update } = useUpdateSearchParams()
  const cat = searchParams.get('cat') || BankAction.Deposit

  const onClick = (t: string) => {
    update(SearchQueryKey.Category, t)
  }

  return (
    <div className="flex flex-col border border-base-100">
      <div className="flex flex-col gap-2 p-4 md:p-6">
        <div className="flex flex-row items-center gap-4">
          <img src={BANK} alt="bank" />
          <div className="flex-1 flex flex-col">
            <p className="text-xl md:text-2xl">Where Your P.P Grows Steadily</p>
            <span className="text-base md:text-lg text-secondary">
              Where Your P.P Grows Steadily
            </span>
          </div>
          <div className="flex flex-col items-center px-4 md:px-6 py-1 border border-base-100">
            <span className="text-base text-secondary">APR</span>
            <p className="text-xl md:text-2xl font-medium text-primary">55%</p>
          </div>
        </div>
        <span className="text-secondary">
          Turn your Prime Points 💎 into lasting value. Deposit, save, and let
          your balance grow naturally inside PrimeVaults.
        </span>
      </div>
      <div className="grid grid-cols-12 p-4 md:p-6 border-t border-base-100">
        <div className="col-span-full md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-base-100 p-4">
          <span className="text-sm text-secondary">Prime Point Deposited</span>
          <p className="text-lg md:text-2xl font-bold text-primary">
            8,854 P.P
          </p>
        </div>
        <div className="col-span-full md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-base-100 p-4">
          <span className="text-sm text-secondary">Unclaimed Rewards</span>
          <p className="text-lg md:text-2xl font-bold text-primary">1000 P.P</p>
          <Button className="btn btn-primary btn-sm btn-block">Harvest</Button>
        </div>
        <div className="col-span-full md:col-span-6 flex flex-col gap-4 p-4">
          <div
            role="tablist"
            className="relative tabs w-full border border-base-100"
          >
            {Object.values(BankAction).map((t) => {
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
          {cat === BankAction.Deposit && <BankDeposit />}
          {cat === BankAction.Withdraw && <Withdraw />}
        </div>
      </div>
      <BankManagement />
    </div>
  )
}
