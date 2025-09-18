import { useCallback, useState } from 'react'
import Range from './Range'
import TimeItems from './TimeItems'

import banner from '@/static/images/banner/banner.png'
import { MIN_FUND } from '@/constant'

export default function TimePage() {
  const [data, setData] = useState({
    fund: MIN_FUND,
    goal: MIN_FUND * 2,
  })

  const onChange = useCallback((key: string, value: number) => {
    setData((prev) => {
      const newData = { ...prev, [key]: value }

      // Auto-adjust goal if it becomes invalid when fund changes
      if (key === 'fund') {
        const minGoal = value * 2
        const maxGoal = value * 10
        if (newData.goal < minGoal) {
          newData.goal = minGoal
        } else if (newData.goal > maxGoal) {
          newData.goal = maxGoal
        }
      }

      return newData
    })
  }, [])

  return (
    <div
      className="flex flex-col gap-2 px-4 md:px-6 py-8 md:py-16 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="flex flex-col gap-2 items-center">
        <p className="text-2xl md:text-5xl text-primary font-bold">
          TIME IS MONEY
        </p>
        <span>
          <b className="text-primary">PrimeVault</b> turns your deposits into
          continuous growth, harnessing real-time DeFi strategies so your assets
          never stop working.
        </span>
      </div>
      <Range {...data} onChange={onChange} />
      <TimeItems {...data} />
    </div>
  )
}
