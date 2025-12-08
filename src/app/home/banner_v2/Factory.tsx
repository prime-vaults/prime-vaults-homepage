import WrappedTokenPath from './TokenPath'

import AURA_1 from '@/static/images/intro/factory/aura-1.png'
import BOX_A from '@/static/images/intro/factory/box-a.png'
import BOX_B from '@/static/images/intro/factory/box-b.png'
import CHART_1 from '@/static/images/intro/factory/chart1.png'
import CHART_2 from '@/static/images/intro/factory/chart2.png'
import SECURITY from '@/static/images/intro/factory/security.png'
import FAQ from '@/static/images/intro/factory/faq.png'
import STAND from '@/static/images/intro/factory/stand.png'
import PIPE_LINE from '@/static/images/intro/factory/pipe-line.svg'
import TOKENS from '@/static/images/intro/factory/tokens.png'

export default function Factory() {
  return (
    <div className="flex flex-row gap-4 md:justify-between -mt-16 md:-mt-40">
      <div className="relative flex-1">
        <div className="absolute top-0 left-0 w-full flex flex-col md:gap-2 text-base md:text-5xl font-medium md:font-bold uppercase px-4 md:px-10 pt-8 z-20">
          <h2 className="text-primary">
            Your assets stay fully non-custodial.
          </h2>
          <h2>And your rewards stay above the market rate.</h2>
        </div>
      </div>
      {/* factory */}
      <div className="relative w-fit flex flex-col items-center px-6 pb-28 md:pb-72 pointer-events-none select-none">
        {/* box */}
        <div className="relative w-fit h-fit flex flex-col items-center">
          <img
            src={BOX_A}
            className="relative w-[20dvw] h-auto object-contain bouncing z-30"
          />
          <img
            src={BOX_B}
            className="absolute w-full h-full top-0 left-0 object-contain bouncing z-10"
          />
          <img
            src={CHART_1}
            className="absolute w-auto h-3/4 top-0 left-0 -translate-x-1/2 -translate-y-1/3 object-contain bouncing z-0"
            style={{ animationDelay: '600ms' }}
          />
          <img
            src={FAQ}
            className="absolute w-auto h-3/4 top-0 right-0 translate-x-1/2 -translate-y-1/3 object-contain bouncing z-0"
            style={{ animationDelay: '600ms' }}
          />
          <img
            src={CHART_2}
            className="absolute w-auto h-3/4 bottom-0 left-0 -translate-x-1/2 translate-y-1/3 object-contain bouncing z-50"
            style={{ animationDelay: '600ms' }}
          />
          <img
            src={SECURITY}
            className="absolute w-auto h-3/4 bottom-0 right-0 translate-x-1/2 translate-y-1/3 object-contain bouncing z-50"
            style={{ animationDelay: '600ms' }}
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
              <img
                className="absolute bottom-0 left-0 translate-y-1/2 w-1/6 h-auto object-contain z-10"
                src={TOKENS}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
