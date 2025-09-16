import { Fragment } from 'react'

import Button from '@/components/UI/Button'
import Welcome from './Welcome'

export default function BannerPage() {
  return (
    <Fragment>
      <Welcome />
      <div className="grid grid-cols-5">
        <img src="" className="col-span-full md:col-span-2" />
        <div className="col-span-full md:col-span-3 flex flex-col gap-2">
          <h3 className="text-2xl md:text-5xl text-primary font-bold">
            High returns. Low complexity.
          </h3>
          <span>
            Achieve <b className="text-primary">15-25%</b> APY without
            navigating DeFi's complexity.
          </span>
          <Button className="btn btn-primary w-fit text-base-300">
            Start now
          </Button>
          <div className="w-full flex flex-col items-end">
            <span className="w-full md:w-2/3 text-xs text-end text-secondary">
              *APY is variable and subject to change. Actual performance may
              differ, and deposits are not insured or guaranteed.
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
