import clsx from 'clsx'
import { Fragment } from 'react'

export default function VaultPerformance() {
  const data = new Array(4).fill('').map((_, index) => index + 1)

  return (
    <div className="flex flex-col gap-4 border border-base-100 bg-base-200 p-4">
      <div className="flex flex-col gap-1">
        <p className="text-xl md:text-2xl font-medium">Vault performance</p>
        <span className="text-sm md:text-base text-secondary">
          Compared to traditional DeFi vaults, PrimeVaults delivers higher, more
          stable returns through AI-driven yield reallocation.
        </span>
      </div>
      <div className="grid grid-cols-12">
        {data.map((v, index) => {
          const isFirst = index === 0
          const isLast = index === data.length - 1
          const p = Math.min(1 - v / data.length, 1)

          return (
            <Fragment key={v}>
              <div className="col-span-2 flex flex-row gap-2 items-center py-1">
                <div className="w-6 h-6 rounded-full bg-cyan-300" />
                <p className="text-sm md:text-base">PrimeUSD</p>
              </div>
              <div
                className={clsx(
                  'col-span-10 border-l border-base-100 pl-2 py-1 flex flex-row gap-2 items-center',
                  {
                    'border-b pb-2': isLast,
                  },
                )}
              >
                <div
                  className={clsx(
                    'w-0 h-8 bg-base-300 transition-all duration-1000',
                    { 'bg-primary': isFirst },
                  )}
                  style={{ width: `${p * 100}%` }}
                />
                <p className="text-sm text-primary font-bold">{p * 100}%</p>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
