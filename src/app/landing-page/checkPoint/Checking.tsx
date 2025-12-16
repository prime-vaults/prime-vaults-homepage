import { useEffect, useState } from 'react'

import { ChainInfoCheck } from '.'
import PrimeBadge from './PrimeBadge'
import Corner from '@/components/UI/Corner'

import { formatUiNumber, shortenString } from '@/helpers/utils'
import { UserInfoBalance } from '@/app/api/types'

export default function Checking({
  address,
  onDone,
  chainsInfo,
  userInfo,
  onOpenGame,
}: {
  chainsInfo: ChainInfoCheck[]
  userInfo: UserInfoBalance
  address: string
  onDone: () => void
  onOpenGame?: () => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [totalLoading, setTotalLoading] = useState(0)
  const [checking, setChecking] = useState(false)

  // Step 1: Check address
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setCurrentStep(1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  // Step 2: Portfolio analysis - Show coins one by one
  useEffect(() => {
    if (currentStep === 1) {
      const stepTimer = setTimeout(() => {
        setCurrentStep(2)
      }, 7000)

      return () => {
        clearTimeout(stepTimer)
      }
    }
  }, [currentStep])

  // Step 3: Calculate Prima Points
  useEffect(() => {
    if (currentStep === 2) {
      const countInterval = setInterval(() => {
        setChecking(true)
      }, 3000)
      return () => {
        clearInterval(countInterval)
      }
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 2) {
      const loadInterval = setInterval(() => {
        setTotalLoading((p) => (p < 100 ? p + 2 : 100))
      }, 50)
      return () => clearInterval(loadInterval)
    }
  }, [currentStep])

  if (!!checking) {
    return (
      <PrimeBadge
        address={address}
        tvl={userInfo.total_usd_value}
        point={userInfo.points}
        onDone={onDone}
        onOpenGame={onOpenGame}
      />
    )
  }
  return (
    <div className="flex flex-col gap-1 md:gap-2 p-3 md:p-6 h-full">
      {currentStep === 0 && <Step1 address={address} />}
      {currentStep === 1 && <Step2 chainsInfo={chainsInfo} />}
      {currentStep === 2 && <Step3 userInfo={userInfo} />}
      {totalLoading > 0 ? (
        <p className="text-primary-content text-xs mt-8">
          Loading {totalLoading}%
        </p>
      ) : (
        <p className="mt-5 md:mt-8 text-secondary">
          Please hold. Just a moment
        </p>
      )}
    </div>
  )
}

function Step1({ address }: { address: string }) {
  return (
    <div className="flex flex-col gap-2.5 md:gap-4">
      <p>Checking your address</p>
      <div className="relative">
        <div className="rainbow-border min-h-[120px] md:min-h-[200px] flex justify-center items-center bg-repeating border border-primary-content transition-colors animate-fadeIn">
          <h4>{shortenString(address, { maxLength: 6 })}</h4>
        </div>
        <Corner />
      </div>
    </div>
  )
}

function Step2({ chainsInfo }: { chainsInfo: ChainInfoCheck[] }) {
  const [visibleCoins, setVisibleCoins] = useState(0)
  const [visiblePercent, setVisiblePercent] = useState(false)

  useEffect(() => {
    setVisibleCoins(0)
    const coinTimings = chainsInfo.map((_, idx) => (idx + 1) * 700)
    const timers = coinTimings.map((delay) =>
      setTimeout(() => {
        setVisibleCoins((prev) => prev + 1)
      }, delay),
    )

    const percentTimer = setTimeout(() => {
      setVisiblePercent(true)
    }, coinTimings.length * 700 + 1000)

    return () => {
      timers.forEach((t) => clearTimeout(t))
      clearTimeout(percentTimer)
    }
  }, [chainsInfo])

  return (
    <div className="flex flex-col gap-2.5 md:gap-4">
      <p>Analyzing your on-chain portfolio</p>
      <div className="relative">
        <div className="rainbow-border min-h-[120px] md:min-h-[200px] flex flex-row gap-3 md:gap-6 justify-center items-center bg-repeating border border-primary-content transition-colors animate-fadeIn">
          {chainsInfo.map((chain, idx) => (
            <div
              key={idx}
              className={`relative pb-4 md:pb-8 flex flex-col items-center gap-1 md:gap-2 transition-all duration-300 ${
                visibleCoins > idx
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-75'
              }`}
            >
              <img
                src={chain.logo}
                className="w-6 md:w-15 aspect-square rounded-full"
              />
              <span className="text-[10px] md:text-xs">{chain.name}</span>
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ${
                  !!visiblePercent
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-primary-content text-[11px] md:text-base">
                  {formatUiNumber(chain.percent)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <Corner />
      </div>
    </div>
  )
}

function Step3({ userInfo }: { userInfo: UserInfoBalance }) {
  return (
    <div className="flex flex-col gap-2.5 md:gap-4">
      <p>Calculating your Prime Points</p>
      <div className="relative">
        <div className="double-border min-h-[120px] md:min-h-[200px] flex flex-col gap-2.5 md:gap-4 justify-center items-center bg-repeating border border-gray-700 hover:border-green-500/30 transition-colors animate-fadeIn">
          <p>
            Total portfolio:{' '}
            <span>${formatUiNumber(userInfo.total_usd_value)}</span>
          </p>
          <span className="text-3xl md:text-[50px] text-primary-content">
            {formatUiNumber(userInfo.points).toString().replace(/\d/g, '*')}{' '}
            <span className="text-white">P.P</span>
          </span>
        </div>
        <Corner />
      </div>
    </div>
  )
}
