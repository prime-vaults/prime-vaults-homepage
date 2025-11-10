import BranchRight from './stroke/BranchRight'
import BranchLeft from './stroke/BranchLeft'
import StrokeVertical from './stroke/StrokeVertical'
import StrokeHorizontal from './stroke/StrokeHorizontal'

import USER from '@/static/images/yield/user.png'
import FACTORY from '@/static/images/yield/factory.png'
import REWARD from '@/static/images/yield/reward.png'
import TOKEN from '@/static/images/yield/token.png'
import VAULT from '@/static/images/yield/vault.png'
import STAND from '@/static/images/yield/stand.svg'

export default function YieldFlowPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <p className="text-2xl md:text-5xl font-black text-primary">
        Prime Yield flow
      </p>
      <div className="grid grid-cols-12 select-none">
        {/* left side */}
        <div className="col-span-7 grid grid-cols-6 pt-12">
          <div className="col-span-1 flex flex-col w-full h-fit justify-center items-center">
            <img className="w-3/4 h-auto object-contain" src={USER} />
          </div>
          <div className="relative col-span-2 w-full h-auto">
            <BranchRight />
          </div>

          <div className="col-span-1 flex flex-col items-center -mt-[22%]">
            {new Array(4).fill('').map((_, idx) => {
              return (
                <img
                  className="w-[45%] h-auto object-contain"
                  src={TOKEN}
                  key={idx}
                />
              )
            })}
          </div>
          <div className="relative col-span-2 w-full h-auto">
            <BranchLeft />
          </div>
        </div>
        {/* right side */}
        <div className="col-span-5 grid grid-cols-12">
          {/* vault */}
          <div className="col-span-4 relative">
            <img
              className="relative w-full h-auto object-contain z-10"
              src={VAULT}
            />
            <img
              className="absolute w-full h-auto object-contain bottom-0 scale-125 origin-center z-0"
              src={STAND}
            />
          </div>
          {/* stroke */}
          <div className="col-span-4 w-auto h-1 object-contain scale-x-150 origin-left mb-11 self-end">
            <StrokeHorizontal />
          </div>
          {/* factory */}
          <div className="col-span-4 relative flex flex-col justify-end">
            <img
              className="relative w-full h-auto object-contain z-10"
              src={FACTORY}
            />
          </div>
          {/* reward */}
          <div className="col-span-4 flex flex-col items-center">
            <div className="relative w-1 h-auto flex-1 scale-y-[1.9] origin-top object-contain z-10">
              <StrokeVertical />
            </div>
            <img className="w-full h-auto object-contain z-0" src={REWARD} />
          </div>
          {/* stroke */}
          <div className="col-span-4 w-auto h-1 object-contain scale-x-110 origin-right mb-11 self-end">
            <StrokeHorizontal reverse begin="6s" />
          </div>
          {/* yield resources */}
          <div className="col-span-4 flex flex-col items-center">
            <div className="w-full bg-primary p-6 rounded-2xl">
              <p className="text-xs md:text-sm text-black text-center font-medium">
                Assets are matched with each other to execute the yield
                strategy.
              </p>
            </div>
            <div className="flex-1 relative w-1 h-auto object-contain z-10">
              <StrokeVertical begin="5s" />
            </div>
            <div className="w-full bg-primary p-6 rounded-2xl">
              <p className="text-black font-bold text-center">
                Dex Lending Staking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
