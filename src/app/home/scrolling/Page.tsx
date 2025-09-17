import { useLayoutEffect, useState } from 'react'

import ScrollItem from './ScrollItem'
import ScrollAnim from './ScrollAnim'

export default function ScrollingPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="grid grid-cols-7 p-4 md:p-6">
      <div className="col-span-full md:col-span-4 flex flex-col gap-4 md:gap-8">
        <p className="text-primary text-2xl md:text-5xl uppercase font-bold">
          Beyond Wealth, One Place.
        </p>
        <div className="flex w-full h-full max-h-96">
          <ScrollItem onActiveIndexChange={setActiveIndex} />
        </div>
      </div>
      <div className="col-span-full md:col-span-3 ">
        <ScrollAnim activeIndex={activeIndex} />
      </div>
    </div>
  )
}
