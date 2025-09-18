import { useState } from 'react'

import ScrollItem from './ScrollItem'
import ScrollAnim from './ScrollAnim'

export default function ScrollingPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="grid grid-cols-7 px-4 md:p-8 py-8 md:py-16 gap-4 md:gap-8">
      <div className="flex md:hidden order-1 col-span-full">
        <p className="text-primary text-2xl md:text-5xl uppercase">
          Beyond Wealth, One Place.
        </p>
      </div>
      <div className="order-3 md:order-2 col-span-full md:col-span-4 flex flex-col gap-4 md:gap-8">
        <p className="hidden md:flex text-primary text-2xl md:text-5xl uppercase">
          Beyond Wealth, One Place.
        </p>
        <div className="flex w-full h-full max-h-96">
          <ScrollItem onActiveIndexChange={setActiveIndex} />
        </div>
      </div>
      <div className="order-2 md:order-3 col-span-full md:col-span-3 ">
        <ScrollAnim activeIndex={activeIndex} />
      </div>
    </div>
  )
}
