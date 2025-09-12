import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ChangeEvent, useCallback } from 'react'
import { Link } from 'react-router'

import { SunMedium, MoonStar } from 'lucide-react'

function HeaderLayout() {
  const onSwitch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let theme = 'night'
    if (e.target.checked) theme = 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Prime Vaults
        </Link>
        <ul className="menu menu-horizontal bg-base-200">
          <li>
            <Link to="/staking">Staking</Link>
          </li>
          <li>
            <Link to="/point">Point</Link>
          </li>
          <li>
            <Link to="/earn">Earn</Link>
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
  )
}

export default HeaderLayout
