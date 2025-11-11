import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from 'react-router'

import Container from '@/components/UI/Container'
import { shortenString } from '@/helpers/utils'
import { CoreRoutes } from '@/constant/router'

function HeaderLayout() {
  // const onSwitch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  //   let theme = 'night'
  //   if (e.target.checked) theme = 'light'
  //   document.documentElement.setAttribute('data-theme', theme)
  // }, [])

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
            <li>
              <Link className="btn btn-link" to={CoreRoutes.vaults()}>
                Vaults
              </Link>
            </li>
            <li>
              <Link className="btn btn-link" to={CoreRoutes.point()}>
                Point
              </Link>
            </li>
            <li>
              <Link className="btn btn-link" to={CoreRoutes.portfolio()}>
                Portfolio
              </Link>
            </li>
            <li>
              <ConnectButton.Custom>
                {({ openAccountModal, openConnectModal, account }) => {
                  if (!!account)
                    return (
                      <div
                        className="flex flex-row gap-0 p-0"
                        onClick={openAccountModal}
                      >
                        <div className="py-2 px-4 bg-base-200">
                          {account.displayBalance}
                        </div>
                        <div className="py-2 px-4 bg-base-100">
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
