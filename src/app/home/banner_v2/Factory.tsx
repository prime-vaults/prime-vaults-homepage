import AURA_1 from '@/static/images/intro/factory/aura-1.png'
import AURA_2 from '@/static/images/intro/factory/aura-2.png'
import BOX_A from '@/static/images/intro/factory/box-a.png'
import BOX_B from '@/static/images/intro/factory/box-b.png'
import PRIME_TOKEN from '@/static/images/intro/factory/pt-4.png'
import STAND from '@/static/images/intro/factory/stand.png'
import PIPE_LINE from '@/static/images/intro/factory/pipe-line.png'
import WrappedTokenPath from './TokenPath'

export default function Factory() {
  return (
    <div className="flex flex-row items-end">
      {/* pipe line */}
      <div className="relative -mr-4">
        <img
          className="relative w-auto h-44 object-contain z-10"
          src={PIPE_LINE}
        />
        <WrappedTokenPath />
      </div>
      {/* factory */}
      <div className="relative w-fit flex flex-col items-center">
        {/* box */}
        <div
          className="relative w-fit h-fit flex flex-col items-center bouncing"
          style={{ animationDuration: '1200ms' }}
        >
          <img
            src={BOX_A}
            className="relative w-32 h-auto object-contain z-10"
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
            className="relative w-44 h-auto object-contain z-0"
          />
          <img
            src={AURA_1}
            className="absolute w-full h-auto bottom-[58%] object-contain opacity-35 z-10"
          />
        </div>
      </div>
    </div>
  )
}
