import USER from '@/static/images/yield/user.png'
import FACTORY from '@/static/images/yield/factory.png'
import REWARD from '@/static/images/yield/reward.png'
import TOKEN from '@/static/images/yield/token.png'
import VAULT from '@/static/images/yield/vault.png'
import LINE_1 from '@/static/images/yield/line-1.svg'
import LINE_2 from '@/static/images/yield/line-2.svg'
import LINE_3 from '@/static/images/yield/line-3.svg'
import LINE_5 from '@/static/images/yield/line-5.svg'
import STAND from '@/static/images/yield/stand.svg'

export default function YieldFlowPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <p className="text-2xl md:text-5xl font-black text-primary">
        Prime Yield flow
      </p>
      <div className="grid grid-cols-12 pointer-events-none select-none">
        {/* left side */}
        <div className="col-span-7 grid grid-cols-6 pt-12">
          <div className="col-span-1 flex flex-col w-full h-fit justify-center items-center">
            <img className="w-3/4 h-auto object-contain" src={USER} />
          </div>
          <img
            className="col-span-2 w-full h-auto object-contain"
            src={LINE_1}
          />
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
          <img
            className="col-span-2 w-full h-auto object-contain"
            src={LINE_2}
          />
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
          <img
            className="col-span-4 w-auto h-1 object-contain scale-x-150 origin-left mb-11 self-end"
            src={LINE_3}
          />
          {/* factory */}
          <div className="col-span-4 relative flex flex-col justify-end">
            <img
              className="relative w-full h-auto object-contain z-10"
              src={FACTORY}
            />
          </div>
          {/* reward */}
          <div className="col-span-4 flex flex-col items-center">
            <img
              className="relative w-1 h-auto flex-1 scale-y-[1.9] object-contain z-10"
              src={LINE_5}
            />
            <img className="w-full h-auto object-contain z-0" src={REWARD} />
          </div>
          {/* stroke */}
          <img
            className="col-span-4 w-auto h-1 object-contain scale-x-125 origin-left mb-11 self-end"
            src={LINE_3}
          />
          {/* yield resources */}
          <div className="col-span-4 flex flex-col items-center">
            <div className="w-full bg-primary p-6 rounded-2xl">
              <p className="text-black text-center font-medium">
                Assets are matched with each other to execute the yield
                strategy.
              </p>
            </div>
            <img
              className="flex-1 relative w-1 h-auto object-contain z-10"
              src={LINE_5}
            />
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
