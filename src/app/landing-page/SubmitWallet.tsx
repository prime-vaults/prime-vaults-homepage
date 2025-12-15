import clsx from 'clsx'
import { Hex, isAddress, isAddressEqual } from 'viem'
import { useCallback, useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'

import Button from '@/components/UI/Button'

import { supabase } from '../api/supabase'
import { shortenString } from '@/helpers/utils'

import x from '@/static/images/logo/x.svg'
import discord from '@/static/images/logo/discord.svg'

type Props = {
  onClose: () => void
  address?: string
  onOpenGame?: () => void
  onReset?: () => void
}

export default function SubmitWallet(props: Props) {
  const { address, onReset } = props
  const [registeredAddress, setRegisteredAddress] = useState(address)
  const [input, setInput] = useState(address || '')
  const [error, setError] = useState('')
  const [isDone, setIsDone] = useState(false)

  const pasteInput = async () => {
    const text = await navigator.clipboard.readText()
    setInput(text)
  }

  const onSubmit = useCallback(async () => {
    try {
      if (!input || !isAddress(input)) throw new Error('Invalid address')
      const { data, error } = await supabase
        .from('whitelist_wallets')
        .insert([{ wallet_address: input.toLowerCase() }])
        .select()
      if (error) {
        setRegisteredAddress(input)
        setInput('')
        throw new Error(error.message)
      }
      console.log('data', data)
      return setIsDone(true)
    } catch (error: any) {
      console.log('error', error.message)
      setError('Registered wallet address found.')
    }
  }, [input])

  if (!!isDone) return <RegisteredWallet {...props} />
  if (!!error)
    return (
      <div className="flex flex-col p-4 md:p-10">
        <h2>Register Your Wallet Address</h2>
        <p className="mt-2 md:mt-4">
          Paste the wallet address you want to use for the Closed-Beta
        </p>
        <div className="mt-2 md:mt-4 flex flex-row items-center gap-2 border border-[#1465B4] bg-[#061E36] rounded px-3 py-2">
          <Info className="text-[#53A1EB]" size={20} />
          <p className="font-normal!">{error}</p>
        </div>
        <div className="mt-3 md:mt-5 flex flex-col gap-3 md:gap-5">
          <div className="flex flex-row items-center gap-3 md:gap-6 px-2.5 md:px-4">
            <Icon1 />
            <p className="w-full flex flex-row justify-between p-3 bg-[#121212]">
              <p>Registered wallet</p>
              <p className="text-secondary">
                {shortenString(registeredAddress || '', { maxLength: 5 })}
              </p>
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 md:gap-6 px-2.5 md:px-4">
            <div className="w-5 h-5 border border-base-100 rounded-full aspect-square" />
            <div className="flex flex-row items-center gap-2 w-full">
              <input
                placeholder="Paste your address here"
                className="input w-full! bg-transparent flex-1 outline-none! border! border-secondary!"
                value={input}
                onChange={({ target }) => setInput(target.value)}
              />

              <Button
                onClick={pasteInput}
                className="btn bg-transparent border border-secondary"
              >
                Paste
              </Button>
            </div>
          </div>
          {!!input && !isAddress(input) && (
            <span className="ml-11 md:ml-14 -mt-2 md:-mt-4 text-xs text-error">
              Invalid wallet address
            </span>
          )}
          <p
            className="text-[#878787] pl-11 md:pl-14 cursor-pointer"
            onClick={() => !!onReset && onReset()}
          >
            Switching wallets? Check your Prime Points again.
          </p>
        </div>
        <Button
          className="mt-8 md:mt-12 btn btn-primary"
          onClick={onSubmit}
          disabled={!isAddress(input) || isAddressEqual(input, address as Hex)}
        >
          Register
        </Button>
      </div>
    )
  return (
    <div className="flex flex-col gap-2 md:gap-4 p-5 md:p-10">
      <h2>Register Your Wallet Address</h2>
      <p>Paste the wallet address you want to use for the Closed-Beta</p>
      <div className="mt-3 md:mt-5 flex flex-row items-center gap-2">
        <input
          placeholder="Paste your address here"
          className="input bg-transparent flex-1 outline-none! border! border-secondary!"
          value={address ? address : input}
          onChange={({ target }) => setInput(target.value)}
        />
        <Button
          onClick={pasteInput}
          className="btn bg-transparent border border-secondary"
        >
          Paste
        </Button>
      </div>
      {!!input && !isAddress(input) && (
        <span className="-mt-4 md:-mt-9 text-xs text-error">
          Invalid wallet address
        </span>
      )}
      <Button
        className="mt-12 md:mt-24 btn btn-primary"
        disabled={!isAddress(input)}
        onClick={onSubmit}
      >
        Register
      </Button>
    </div>
  )
}

function RegisteredWallet({ onClose, onOpenGame }: Props) {
  return (
    <div className="flex flex-col gap-5 p-10">
      <IconDone />
      <h2>Wallet registered successfully</h2>
      <p>
        Your wallet is whitelisted for the Closed-Beta.
        <br /> <br />{' '}
        <span className="text-secondary">
          Come back on January 6, 2026 to begin depositing.
        </span>
      </p>
      <div className="flex flex-row gap-4">
        <div className="p-2 bg-black border border-base-100">
          <img src={discord} className="w-6  aspect-square" />
        </div>
        <div className="p-2 bg-black border border-base-100">
          <img src={x} className="w-6  aspect-square" />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mt-4">
        <Button
          className={clsx('btn btn-primary w-full', {
            'bg-white! w-1/2!': !!onOpenGame,
          })}
          onClick={onClose}
        >
          Done
        </Button>
        {!!onOpenGame && (
          <Button className="btn btn-primary w-1/2" onClick={onOpenGame}>
            Let’s play game <ArrowRight size={20} />
          </Button>
        )}
      </div>
    </div>
  )
}

function Icon1() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <rect x="3" y="3" width="14" height="14" rx="7" fill="#121212" />
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        rx="7"
        stroke="#7DA256"
        stroke-width="6"
      />
      <circle cx="10" cy="10" r="4" fill="#121212" />
    </svg>
  )
}
function IconDone() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
    >
      <g clip-path="url(#clip0_3744_113308)">
        <path
          d="M30 0C24.0666 0 18.2664 1.75947 13.3329 5.05591C8.39943 8.35235 4.55426 13.0377 2.28363 18.5195C0.0129985 24.0013 -0.581101 30.0333 0.576455 35.8527C1.73401 41.6721 4.59123 47.0176 8.78681 51.2132C12.9824 55.4088 18.3279 58.266 24.1473 59.4235C29.9667 60.5811 35.9987 59.987 41.4805 57.7164C46.9623 55.4457 51.6476 51.6006 54.9441 46.6671C58.2405 41.7336 60 35.9334 60 30C59.9916 22.0461 56.8282 14.4203 51.2039 8.79607C45.5797 3.1718 37.9539 0.00839948 30 0ZM43.1712 24.7096L27.0173 40.8635C26.803 41.078 26.5485 41.2482 26.2683 41.3644C25.9882 41.4805 25.6879 41.5403 25.3846 41.5403C25.0814 41.5403 24.7811 41.4805 24.5009 41.3644C24.2208 41.2482 23.9663 41.078 23.7519 40.8635L16.8289 33.9404C16.3958 33.5074 16.1526 32.9201 16.1526 32.3077C16.1526 31.6953 16.3958 31.108 16.8289 30.675C17.2619 30.242 17.8492 29.9987 18.4615 29.9987C19.0739 29.9987 19.6612 30.242 20.0942 30.675L25.3846 35.9683L39.9058 21.4442C40.1202 21.2298 40.3747 21.0597 40.6549 20.9437C40.935 20.8277 41.2352 20.7679 41.5385 20.7679C41.8417 20.7679 42.1419 20.8277 42.4221 20.9437C42.7022 21.0597 42.9567 21.2298 43.1712 21.4442C43.3856 21.6586 43.5556 21.9132 43.6717 22.1933C43.7877 22.4734 43.8474 22.7737 43.8474 23.0769C43.8474 23.3801 43.7877 23.6804 43.6717 23.9605C43.5556 24.2407 43.3856 24.4952 43.1712 24.7096Z"
          fill="url(#paint0_linear_3744_113308)"
        />
      </g>
      <rect
        x="1.5"
        y="1.5"
        width="57"
        height="57"
        rx="28.5"
        stroke="#B2E77B"
        stroke-opacity="0.7"
        stroke-width="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3744_113308"
          x1="30"
          y1="0"
          x2="30"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B2E77B" />
          <stop offset="1" stop-color="#7DE017" />
        </linearGradient>
        <clipPath id="clip0_3744_113308">
          <rect width="60" height="60" rx="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
