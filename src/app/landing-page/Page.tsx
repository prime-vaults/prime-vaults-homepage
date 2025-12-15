import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowRight, ChevronLeft } from 'lucide-react'

import PlayGame from './PlayGame'
import CheckPoint from './checkPoint'
import IntroPage from '../home/intro/Page'
import Corner from '@/components/UI/Corner'
import Container from '@/components/UI/Container'

import { CoreRoutes } from '@/constant/router'
import ASSET from '@/static/images/landing-page/asset.png'

export default function LandingPage() {
  const nav = useNavigate()

  return (
    <Fragment>
      <Container innerClassName="border-none">
        <IntroPage introKey={'intro-landing'} />
        <div className="relative flex flex-col p-4 gap-4 md:gap-6">
          <div
            onClick={() => nav(CoreRoutes.home())}
            className="absolute top-4 left-4 flex flex-row gap-1 items-center cursor-pointer"
          >
            <ChevronLeft width={24} />
            <p className="font-bold! text-white">Back</p>
          </div>
          <Link to={CoreRoutes.home()} className="self-center">
            <img className="w-auto h-14 object-contain" src="/logo.svg" />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl md:text-[112px] mb-6 md:mb-12">
              Be First to Earn
            </span>
            <h3 className="text-center font-normal!">
              Experience an on-chain smart saving account with <br />
              <span className="text-primary">
                Principal Protection and a Guaranteed Minimum Yield.
              </span>
            </h3>
            <h3 className="font-normal!">
              Real APY and rewards are claimable instantly.
            </h3>
            <div className="mt-4 md:mt-6 flex flex-row gap-2">
              <h3 className="font-normal!">Limited time.</h3>
              <CheckPoint>
                <h3 className="text-primary cursor-pointer">Join now.</h3>
              </CheckPoint>
            </div>
          </div>
          {/* CTA */}
          <div className="mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <CheckPoint>
              <div className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 cursor-pointer group/point">
                <Corner />
                <div className="absolute top-0 left-0 w-0 group-hover/point:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
                <img
                  className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[99]"
                  src={ASSET}
                />
                <div className="col-span-3 flex flex-col gap-1 md:gap-3">
                  <span className="text-3xl md:text-[40px] font-bold">
                    Check Your Points
                  </span>
                  <div className="flex flex-row gap-2 items-center">
                    <h5 className="text-primary cursor-pointer uppercase">
                      You might be surprised
                    </h5>
                    <ArrowRight className="text-primary-content w-5 md:w-8" />
                  </div>
                </div>
              </div>
            </CheckPoint>
            <PlayGame />
          </div>
          {/* close beta */}
          <div className="mt-12 md:mt-24 flex flex-col gap-2 md:gap-4 border border-base-100 bg-base-200 p-4 md:p-6">
            <h4>Prime Vaults Closed-Beta</h4>
            <p className="text-secondary">
              A limited-time, limited-slot early access phase where you can test
              Prime Vaults and earn real rewards.
            </p>
            <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10">
              <h4 className="col-span-full">Why Join the Closed-Beta</h4>
              <div className="flex flex-col gap-3 md:gap-6 text-secondary">
                <h3 className="text-primary">Higher Real Yield</h3>
                <p>
                  Closed-Beta has capped capacity, which means higher APY for
                  early users.
                </p>
                <p>
                  Deposit BTC, ETH, USDC, or BERA and earn live APY — with
                  rewards claimable instantly.
                </p>
                <p>
                  Supported chains: Ethereum, BNB, Arbitrum, Core, Berachain.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 text-secondary">
                <h3 className="text-primary">Early Access and Contribution</h3>
                <p>
                  Be among the first to experience the full Smart Saving Account
                  flow:
                </p>
                <p>Deposit → Earn → Claim in real time.</p>
                <p>
                  Your usage and feedback help refine the product ahead of
                  public release.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 text-secondary">
                <h3 className="text-primary">Prime Points and Burn-to-Earn</h3>
                <p>
                  Closed-Beta participants earn Prime Points earlier and get
                  first access to the burn-to-earn system.
                </p>
                <p>
                  Burn PP to compete for weekly rewards of up to $1,000, shared
                  by the Top 100 users.
                </p>
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-between">
            <div />
            <div className="flex flex-row gap-4">
              <div
                className="flex flex-col items-center justify-center w-9 h-9 border border-base-100 cursor-pointer"
                onClick={() =>
                  window.open('https://x.com/PrimeVaultsHQ', '_blank')
                }
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.905 8.46953L19.3512 0H17.5869L11.1184 7.35244L5.95583 0H0L7.80863 11.1192L0 20H1.76429L8.59099 12.2338L14.0442 20H20L11.905 8.46953ZM9.48775 11.2168L8.69536 10.1089L2.40053 1.30146H5.11084L10.1925 8.41196L10.9815 9.51988L17.5861 18.7619H14.8758L9.48775 11.2168Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  )
}
