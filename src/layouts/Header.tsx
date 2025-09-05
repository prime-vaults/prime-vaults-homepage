import { ConnectButton } from '@rainbow-me/rainbowkit'

function HeaderLayout() {
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Prime Vaults</a>
        <ul className="menu menu-horizontal bg-base-200">
          <li>
            <a>Staking</a>
          </li>
          <li>
            <a>Point</a>
          </li>
          <li>
            <a>Earn</a>
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
