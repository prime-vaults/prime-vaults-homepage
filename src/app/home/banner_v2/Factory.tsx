import WrappedTokenPath from './TokenPath'

import AURA_1 from '@/static/images/intro/factory/aura-1.png'
import AURA_2 from '@/static/images/intro/factory/aura-2.png'
import BOX_A from '@/static/images/intro/factory/box-a.png'
import BOX_B from '@/static/images/intro/factory/box-b.png'
import PRIME_TOKEN from '@/static/images/intro/factory/pt-4.png'
import STAND from '@/static/images/intro/factory/stand.png'
import PIPE_LINE from '@/static/images/intro/factory/pipe-line.svg'

export default function Factory() {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-col gap-2 text-2xl md:text-5xl font-bold uppercase px-6">
        <p className="text-primary">Your principal stays safe</p>
        <p>in the vault.</p>
        <p>When your rewards</p>
        <p className="text-primary">accumulated every second.</p>
      </div>
      {/* factory */}
      <div className="relative w-fit flex flex-col items-center pb-72">
        {/* box */}
        <div className="relative w-fit h-fit flex flex-col items-center bouncing">
          <img
            src={BOX_A}
            className="relative w-60 h-auto object-contain z-10"
          />
          <img
            src={BOX_B}
            className="absolute w-full h-full top-0 left-0 object-contain z-0"
          />
          <img
            src={PRIME_TOKEN}
            className="absolute w-1/3 h-auto -top-1/2 object-contain bounding z-[1]"
          />
          <img
            src={AURA_2}
            className="absolute w-[60%] h-auto -top-1/4 object-contain aura-scaling z-[1]"
          />
        </div>
        {/* stand */}
        <div className="relative w-fit h-fit">
          <img
            src={STAND}
            className="relative w-96 h-auto object-contain z-10"
          />
          <img
            src={AURA_1}
            className="absolute w-full h-auto bottom-[58%] object-contain opacity-35 z-20"
          />
          {/* pipe line */}
          <div className="absolute w-fit h-fit top-1/4 left-0 -translate-x-10/12 z-0">
            <div className="relative w-auto h-96 aspect-[1.72]">
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
