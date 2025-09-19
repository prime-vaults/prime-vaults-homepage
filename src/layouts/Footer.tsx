import { Link } from 'react-router'

import Container from '@/components/UI/Container'

import { CoreRoutes } from '@/constant/router'

import prime from '@/static/images/logo/prime.svg'
// import telegram from '@/static/images/logo/telegram.svg'
// import discord from '@/static/images/logo/discord.svg'
// import github from '@/static/images/logo/github.svg'
import x from '@/static/images/logo/x.svg'
import bg from '@/static/images/banner/banner.png'

const LIST_LOGO = [
  // {
  //   link: 'https://t.me/primevaults',
  //   img: telegram,
  // },
  // {
  //   link: 'https://discord.com/invite/primevaults',
  //   img: discord,
  // },
  // {
  //   link: 'https://github.com/primevaults',
  //   img: github,
  // },
  {
    link: 'https://x.com/PrimeVaultsHQ',
    img: x,
  },
]

function FooterLayout() {
  return (
    <Container
      className="border-t border-neutral"
      innerClassName="border-x border-neutral"
    >
      <footer
        className="footer sm:footer-horizontal md:justify-between text-base-content px-6 py-10 bg-[#111512] font-medium"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: '100% 100%' }}
      >
        <aside className="gap-4">
          <div className="flex flex-row gap-2 items-center">
            <img width={30} src={prime} alt="" />
            <p className="text-3xl font-bold text-primary">Prime Vaults</p>
          </div>
          <p>Proof of Liquidity in one click</p>
          <p>PRIME VAULTS © 2025. All rights reserved.</p>
          <div className="flex flex-row gap-4 mt-2">
            {LIST_LOGO.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-[#000] border border-[#3E3E3E] w-10 h-10"
              >
                <a href={item.link} target="_blank">
                  <img src={item.img} alt="" />
                </a>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex flex-col md:flex-row gap-2 md:gap-16">
          <nav>
            <h6 className=" text-[#878787]">Company</h6>
            <ul className="ml-6 list-disc mt-4 flex flex-col gap-3">
              <li className="hover:text-primary">
                <Link
                  to={`/${CoreRoutes.BrandKit}`}
                  className="hover:text-primary"
                >
                  Brand Kit
                </Link>
              </li>
              <li>
                <Link
                  to={`/${CoreRoutes.PrivacyPolicy}`}
                  className="hover:text-primary"
                >
                  Privacy policy
                </Link>
              </li>
              <li className="hover:text-primary">
                <Link
                  to={`/${CoreRoutes.TermOfUse}`}
                  className="hover:text-primary"
                >
                  Term of use
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className=" text-[#878787]">Resources</h6>
            <ul className="ml-6 list-disc mt-4 flex flex-col gap-3">
              <li className="hover:text-primary">Docs</li>
              {/* <li className="hover:text-primary">Ecosystem</li> */}
            </ul>
          </nav>
        </div>
      </footer>
    </Container>
  )
}

export default FooterLayout
