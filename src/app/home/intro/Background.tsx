import { Fragment, useMemo, useState } from 'react'

import Door from './Door'
import SunShine from './SunShine'

import BG from '@/static/images/intro/background.png'
import WATER from '@/static/images/intro/water.png'
import BANK from '@/static/images/intro/bank.png'
import MOUNT_L from '@/static/images/intro/mount-l.png'
import MOUNT_R from '@/static/images/intro/mount-r.png'
import TREE from '@/static/images/intro/tree.png'
import TREE_1 from '@/static/images/intro/tree-1.png'
import TREE_2 from '@/static/images/intro/tree-2.png'

const MAX_ROTATE = 105
const MIN_SCALE = 0.5
const END_SCALE = 0.8

type BackgroundProps = {
  step?: number
  onDone?: () => void
  onNextStep?: () => void
}
export default function Background({
  step = 0,
  onDone = () => {},
  onNextStep = () => {},
}: BackgroundProps) {
  const [sunProgress, setSunProgress] = useState(0)

  const rotate = sunProgress * MAX_ROTATE

  const scaleY = useMemo(() => {
    let scaleY = 1
    if (rotate <= 45) {
      scaleY = 1 - (1 - MIN_SCALE) * (rotate / 45)
    } else {
      scaleY =
        MIN_SCALE + (END_SCALE - MIN_SCALE) * ((rotate - 45) / (105 - 45))
    }

    return scaleY
  }, [rotate])

  return (
    <Fragment>
      <SunShine
        trigger={step === 1}
        onProgress={setSunProgress}
        onDone={onNextStep}
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="relative w-full h-full">
          {/* water */}
          <img
            src={WATER}
            className="absolute w-full h-auto left-0 bottom-0 object-cover z-0"
          />
          {/* stone wall + bank */}
          <div className="relative w-full h-11/12 md:h-3/4 flex flex-col z-10">
            {/* stone */}
            <img src={BG} className="relative w-full h-full object-fill z-0" />
            {/* bank */}
            <div className="absolute w-3/4 md:w-1/4 bottom-0 left-1/2 -translate-x-1/2">
              <div className="relative w-full">
                <img src={BANK} className="w-full h-auto object-contain" />
                <div className="w-[11%] absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-2/3 z-10">
                  <Door trigger={step === 2} onDone={onDone} />
                </div>
              </div>
            </div>
          </div>
          {/* small water */}
          <div className="absolute w-[40%] left-0 bottom-0 z-20">
            <div className="relative w-full">
              <img
                src={MOUNT_L}
                className="relative w-full h-auto object-contain z-0"
              />
              {/* tree 1 */}
              <img
                src={TREE_1}
                className="absolute w-[29%] h-auto bottom-[15%] right-[36%] object-contain z-20"
              />
              <img
                src={TREE_2}
                className="absolute w-[34%] h-auto bottom-[19%] right-[7%] object-contain z-20"
              />
              <div
                className="w-[18%] h-auto aspect-[0.4202] absolute bottom-0 right-0 opacity-55 z-10"
                style={{
                  transform: `perspective(85px) rotate(120deg) translate(28%, -8%) skew(-15deg, 46deg)`,
                }}
              >
                <img
                  src={TREE}
                  className="w-full h-full object-contain"
                  style={{
                    transform: `rotate(${rotate}deg) scaleY(${scaleY}`,
                    transformOrigin: '75% 100%',
                  }}
                />
              </div>
              <div
                className="w-[15%] h-auto aspect-[0.4202] absolute bottom-0 right-0 opacity-55 z-10"
                style={{
                  transform: `perspective(85px) rotate(120deg) translate(95%, 32%) skew(-15deg,46deg)`,
                }}
              >
                <img
                  src={TREE}
                  className="w-full h-full object-contain"
                  style={{
                    transform: `rotate(${rotate}deg) scaleY(${scaleY}`,
                    transformOrigin: '75% 100%',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="absolute w-[38%] right-0 bottom-0 z-20">
            <div className="relative w-full">
              <img
                src={MOUNT_R}
                className="w-full h-auto object-contain z-20"
              />
              {/* tree */}
              <img
                src={TREE_1}
                className="absolute w-[36%] h-auto bottom-[19%] left-[44%] object-contain z-20"
              />
              <div
                className="w-[20%] h-auto aspect-[0.4202] absolute bottom-0 right-0 opacity-55 z-10"
                style={{
                  transform: `perspective(85px) rotate(120deg) translate(74%, -30%) skew(-15deg, 46deg)`,
                }}
              >
                <img
                  src={TREE}
                  className="w-full h-full object-contain"
                  style={{
                    transform: `rotate(${rotate}deg) scaleY(${scaleY}`,
                    transformOrigin: '75% 100%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
