import clsx from 'clsx'
import dayjs from 'dayjs'
import { Fragment } from 'react'

export default function BurnHistory() {
  return (
    <div className="flex flex-col">
      <div className="p-4 md:p-6">
        <p className="text-xl md:text-2xl uppercase">
          <b className="text-primary">Burn</b> history
        </p>
      </div>
      <div className="flex flex-col border border-base-100">
        <div className="grid grid-cols-12 ">
          <div className="col-span-4 text-secondary p-4">
            <span className="">Time</span>
          </div>
          <div className="col-span-5 text-secondary p-4">Status</div>
          <div className="col-span-3 text-secondary p-4">Total Burned</div>
        </div>
        <div className="grid grid-cols-12 text-sm md:text-base bg-base-300">
          {new Array(Math.round(Math.random() * 10)).fill('').map((_, idx) => {
            const r = Math.random() * 10
            const s = r < 5 ? 'failed' : 'successfully'
            return (
              <Fragment key={idx}>
                <div className="col-span-4 text-secondary p-4 border-t border-base-100">
                  <span className="">{dayjs().toISOString()}</span>
                </div>
                <div
                  className={clsx(
                    'col-span-5 text-primary p-4 border-t border-base-100 font-bold uppercase',
                    { 'text-red-600': r < 5 },
                  )}
                >
                  {s}
                </div>
                <div className="col-span-3 font-bold p-4 border-t border-base-100">
                  1000 PP
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
