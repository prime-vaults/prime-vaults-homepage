import dayjs from 'dayjs'
import { Fragment } from 'react'

import Button from '@/components/UI/Button'

import { numericFormat } from '@/helpers/utils'

export default function BankManagement() {
  return (
    <div className="flex flex-col gap-4 border-t border-base-100 p-4 md:p-6">
      <p className="text-xl md:text-2xl font-bold">Manage withdraw</p>
      <div className="flex flex-col border border-base-100">
        <div className="grid grid-cols-12">
          <div className="col-span-4 text-secondary p-4">
            <span className="">Time Claim</span>
          </div>
          <div className="col-span-5 text-secondary text-center p-4">
            Total Withdraw
          </div>
          <div className="col-span-3 text-secondary text-end p-4">Action</div>
        </div>
        <div className="grid grid-cols-12 text-sm md:text-base bg-base-300">
          {new Array(Math.round(Math.random() * 10)).fill('').map((_, idx) => {
            return (
              <Fragment key={idx}>
                <div className="col-span-4 text-secondary p-4 border-t border-base-100">
                  <span className="font-bold text-primary">
                    {dayjs().toISOString()}
                  </span>
                </div>
                <div className="col-span-5 font-bold text-primary p-4 border-t border-base-100 text-center">
                  {numericFormat(Math.random() * 100 * idx)} P.P
                </div>
                <div className="col-span-3 font-bold p-4 border-t border-base-100 text-end">
                  <Button
                    className="btn btn-primary btn-sm md:min-w-32"
                    disabled
                  >
                    Claim
                  </Button>
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
