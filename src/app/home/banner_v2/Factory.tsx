import WrappedTokenPath from './TokenPath'

import AURA_1 from '@/static/images/intro/factory/aura-1.png'
import BOX_A from '@/static/images/intro/factory/box-a.png'
import BOX_B from '@/static/images/intro/factory/box-b.png'
import STAND from '@/static/images/intro/factory/stand.png'
import PIPE_LINE from '@/static/images/intro/factory/pipe-line.svg'

export default function Factory() {
  return (
    <div className="flex flex-row gap-4 md:justify-between -mt-16 md:-mt-40">
      <div className="flex-1 flex flex-col md:gap-2 text-sm md:text-5xl font-medium md:font-bold uppercase px-4 md:px-6">
        <p className="text-primary">Your principal stays safe</p>
        <p>in the vault.</p>
        <p>When your rewards</p>
        <p className="text-primary">accumulated every second.</p>
      </div>
      {/* factory */}
      <div className="relative w-fit flex flex-col items-center px-6 pb-28 md:pb-72">
        {/* box */}
        <div className="relative w-fit h-fit flex flex-col items-center">
          <img
            src={BOX_A}
            className="relative w-[20dvw] h-auto object-contain bouncing z-10"
          />
          <img
            src={BOX_B}
            className="absolute w-full h-full top-0 left-0 object-contain bouncing z-0"
          />
        </div>
        {/* stand */}
        <div className="relative w-fit h-fit flex flex-col items-center">
          <img
            src={STAND}
            className="relative w-[26.5dvw] h-auto object-contain z-10"
          />
          <img
            src={AURA_1}
            className="absolute w-full h-auto bottom-[58%] object-contain opacity-35 z-20"
          />
          {/* pipe line */}
          <div className="flex flex-col items-end absolute md:w-fit md:h-fit top-1/4 left-0 -translate-x-9/12 md:-translate-x-10/12 z-0">
            <div className="relative w-[46dvw] h-auto aspect-[1.72]">
              <img
                className="relative w-full h-full object-contain z-10"
                src={PIPE_LINE}
              />
              <WrappedTokenPath />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
