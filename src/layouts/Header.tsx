import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChangeEvent, useCallback } from 'react'
import { Link } from 'react-router'

import { SunMedium, MoonStar } from 'lucide-react'
import Container from '@/components/UI/Container'

function HeaderLayout() {
  const onSwitch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let theme = 'night'
    if (e.target.checked) theme = 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <Container
      className="border-b border-neutral"
      innerClassName="border-x border-neutral"
    >
      <div className="navbar bg-base-300 px-6">
        <div className="flex-1 flex flex-row items-center">
          <Link
            to="/"
            className="text-xl md:text-3xl text-primary font-bold cursor-pointer"
          >
            Prime Vaults
          </Link>
          <ul className="menu menu-horizontal">
            <li>
              <Link className="btn btn-link" to="/staking">
                Staking
              </Link>
            </li>
            <li>
              <Link className="btn btn-link" to="/point">
                Point
              </Link>
            </li>
            <li>
              <Link className="btn btn-link" to="/earn">
                Earn
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <ConnectButton />
            </li>
            <li>
              <label className="toggle text-base-content">
                <input type="checkbox" onChange={onSwitch} />
                <SunMedium aria-label="enabled" size={16} />
                <MoonStar aria-label="disabled" size={16} />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default HeaderLayout
