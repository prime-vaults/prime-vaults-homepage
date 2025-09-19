import clsx from 'clsx'
import { useMemo } from 'react'

import { Timer } from 'lucide-react'

import { useSearchParams } from 'react-router'
import { SearchQueryKey } from '@/constant'
import { HOLDING_DATA } from '@/constant/holding'

type TimeItemData = {
  name: string
  rate: string
  apy: number // Actual APY number for calculation
  time: number
  logo: string
  key: string
}

type TimeItemProps = {
  highlight?: boolean
} & TimeItemData

const TimeItem = ({ highlight, ...props }: TimeItemProps) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-12 gap-2 md:gap-0 items-center p-4 not-last:border-b-2 not-last:border-base-100',
        {
          'bg-[#364826]': highlight,
          'bg-base-200': !highlight,
        },
      )}
    >
      <div className="col-span-8 md:col-span-2 flex flex-row items-center">
        <img className="w-6.5 h-auto object-contain" src={props.logo} />
        <p
          className={clsx('text-base md:text-xl ml-2', {
            'text-primary': highlight,
            'text-white': !highlight,
          })}
        >
          {props.name}
        </p>
      </div>
      <div className="col-span-4 md:col-span-2">
        <p className="md:hidden text-xs">RATE</p>
        <p
          className={clsx('text-base md:text-xl', {
            'text-primary': highlight,
            'text-white': !highlight,
          })}
        >
          {props.rate}
        </p>
      </div>
      <div className="col-span-full md:col-span-8 flex flex-col gap-1">
        <p className="md:hidden text-xs">TIME</p>
        <div
          style={{
            width: `${Math.min(props.time * 2, 100)}%`,
          }}
          className="min-w-40 flex flex-row items-center gap-2 px-4 py-1 md:py-2 bg-primary-content transition-all duration-700"
        >
          <Timer className="text-base-300 min-w-5 md:min-w-8" />
          <p className="text-sm md:text-xl text-base-300 text-nowrap">
            {props.time > 100 ? '100+' : Math.ceil(props.time)} year
            {props.time > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

// Function to calculate time needed to reach goal with compound interest
const calculateYears = (
  principal: number,
  goal: number,
  apy: number,
): number => {
  if (principal <= 0 || goal <= principal || apy <= 0) {
    return 0
  }

  // Formula: t = ln(FV/PV) / ln(1 + r)
  // Where: FV = Future Value (goal), PV = Present Value (fund), r = annual rate
  return Math.log(goal / principal) / Math.log(1 + apy / 100)
}

type TimeItemsProps = { fund: number; goal: number }
export default function TimeItems({ fund, goal }: TimeItemsProps) {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get(SearchQueryKey.Tab) || 'usd'

  const data = useMemo((): TimeItemData[] => {
    const items = HOLDING_DATA[tab as keyof typeof HOLDING_DATA] || []

    return items
      .sort((a, b) => b.apy - a.apy)
      .map((item) => ({
        ...item,
        time: calculateYears(fund, goal, item.apy),
      }))
  }, [fund, goal, tab])

  return (
    <div className="w-full flex flex-col">
      <div className="hidden md:grid grid-cols-12 p-4">
        <div className="col-span-2">
          <p className="text-white text-sm md:text-base uppercase">Holding</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm md:text-base text-primary uppercase">
            APY Rate
          </p>
        </div>
        <div className="col-span-8">
          <p className="text-sm md:text-base text-primary uppercase">Time</p>
        </div>
      </div>
      <div className="w-full flex flex-col border border-base-100">
        {data.map((t) => (
          <TimeItem {...t} highlight={t.key === 'prime'} key={t.name} />
        ))}
      </div>
    </div>
  )
}
