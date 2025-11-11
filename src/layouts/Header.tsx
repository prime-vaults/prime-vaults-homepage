import { useMemo } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation } from 'react-router'

import Container from '@/components/UI/Container'
import { shortenString } from '@/helpers/utils'
import { CoreRoutes } from '@/constant/router'
import clsx from 'clsx'

const MENUS: { label: string; path: string }[] = [
  { label: 'Vaults', path: CoreRoutes.vaults() },
  { label: 'Portfolio', path: CoreRoutes.portfolio() },
  { label: 'Prime Point', path: CoreRoutes.point() },
]

function HeaderLayout() {
  const location = useLocation()

  const activePath = useMemo(() => location.pathname, [location.pathname])

  return (
    <Container
      className="border-b border-neutral"
      innerClassName="plus-suffix header-suffix"
    >
      <div className="relative navbar bg-base-300 px-6 z-[999]">
        <div className="flex-1 flex flex-row items-center">
          <Link
            to={CoreRoutes.home()}
            className="text-xl md:text-3xl text-primary font-bold cursor-pointer"
          >
            <img src="/logo.svg" />
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {MENUS.map((item) => {
              const isActive =
                item.path === CoreRoutes.home()
                  ? item.path === activePath
                  : activePath.includes(item.path)
              return (
                <li key={item.path}>
                  <Link
                    className={clsx('btn min-w-32', {
                      'btn-primary': isActive,
                    })}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <ConnectButton.Custom>
                {({ openAccountModal, openConnectModal, account }) => {
                  if (!!account)
                    return (
                      <div
                        className="flex flex-row gap-0 p-0 h-full"
                        onClick={openAccountModal}
                      >
                        <div className="flex flex-col justify-center h-full py-2 px-4 bg-base-200">
                          {account.displayBalance}
                        </div>
                        <div className="flex flex-col justify-center h-full py-2 px-4 bg-base-100">
                          {shortenString(account.address, { maxLength: 4 })}
                        </div>
                      </div>
                    )
                  return (
                    <div
                      className="py-2 px-4 bg-base-100 rounded-none"
                      onClick={openConnectModal}
                    >
                      Connect wallet
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            </li>
            {/* <li>
              <label className="toggle text-base-content">
                <input type="checkbox" onChange={onSwitch} />
                <SunMedium aria-label="enabled" size={16} />
                <MoonStar aria-label="disabled" size={16} />
              </label>
            </li> */}
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default HeaderLayout
