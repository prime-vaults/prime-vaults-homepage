import { useState } from 'react'

import ScrollItem from './ScrollItem'
import ScrollAnim from './ScrollAnim'
import { Mouse } from 'lucide-react'

export default function ScrollingPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="grid grid-cols-7 px-4 md:p-8 py-8 md:py-16 gap-4 md:gap-8">
      <div className="flex md:hidden order-1 col-span-full">
        <h1 className="text-primary uppercase">Beyond Wealth, One Place.</h1>
      </div>
      <div className="relative order-3 md:order-2 col-span-full md:col-span-4 flex flex-col gap-4 md:gap-8">
        <h1 className="hidden md:flex text-primary uppercase">
          Beyond Wealth, One Place.
        </h1>
        <div className="flex w-full h-full max-h-96">
          <ScrollItem onActiveIndexChange={setActiveIndex} />
        </div>
        <div className="absolute bottom-0 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <Mouse className="animate-bounce" size={24} />
          <span>Scroll here</span>
        </div>
      </div>
      <div className="order-2 md:order-3 col-span-full md:col-span-3 ">
        <ScrollAnim activeIndex={activeIndex} />
      </div>
    </div>
  )
}
