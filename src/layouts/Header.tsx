import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'react-router'

function HeaderLayout() {
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
        </ul>
      </div>
    </div>
  )
}

export default HeaderLayout
