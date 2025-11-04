import Factory from './Factory'
import River from './River'

import VAULT_B from '@/static/images/intro/factory/vault-b.png'
import VAULT_T from '@/static/images/intro/factory/vault-t.png'
import BTC from '@/static/images/intro/factory/btc.png'
import ETH from '@/static/images/intro/factory/eth.png'
import COG from '@/static/images/intro/factory/cog.png'
import USD from '@/static/images/intro/factory/usd.png'

export default function BannerV2Page() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-base-300 transition-all z-[999]">
      <div className="relative w-fit h-fit flex flex-col items-center justify-center mt-16 ml-24">
        <div className="flex flex-col">
          <img
            className="relative w-44 h-auto object-contain z-0"
            src={VAULT_T}
          />
          <img
            className="relative w-44 h-auto object-contain z-10"
            src={VAULT_B}
          />
        </div>
        <img
          className="absolute w-1/2 h-auto object-contain animate-spin z-20"
          style={{ animationTimingFunction: 'steps(5, end)' }}
          src={COG}
        />
        <div className="absolute -top-[50%] left-0 w-1/4 z-0">
          <img
            className="w-full h-auto object-contain animate-bounce"
            style={{
              offsetPath: 'path("M0,0 Q60,30 90,140")',
              offsetRotate: 'auto',
              animation: 'move 2s cubic-bezier(0.55, 0.05, 0.45, 0.9) infinite',
            }}
            src={BTC}
          />
        </div>
        <div className="absolute w-1/4 -top-[50%] left-1/2 -translate-x-1/2 h-fit z-0">
          <img
            className="w-full h-auto object-contain animate-bounce"
            style={{
              offsetPath: 'path("M25,0 Q30,20 20,140")',
              offsetRotate: 'auto',
              animation: 'move 2s cubic-bezier(0.25, 0.85, 0.45, 1) infinite',
            }}
            src={USD}
          />
        </div>
        <div className="absolute w-1/4 -top-[50%] right-[20%] h-fit z-0">
          <img
            className="w-full h-auto object-contain animate-bounce"
            style={{
              offsetPath: 'path("M40,0 Q10,40 0,140")',
              offsetRotate: 'auto',
              animation: 'move 2.5s cubic-bezier(0.25, 0.85, 0.45, 1) infinite',
            }}
            src={ETH}
          />
        </div>
      </div>
      <div className="absolute left-[4%] w-full md:w-3/4 h-auto object-contain z-0">
        <River />
      </div>
      <Factory />
    </div>
  )
}
