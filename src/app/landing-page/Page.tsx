import { Fragment, useState } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'

import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'
import Corner from '@/components/UI/Corner'
import Modal from '@/components/UI/Modal'
import GamePage from '../home/game/Page'

import { CoreRoutes } from '@/constant/router'

import ASSET from '@/static/images/landing-page/asset.png'
import GAME from '@/static/images/landing-page/game.png'

export default function LandingPage() {
  const [start, setStart] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Container innerClassName="border-none">
        <div className="flex flex-col p-4 gap-4 md:gap-6">
          <Link to={CoreRoutes.home()} className="self-center">
            <img className="w-auto h-14 object-contain" src="/logo.svg" />
          </Link>
          <div className="flex flex-col gap-1 items-center justify-center">
            <p className="text-3xl md:text-7xl mb-6 md:mb-12">
              Be First to Earn
            </p>
            <span className="max-w-md text-sm md:text-2xl text-center">
              Experience an on-chain smart saving account with{' '}
              <b className="text-sm md:text-2xl text-primary">
                Principal Protection and a Guaranteed Minimum Yield.
              </b>
            </span>
            <span className="text-sm md:text-2xl">
              Real APY and rewards are claimable instantly.
            </span>
            <p className="text-sm md:text-2xl mt-4 md:mt-6">
              Limited time. Join now.
            </p>
          </div>
          {/* CTA */}
          <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 cursor-pointer group/point">
              <Corner />
              <div className="absolute top-0 left-0 w-0 group-hover/point:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
              <img
                className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[999]"
                src={ASSET}
              />
              <div className="col-span-3 flex flex-col">
                <p className="text-2xl md:text-4xl">Check Your Points</p>
                <span className="text-primary cursor-pointer">
                  You might be surprised
                </span>
              </div>
            </div>
            {/* Game */}
            <div
              className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 group/game cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Corner />
              <div className="absolute top-0 left-0 w-0 group-hover/game:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
              <img
                className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[999]"
                src={GAME}
              />
              <div className="col-span-3 flex flex-col">
                <p className="text-2xl md:text-4xl">Play game</p>
                <span className="text-primary cursor-pointer">
                  A hidden hint inside
                </span>
              </div>
            </div>
          </div>
          {/* close beta */}
          <div className="mt-12 md:mt-24 flex flex-col border border-base-100 bg-base-200 p-4 md:p-6 bg-repeating">
            <p className="text-xl">Prime Vaults Closed-Beta</p>
            <span className="text-secondary">
              A limited-time, limited-slot early access phase where you can test
              Prime Vaults and earn real rewards.
            </span>
            <div className="mt-6 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10">
              <p className="col-span-full text-xl">Why Join the Closed-Beta</p>
              <div className="flex flex-col gap-6 text-secondary">
                <p className="text-2xl text-primary">Higher Real Yield</p>
                <span>
                  Closed-Beta has capped capacity, which means higher APY for
                  early users.
                </span>
                <span>
                  Deposit BTC, ETH, USDC, or BERA and earn live APY — with
                  rewards claimable instantly.
                </span>
                <span>Supported chains: Core, Arbitrum, BNB, Berachain</span>
              </div>
              <div className="flex flex-col gap-6 text-secondary">
                <p className="text-2xl text-primary">
                  Early Access and Contribution.
                </p>
                <span>
                  Be among the first to experience the full Smart Saving Account
                  flow:
                </span>
                <span>Deposit → Earn → Claim in real time.</span>
                <span>
                  Your usage and feedback help refine the product ahead of
                  public release
                </span>
              </div>
              <div className="flex flex-col gap-6 text-secondary">
                <p className="text-2xl text-primary">
                  Prime Points and Burn-to-Earn
                </p>
                <span>
                  Closed-Beta participants earn Prime Points earlier and get
                  first access to the burn-to-earn system.
                </span>
                <span>
                  Burn PP to compete for weekly rewards of up to $1,000, shared
                  by the Top 100 users.
                </span>
              </div>
            </div>
            <p></p>
          </div>
          {/* footer */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs md:text-sm">Submit your wallet</span>
              <label className="input !outline-none !bg-[transparent] border-base-100">
                <input type="text" required placeholder="Wallet address" />
                <Button className="btn btn-primary btn-xs">Submit</Button>
              </label>
            </div>
            <div className="flex flex-row gap-4">
              <a
                href="#"
                className="flex flex-col items-center justify-center w-9 h-9 border border-base-100"
              >
                <svg
                  width="24"
                  height="16"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0275 2.02667C19.3762 0.746649 17.3945 0.106674 15.3028 0L14.9725 0.320023C16.844 0.746648 18.4954 1.59997 20.0367 2.77332C18.1651 1.81332 16.0734 1.17335 13.8715 0.959997C13.211 0.853323 12.6605 0.853323 12 0.853323C11.3395 0.853323 10.789 0.853323 10.1285 0.959997C7.9266 1.17335 5.83485 1.81332 3.9633 2.77332C5.50455 1.59997 7.15597 0.746648 9.02752 0.320023L8.69723 0C6.60547 0.106674 4.62383 0.746649 2.97247 2.02667C1.10092 5.44003 0.110092 9.28002 0 13.2266C1.65135 14.9333 3.9633 16 6.38535 16C6.38535 16 7.15597 15.1467 7.7064 14.4C6.27525 14.08 4.95412 13.3333 4.0734 12.16C4.84403 12.5866 5.61465 13.0133 6.38535 13.3333C7.37617 13.76 8.367 13.9733 9.35783 14.1867C10.2386 14.2933 11.1193 14.4 12 14.4C12.8807 14.4 13.7614 14.2933 14.6422 14.1867C15.633 13.9733 16.6238 13.76 17.6147 13.3333C18.3854 13.0133 19.156 12.5866 19.9266 12.16C19.0459 13.3333 17.7248 14.08 16.2936 14.4C16.844 15.1467 17.6147 16 17.6147 16C20.0367 16 22.3486 14.9333 24 13.2266C23.8899 9.28002 22.8991 5.44003 21.0275 2.02667ZM8.367 11.3066C7.26608 11.3066 6.27525 10.3466 6.27525 9.17335C6.27525 8 7.26608 7.04 8.367 7.04C9.46793 7.04 10.4587 8 10.4587 9.17335C10.4587 10.3466 9.46793 11.3066 8.367 11.3066ZM15.633 11.3066C14.5321 11.3066 13.5413 10.3466 13.5413 9.17335C13.5413 8 14.5321 7.04 15.633 7.04C16.7339 7.04 17.7248 8 17.7248 9.17335C17.7248 10.3466 16.7339 11.3066 15.633 11.3066Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center w-9 h-9 border border-base-100"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.96942 0C4.46483 0 0 4.46483 0 9.96942C0 14.3731 2.87462 18.104 6.78899 19.4495C7.27829 19.5107 7.46177 19.2049 7.46177 18.9602C7.46177 18.7156 7.46177 18.104 7.46177 17.2477C4.70948 17.8593 4.09786 15.9021 4.09786 15.9021C3.66972 14.7401 2.99694 14.4343 2.99694 14.4343C2.07951 13.8226 3.0581 13.8226 3.0581 13.8226C4.0367 13.8838 4.58716 14.8624 4.58716 14.8624C5.50459 16.3914 6.91131 15.9633 7.46177 15.7187C7.52294 15.0459 7.82875 14.6177 8.07339 14.3731C5.87156 14.1284 3.5474 13.2722 3.5474 9.41896C3.5474 8.31804 3.91437 7.46177 4.58716 6.72783C4.52599 6.54434 4.15902 5.50459 4.70948 4.15902C4.70948 4.15902 5.56575 3.91437 7.46177 5.19878C8.25688 4.95413 9.11315 4.89297 9.96942 4.89297C10.8257 4.89297 11.682 5.01529 12.4771 5.19878C14.3731 3.91437 15.2294 4.15902 15.2294 4.15902C15.7798 5.50459 15.4128 6.54434 15.3517 6.78899C15.9633 7.46177 16.3914 8.37921 16.3914 9.48012C16.3914 13.3333 14.0673 14.1284 11.8654 14.3731C12.2324 14.6789 12.5382 15.2905 12.5382 16.208C12.5382 17.5535 12.5382 18.5933 12.5382 18.9602C12.5382 19.2049 12.7217 19.5107 13.211 19.4495C17.1865 18.104 20 14.3731 20 9.96942C19.9388 4.46483 15.474 0 9.96942 0Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="flex flex-col items-center justify-center w-9 h-9 border border-base-100"
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
              </a>
            </div>
          </div>
        </div>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="game-modal">
          <div
            className={clsx('game-mask p-4', {
              starting: start,
            })}
          >
            <img src="/logo.svg" className="w-auto h-14 object-contain" />
            <div className="flex-1 flex flex-col gap-4 md:gap-6 px-4 md:px-6 py-6 md:py-12">
              <p className="text-xl md:text-4xl font-medium">Yield Game</p>
              <span>Connect the pipes and fill the liquid to 100%.</span>
              <span>
                Hit <b className="text-primary">Run Flow</b> when you’re done
              </span>
            </div>
            <div className="flex flex-col gap-2 px-4 md:px-6">
              <Button
                className="btn btn-primary btn-block"
                onClick={() => setStart(true)}
              >
                Start game
              </Button>
              <Button
                className="btn btn-outline btn-block"
                onClick={() => setOpen(false)}
              >
                Later
              </Button>
            </div>
          </div>
          <GamePage onLeave={() => setOpen(false)} />
        </div>
      </Modal>
    </Fragment>
  )
}
