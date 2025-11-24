import BranchRight from './stroke/BranchRight'
import BranchLeft from './stroke/BranchLeft'
import StrokeVertical from './stroke/StrokeVertical'
import StrokeHorizontal from './stroke/StrokeHorizontal'
import StrokeL from './stroke/StrokeL'

import USER from '@/static/images/yield/user.png'
import FACTORY from '@/static/images/yield/factory.png'
import REWARD from '@/static/images/yield/reward.png'
import TOKEN_ETH from '@/static/images/yield/token-eth.png'
import TOKEN_BTC from '@/static/images/yield/token-btc.png'
import TOKEN_BERA from '@/static/images/yield/token-bera.png'
import TOKEN_USDC from '@/static/images/yield/token-usdc.png'
import VAULT from '@/static/images/yield/vault.png'
import STAND from '@/static/images/yield/stand.svg'

const TOKENS = [TOKEN_ETH, TOKEN_BTC, TOKEN_USDC, TOKEN_BERA]

export default function YieldFlowPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <p className="text-2xl md:text-5xl font-black text-primary">
        Prime Yield flow
      </p>

      <div className="col-span-full grid grid-cols-12 pt-12 select-none">
        {/* user */}
        <div className="col-span-1 flex flex-col w-full h-fit justify-center items-center pt-3 md:pt-0 scale-125 md:scale-100 origin-left">
          <img className="w-full md:w-3/4 h-auto object-contain" src={USER} />
        </div>
        {/* branch right */}
        <div className="relative col-span-4 md:col-span-2 w-full h-auto">
          <p className="absolute top-[12%] left-[5%] text-xs text-center">
            Deposit
          </p>
          <BranchRight />
        </div>
        {/* token */}
        <div className="col-span-1 flex flex-col items-center -mt-[65%] md:-mt-[22%]">
          {TOKENS.map((t) => {
            return (
              <img
                className="w-full md:w-[45%] h-auto object-contain"
                src={t}
                key={t}
              />
            )
          })}
          <div className="self-center px-2 py-0.5 border border-base-100 bg-base-200 rounded-md">
            <p className="text-xs text-primary text-center text-nowrap whitespace-nowrap">
              User Vaults
            </p>
          </div>
        </div>
        {/* branch left */}
        <div className="relative col-span-4 md:col-span-2 w-full h-auto">
          <BranchLeft />
        </div>
        {/* vault */}
        <div className="col-span-2 md:col-span-2 relative flex flex-col items-center">
          <div className="absolute w-fit md:w-full top-0 right-0 -translate-y-full px-2 py-0.5 border border-base-100 bg-base-200 rounded-md z-20">
            <p className="text-xs text-primary text-center text-nowrap whitespace-nowrap">
              Unified Asset Vault
            </p>
          </div>
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
        <div className="hidden md:block col-span-2 w-auto h-1 object-contain scale-x-150 origin-left mb-24 self-end">
          <StrokeHorizontal />
        </div>
        {/* factory */}
        <div className="col-span-5 md:col-span-2 relative flex flex-col justify-end items-center">
          <img
            className="relative w-2/3 md:w-full h-auto object-contain z-10"
            src={FACTORY}
          />
          <div className="w-full bg-primary p-2 md:p-6 rounded-2xl">
            <p className="text-xs md:text-sm text-black text-center font-medium">
              Assets are combined to execute unified yield strategies.
            </p>
          </div>
          <div className="block md:hidden col-span-2 md:origin-left self-center">
            <StrokeVertical
              begin="6s"
              className="w-1.5 h-auto object-contain"
            />
          </div>
          <div className="relative flex md:hidden flex-col p-1 md:p-6 gap-1 border border-base-100 bg-base-200 md:border-none md:bg-primary rounded-lg md:rounded-2xl">
            <p className="block md:hidden text-xs text-primary font-bold text-center">
              Yield resources
            </p>
            <div className="w-full bg-primary rounded-lg">
              <p className="text-sm text-black text-center">Yield Protocols</p>
            </div>
          </div>
          {/* stroke */}
          <div className="block md:hidden absolute w-fit h-fit right-0 translate-x-[80%] top-0">
            <StrokeL className="w-[45dvw] h-auto object-contain" />
          </div>
        </div>
        {/* stroke */}
        <div className="relative block md:hidden col-span-2 mb-10 self-end">
          <div className="absolute w-fit h-fit bottom-0 left-0 translate-x-1/12 -translate-y-1/3 z-10">
            <p className="text-xs text-center text-nowrap whitespace-nowrap">
              Generate yield
            </p>
          </div>
          <StrokeHorizontal className="w-auto h-1.5 object-contain" />
        </div>
        {/* offset */}
        <div className="hidden md:block col-span-6" />
        {/* reward */}
        <div className="col-span-5 md:col-span-2 flex flex-col items-end md:items-center">
          <div className="relative flex-1 pr-6 md:pr-0 z-10">
            <StrokeVertical
              reverse
              begin="7s"
              className="hidden md:block w-3 h-auto scale-y-[1.4] origin-[50%_60%] object-contain"
            />
            <StrokeVertical
              reverse
              begin="8s"
              className="block md:hidden w-1.5 h-auto scale-y-[2.7] origin-top object-contain"
            />
            <div className="absolute w-fit h-fit bottom-1/6 md:top-1/2 right-0 -translate-x-1/2 md:translate-x-full z-10">
              <p className="text-xs text-center text-nowrap whitespace-nowrap">
                Redistribute
              </p>
            </div>
          </div>
          <img className="w-full h-auto object-contain z-0" src={REWARD} />
          <div className="self-center px-2 py-0.5 border border-base-100 bg-base-200 rounded-md">
            <p className="text-xs text-primary text-center">Reward vault</p>
          </div>
        </div>
        {/* stroke */}
        <div className="hidden md:block col-span-2 mb-11 self-end">
          <StrokeHorizontal
            reverse
            begin="6s"
            className="w-auto h-3 scale-x-[1.22] origin-[80%_50%] object-contain"
          />
        </div>
        {/* yield resources */}
        <div className="relative hidden md:flex flex-col col-span-2 items-center">
          <div className="absolute w-fit h-fit bottom-[7%] -left-4 -translate-x-full z-10">
            <p className="text-xs text-center">Generate yield</p>
          </div>
          <div className="flex-1 relative z-10">
            <StrokeVertical
              begin="5s"
              className="w-3 h-auto scale-y-[1.35] origin-top object-contain"
            />
          </div>
          <div className="w-full bg-primary px-4 rounded-2xl py-10">
            <p className="text-black font-medium text-center">
              Yield Protocols
            </p>
          </div>
          <div className="self-center px-2 py-0.5 border border-base-100 bg-base-200 rounded-md mt-1">
            <p className="text-xs text-primary text-center">Yield resources</p>
          </div>
        </div>
      </div>
    </div>
  )
}
