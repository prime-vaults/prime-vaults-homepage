import { Link } from 'react-router'

import { CoreRoutes } from '@/constant/router'
import { useTimeline } from '@/hooks/useTimeline'
import { TIME_CLOSED_BETA } from '@/constant'

export default function JoinClosedBeta() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Link to={CoreRoutes.home()} className="self-center">
        <img className="w-auto h-14 object-contain" src="/logo.svg" />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <span className="text-5xl md:text-[112px] mb-8 md:mb-16">
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
      </div>
      <CoolDown />
    </div>
  )
}

function CoolDown() {
  const { endTime, isEnded } = useTimeline(TIME_CLOSED_BETA)

  if (isEnded) return null
  return (
    <div className="mt-4 md:mt-6 flex flex-col items-center gap-3 md:gap-5">
      <h2 className="text-secondary">Closed-Beta Starts In</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center min-w-[60px] md:[min-w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.days()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center min-w-[60px] md:min-w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.hours()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center min-w-[60px] md:min-w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.minutes()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center min-w-[60px] md:min-w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.seconds()}</h2>
          </div>
        </div>
        <div className="flex flex-row justify-between px-4">
          <h4>Days</h4>
          <h4>Hours</h4>
          <h4>Mins</h4>
          <h4>Secs</h4>
        </div>
      </div>
      <h5 className="text-center md:text-start px-8 md:px-0">
        Deposit within the first{' '}
        <span className="text-primary-content">48 hours</span> of the
        Closed-Beta to secure your spot. <br />
        Access is limited to{' '}
        <span className="text-primary-content">whitelisted</span> wallets, with{' '}
        <span className="text-primary-content">high APY</span> and{' '}
        <span className="text-primary-content">capped capacity.</span>
      </h5>
    </div>
  )
}
