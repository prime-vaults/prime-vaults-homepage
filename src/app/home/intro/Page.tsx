import { useState } from 'react'
import Clock from './Clock'
import SunShine from './SunShine'

import BG from '@/static/images/intro/background.png'
import Button from '@/components/UI/Button'

export default function IntroPage() {
  const [trigger, setTrigger] = useState(false)
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-base-300 z-[999]">
      <div
        className="relative w-full h-full bg-cover bg-no-repeat bg-bottom"
        style={{ backgroundImage: `url(${BG})` }}
      >
        {/* <SunShine /> */}
        {/* Clock */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Clock trigger={trigger} onDone={() => setTrigger(false)} />
          <Button className="btn btn-primary" onClick={() => setTrigger(true)}>
            Click
          </Button>
        </div>
      </div>
    </div>
  )
}
