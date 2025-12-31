import dayjs from 'dayjs'
import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ArrowRight, ChevronLeft } from 'lucide-react'

import Joining from './Joining'
import PlayGame from './PlayGame'
import CheckPoint from './checkPoint'
import Leaderboard from './Leaderboard'
import Corner from '@/components/UI/Corner'
import JoinClosedBeta from './JoinClosedBeta'

import { CoreRoutes } from '@/constant/router'
import ASSET from '@/static/images/landing-page/asset.png'
import bg from '@/static/images/banner/banner.png'
import { TIME_CLOSED_BETA } from '@/constant'

export default function LandingPage() {
  const nav = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <div
        className="relative flex flex-col p-4 md:p-10 gap-10 md:gap-20 bg-[#121212]"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: '100% 30%',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          onClick={() => nav(CoreRoutes.home())}
          className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-row gap-1 items-center cursor-pointer"
        >
          <ChevronLeft width={24} />
          <p className="font-bold! text-white">Back</p>
        </div>

        <JoinClosedBeta />
        <Joining />
        {/* CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
        <div className="flex flex-col gap-2 md:gap-4 border border-base-100 bg-base-200 p-4 md:p-6">
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
                Deposit BTC, ETH, USDC, or BERA and earn live APY — with rewards
                claimable instantly.
              </p>
              <p>Supported chains: Ethereum, BNB, Arbitrum, Core, Berachain.</p>
            </div>
            <div className="flex flex-col gap-3 md:gap-6 text-secondary">
              <h3 className="text-primary">Early Access and Contribution</h3>
              <p>
                Be among the first to experience the full Smart Saving Account
                flow:
              </p>
              <p>Deposit → Earn → Claim in real time.</p>
              <p>
                Your usage and feedback help refine the product ahead of public
                release.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:gap-6 text-secondary">
              <h3 className="text-primary">Prime Points and Burn-to-Earn</h3>
              <p>
                Closed-Beta participants earn Prime Points earlier and get first
                access to the burn-to-earn system.
              </p>
              <p>
                Burn PP to compete for weekly rewards of up to $1,000, shared by
                the Top 100 users.
              </p>
            </div>
          </div>
        </div>
        {/* leaderboard */}
        <Leaderboard />
      </div>
      <div className="bg-[#121212] px-4 md:px-10">
        <div
          className="pb-4"
          style={{
            background:
              'radial-gradient(26.63% 26.63% at 51.42% 100%, rgba(178, 231, 123, 0.60) 0%, rgba(178, 231, 123, 0.22) 35.1%, rgba(178, 231, 123, 0.00) 100%)',
          }}
        >
          <div className="col-span-full flex flex-col items-center gap-3 pt-4 md:pt-10 text-center">
            <div className="flex md:flex-row flex-col gap-2">
              <h2>
                Closed-Beta opens{' '}
                {dayjs(TIME_CLOSED_BETA).format('MMMM D, YYYY.')}
              </h2>
              <div
                className="rotate-2 px-2.5 py-1 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(90deg, #B2E77B 0%, #FFF 100%)',
                  boxShadow: '4px 4px 0 0 #9BD262',
                }}
              >
                <h3 className="text-black">Mark your calendar !!</h3>
              </div>
            </div>
            <h4>
              Follow us on X and join our Discord to stay updated and be first
              to earn.
            </h4>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="bg-[#121212] items-center p-7 md:p-14 flex flex-row gap-2 md:gap-4 justify-between border-t border-base-100">
        <div className="flex flex-col items-start gap-2">
          <img src="/logo.svg" alt="" className="h-10" />
          <p>Prime Strategies. Best Returns.</p>
          <p>PRIME VAULTS © 2025. All rights reserved.</p>
        </div>
        <div className="flex flex-row gap-3 md:gap-4">
          <div
            className="flex flex-col items-center justify-center w-9 h-9 border border-base-100 cursor-pointer"
            onClick={() =>
              window.open('https://docs.primevaults.finance/', '_blank')
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M9.2728 11.5822C10.3319 12.1934 10.8614 12.4991 11.443 12.4996C12.0245 12.5001 12.5546 12.1954 13.6148 11.586L20.3726 7.70133C20.6777 7.52597 20.8658 7.20092 20.8658 6.84902C20.8658 6.49712 20.6777 6.17206 20.3726 5.9967L13.6123 2.11066C12.5533 1.5019 12.0238 1.19753 11.4428 1.19775C10.8618 1.19798 10.3326 1.50277 9.27402 2.11235L3.46239 5.45906C3.41931 5.48387 3.39778 5.49629 3.3777 5.50803C1.3925 6.67017 0.16598 8.79185 0.14958 11.0921C0.149414 11.1154 0.149414 11.1402 0.149414 11.19C0.149414 11.2396 0.149414 11.2644 0.14958 11.2876C0.165944 13.5854 1.38973 15.705 3.3714 16.8681C3.39142 16.8798 3.41295 16.8923 3.45593 16.9171L7.09632 19.0189C9.21756 20.2437 10.2782 20.856 11.4429 20.8565C12.6076 20.8568 13.6687 20.2452 15.7907 19.0219L19.6336 16.8065C20.6962 16.194 21.2275 15.8877 21.5192 15.3828C21.8109 14.8779 21.8109 14.2647 21.8109 13.0382V10.6689C21.8109 10.3286 21.6267 10.0151 21.3294 9.84951C21.0418 9.68932 20.6912 9.69169 20.4057 9.85577L12.5258 14.3854C11.9971 14.6893 11.7327 14.8413 11.4426 14.8414C11.1525 14.8414 10.8881 14.6896 10.3592 14.3861L5.02588 11.3246C4.75874 11.1713 4.62515 11.0946 4.51785 11.0807C4.27325 11.0492 4.03805 11.1862 3.94487 11.4146C3.90402 11.5147 3.90483 11.6687 3.90649 11.9768C3.90771 12.2035 3.90832 12.3169 3.92951 12.4212C3.97699 12.6548 4.09985 12.8663 4.27927 13.0232C4.35939 13.0933 4.45757 13.15 4.65402 13.2633L10.3562 16.5544C10.8865 16.8604 11.1516 17.0135 11.4427 17.0136C11.7339 17.0136 11.9991 16.8607 12.5295 16.555L19.5187 12.5261C19.6999 12.4217 19.7905 12.3695 19.8584 12.4087C19.9263 12.448 19.9263 12.5525 19.9263 12.7617V13.8363C19.9263 14.143 19.9263 14.2963 19.8534 14.4225C19.7805 14.5487 19.6476 14.6253 19.382 14.7784L13.6172 18.1014C12.5559 18.7132 12.0253 19.0191 11.4428 19.0188C10.8604 19.0185 10.33 18.7122 9.26928 18.0994L3.87586 14.9839C3.85873 14.974 3.85017 14.969 3.84218 14.9644C2.71132 14.3036 2.01354 13.0946 2.00699 11.7849C2.00695 11.7756 2.00695 11.7657 2.00695 11.7459V10.7595C2.00695 10.0364 2.39204 9.36808 3.0176 9.00549C3.57036 8.6851 4.25219 8.68446 4.80555 9.00383L9.2728 11.5822Z"
                fill="#F2F7F7"
              />
            </svg>
          </div>
          <div
            className="flex flex-col items-center justify-center w-9 h-9 border border-base-100 cursor-pointer"
            onClick={() =>
              window.open('https://discord.gg/xBUmTGRns5', '_blank')
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="17"
              viewBox="0 0 24 17"
              fill="none"
            >
              <path
                d="M21.0275 2.45538C19.3762 1.17536 17.3945 0.535385 15.3028 0.428711L14.9725 0.748734C16.844 1.17536 18.4954 2.02868 20.0367 3.20203C18.1651 2.24203 16.0734 1.60206 13.8715 1.38871C13.211 1.28203 12.6605 1.28203 12 1.28203C11.3395 1.28203 10.789 1.28203 10.1285 1.38871C7.9266 1.60206 5.83485 2.24203 3.9633 3.20203C5.50455 2.02868 7.15597 1.17536 9.02752 0.748734L8.69723 0.428711C6.60547 0.535385 4.62383 1.17536 2.97247 2.45538C1.10092 5.86874 0.110092 9.70873 0 13.6553C1.65135 15.362 3.9633 16.4287 6.38535 16.4287C6.38535 16.4287 7.15597 15.5754 7.7064 14.8287C6.27525 14.5087 4.95412 13.762 4.0734 12.5887C4.84403 13.0153 5.61465 13.442 6.38535 13.762C7.37617 14.1887 8.367 14.402 9.35783 14.6154C10.2386 14.722 11.1193 14.8287 12 14.8287C12.8807 14.8287 13.7614 14.722 14.6422 14.6154C15.633 14.402 16.6238 14.1887 17.6147 13.762C18.3854 13.442 19.156 13.0153 19.9266 12.5887C19.0459 13.762 17.7248 14.5087 16.2936 14.8287C16.844 15.5754 17.6147 16.4287 17.6147 16.4287C20.0367 16.4287 22.3486 15.362 24 13.6553C23.8899 9.70873 22.8991 5.86874 21.0275 2.45538ZM8.367 11.7353C7.26608 11.7353 6.27525 10.7753 6.27525 9.60206C6.27525 8.42871 7.26608 7.46871 8.367 7.46871C9.46793 7.46871 10.4587 8.42871 10.4587 9.60206C10.4587 10.7753 9.46793 11.7353 8.367 11.7353ZM15.633 11.7353C14.5321 11.7353 13.5413 10.7753 13.5413 9.60206C13.5413 8.42871 14.5321 7.46871 15.633 7.46871C16.7339 7.46871 17.7248 8.42871 17.7248 9.60206C17.7248 10.7753 16.7339 11.7353 15.633 11.7353Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            className="flex flex-col items-center justify-center w-9 h-9 border border-base-100 cursor-pointer"
            onClick={() => window.open('https://x.com/PrimeVaultsHQ', '_blank')}
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
    </Fragment>
  )
}
