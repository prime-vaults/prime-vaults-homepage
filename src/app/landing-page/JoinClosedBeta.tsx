import { X } from 'lucide-react'
import { Link } from 'react-router'
import { Fragment, useState } from 'react'

import Modal from '@/components/UI/Modal'
import SubmitWallet from './SubmitWallet'

import { CoreRoutes } from '@/constant/router'
import { useTimeline } from '@/hooks/useTimeline'
import { TIME_CLOSED_BETA } from '@/constant'

export default function JoinClosedBeta() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <Link to={CoreRoutes.home()} className="self-center">
        <img className="w-auto h-14 object-contain" src="/logo.svg" />
      </Link>
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-5xl md:text-[112px] mb-8 md:mb-16">
          Be First to Earn
        </span>
        <h3 className="font-normal!">
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
            className="bg-primary px-4 py-1 md:py-2 flex justify-center min-w-[52px] md:w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.days()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[52px] md:w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.hours()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[52px] md:w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.minutes()}</h2>
          </div>{' '}
          <h2>:</h2>
          <div
            className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[52px] md:w-[80px]"
            style={{ boxShadow: '3px 3px 0 #FFF' }}
          >
            <h2 className="text-black">{endTime.seconds()}</h2>
          </div>
        </div>
        <div className="flex flex-row justify-between pl-3 pr-1.5 md:px-4">
          <h4>Days</h4>
          <h4>Hours</h4>
          <h4>Mins</h4>
          <h4>Secs</h4>
        </div>
      </div>
      <div className="flex flex-col text-center md:text-start px-8 md:px-0">
        <h5>
          Deposit within the first{' '}
          <span className="text-primary-content">48 hours</span> of the
          Closed-Beta to secure your spot.{' '}
        </h5>
        <div className="flex flex-col md:flex-row gap-1">
          <h5>
            Access is limited to{' '}
            <span className="text-primary-content">whitelisted</span> wallets,
            with <span className="text-primary-content">high APY</span> and{' '}
            <span className="text-primary-content">capped capacity.</span>
          </h5>
          <JoinNowModal />
        </div>
      </div>
    </div>
  )
}

function JoinNowModal() {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <h5
        className="text-primary-content cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Join now!
      </h5>

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          boxClassName="min-w-[360px] md:min-w-[600px]"
        >
          <div className="flex flex-col p-4">
            <div className="flex flex-row items-center justify-between">
              <img
                className="w-auto h-6 md:h-10 object-contain"
                src="/logo.svg"
              />
              <X
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(false)
                }}
              />
            </div>
            <SubmitWallet onClose={() => setOpen(false)} />
          </div>
        </Modal>
      )}
    </Fragment>
  )
}
