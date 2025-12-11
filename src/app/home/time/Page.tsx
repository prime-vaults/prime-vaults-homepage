import { useCallback, useState } from 'react'
import Range from './Range'
import TimeItems from './TimeItems'

import banner from '@/static/images/banner/banner.png'
import { MIN_FUND, MIN_GOAL } from '@/constant'

export default function TimePage() {
  const [data, setData] = useState({
    fund: MIN_FUND,
    goal: MIN_GOAL,
  })

  const onChange = useCallback((key: string, value: number) => {
    setData((prev) => {
      const newData = { ...prev, [key]: value }
      return newData
    })
  }, [])

  return (
    <div
      className="flex flex-col gap-2 px-4 md:px-6 py-8 md:py-16 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-primary">TIME IS MONEY</h1>
        <h4 className="text-center px-4 md:px-40">
          <b className="text-primary">Prime Vaults</b> turns your deposits into
          continuous growth, harnessing real-time DeFi strategies so your assets
          never stop working.
        </h4>
      </div>
      <Range {...data} onChange={onChange} />
      <TimeItems {...data} />
    </div>
  )
}
