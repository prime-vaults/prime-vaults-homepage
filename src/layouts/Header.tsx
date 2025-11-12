import clsx from 'clsx'
import { useId, useMemo } from 'react'
import { Link, useLocation } from 'react-router'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { Menu, X } from 'lucide-react'
import Container from '@/components/UI/Container'

import { CoreRoutes } from '@/constant/router'
import { shortenString } from '@/helpers/utils'

const MENUS: { label: string; path: string }[] = [
  { label: 'Vaults', path: CoreRoutes.vaults() },
  { label: 'Portfolio', path: CoreRoutes.portfolio() },
  { label: 'Prime Point', path: CoreRoutes.point() },
]

function HeaderLayout() {
  const mobileMenuId = useId()
  const location = useLocation()

  const activePath = useMemo(() => location.pathname, [location.pathname])

  return (
    <Container
      className="border-b border-neutral"
      innerClassName="plus-suffix header-suffix"
    >
      <div className="relative navbar bg-base-300 px-4 md:px-6 z-[999]">
        {/* logo */}
        <div className="flex flex-row">
          <Link
            to={CoreRoutes.home()}
            className="text-xl md:text-3xl text-primary font-bold cursor-pointer"
          >
            <img
              className="hidden md:block w-auto h-14 object-contain"
              src="/logo.svg"
            />
            <img
              className="block md:hidden w-auto h-14 object-contain"
              src="/favicon.svg"
            />
          </Link>
        </div>
        {/* menu desktop */}
        <div className="flex-1 flex flex-row justify-end">
          <ul className="hidden md:flex menu menu-horizontal px-1 gap-4">
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
          </ul>
          <ul className="menu menu-horizontal gap-4 p-0 md:p-2">
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
            <li className="flex md:hidden items-center justify-center">
              <label className="p-0" htmlFor={mobileMenuId}>
                <Menu size={32} />
              </label>
            </li>
          </ul>
        </div>
      </div>
      {/* menu mobile */}
      <div className="drawer drawer-end">
        <input id={mobileMenuId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-[99999]">
          <label
            htmlFor={mobileMenuId}
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="relative w-full h-full menu menu-vertical gap-4 bg-base-300 p-6 pt-32">
            <div className="absolute w-full top-0 left-0">
              <div className="relative">
                <img
                  src="/favicon.svg"
                  className="absolute w-auto h-12 top-6 left-6 -translate-y-1/4 object-contain"
                />
                <label
                  htmlFor={mobileMenuId}
                  aria-label="close sidebar"
                  className="absolute top-6 right-6 -translate-y-1/4"
                >
                  <X size={32} />
                </label>
              </div>
            </div>
            {MENUS.map((item) => {
              const isActive =
                item.path === CoreRoutes.home()
                  ? item.path === activePath
                  : activePath.includes(item.path)
              return (
                <li key={item.path}>
                  <Link
                    className={clsx('relative btn ', {
                      'btn-primary': isActive,
                    })}
                    to={item.path}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Container>
  )
}

export default HeaderLayout
