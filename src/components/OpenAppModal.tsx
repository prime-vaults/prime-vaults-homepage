import { useNavigate } from 'react-router'
import { ArrowUpRight, X } from 'lucide-react'
import React, { Fragment, useCallback, useState } from 'react'

import Modal from './UI/Modal'
import Button from './UI/Button'

import { useTimeline } from '@/hooks/useTimeline'
import { APP_LINK, TIME_CLOSED_BETA } from '@/constant'
import { CoreRoutes } from '@/constant/router'

export default function OpenAppModal({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const { endTime, isEnded } = useTimeline(TIME_CLOSED_BETA)
  const nav = useNavigate()

  const handleOpen = useCallback(() => {
    if (!isEnded) return setOpen(true)
    return window.open(APP_LINK, '_blank')
  }, [isEnded])

  return (
    <Fragment>
      <div className="p-0!" onClick={handleOpen}>
        {children}
      </div>

      {open && (
        <Modal open boxClassName="md:min-w-[600px]">
          <div className="flex flex-col">
            <div className="flex flex-row py-1 md:py-2 px-2 md:px-4 items-center w-full justify-between">
              <img src="/logo.svg" className="w-auto h-12 object-contain" />
              <X
                className="cursor-pointer"
                size={24}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex flex-col gap-3 md:gap-5 px-7 md:px-15 py-5 md:py-10">
              <h2>Closed-Beta Starts In</h2>
              <div className="flex flex-col gap-2 w-fit">
                <div className="flex flex-row gap-2 items-center">
                  <div
                    className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[50px] md:w-[80px]"
                    style={{ boxShadow: '3px 3px 0 #FFF' }}
                  >
                    <h2 className="text-black">{endTime.days()}</h2>
                  </div>{' '}
                  <h2>:</h2>
                  <div
                    className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[50px] md:w-[80px]"
                    style={{ boxShadow: '3px 3px 0 #FFF' }}
                  >
                    <h2 className="text-black">{endTime.hours()}</h2>
                  </div>{' '}
                  <h2>:</h2>
                  <div
                    className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[50px] md:w-[80px]"
                    style={{ boxShadow: '3px 3px 0 #FFF' }}
                  >
                    <h2 className="text-black">{endTime.minutes()}</h2>
                  </div>{' '}
                  <h2>:</h2>
                  <div
                    className="bg-primary px-4 py-1 md:py-2 flex justify-center w-[50px] md:w-[80px]"
                    style={{ boxShadow: '3px 3px 0 #FFF' }}
                  >
                    <h2 className="text-black">{endTime.seconds()}</h2>
                  </div>
                </div>
                <div className="flex flex-row justify-between px-2 md:px-4">
                  <h4>Days</h4>
                  <h4>Hours</h4>
                  <h4>Mins</h4>
                  <h4>Secs</h4>
                </div>
              </div>
              <p className="mt-3 md:mt-5">
                Register your wallet now to secure early access.
                <br /> <br />
                Limited-time Closed-Beta with high APY and capped pools.
              </p>

              <Button
                className="mt-5 md:mt-10 btn btn-primary text-black w-full"
                onClick={() => nav(CoreRoutes.landing())}
              >
                Register Now <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  )
}
