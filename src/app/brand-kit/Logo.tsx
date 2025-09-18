import clsx from 'clsx'
import { useState } from 'react'
import { ArrowDownToLine } from 'lucide-react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import l_black from '@/static/images/logo/brand/logo-black.svg'
import l_dark from '@/static/images/logo/brand/logo-dark.svg'
import l_light from '@/static/images/logo/brand/logo-light.svg'

import boxed_black from '@/static/images/logo/brand/black/boxed.svg'
import horizontal_black from '@/static/images/logo/brand/black/horizontal.svg'
import symbol_black from '@/static/images/logo/brand/black/symbol.svg'
import vertical_black from '@/static/images/logo/brand/black/vertical.svg'

import boxed_light from '@/static/images/logo/brand/light/boxed.svg'
import horizontal_light from '@/static/images/logo/brand/light/horizontal.svg'
import symbol_light from '@/static/images/logo/brand/light/symbol.svg'
import vertical_light from '@/static/images/logo/brand/light/vertical.svg'

import boxed_dark from '@/static/images/logo/brand/dark/boxed.svg'
import horizontal_dark from '@/static/images/logo/brand/dark/horizontal.svg'
import symbol_dark from '@/static/images/logo/brand/dark/symbol.svg'
import vertical_dark from '@/static/images/logo/brand/dark/vertical.svg'

enum THEME {
  Dark = 'dark',
  Light = 'light',
  Black = 'black',
}

const LOGOS = {
  [THEME.Dark]: {
    bg_color: '#A2E76B',
    text_color: '#00342A',
    logo: l_dark,
    boxed: boxed_dark,
    horizontal: horizontal_dark,
    symbol: symbol_dark,
    vertical: vertical_dark,
  },
  [THEME.Light]: {
    bg_color: '#00332C',
    text_color: '#fff',
    logo: l_light,
    boxed: boxed_light,
    horizontal: horizontal_light,
    symbol: symbol_light,
    vertical: vertical_light,
  },
  [THEME.Black]: {
    bg_color: '#fff',
    text_color: '#141510',
    logo: l_black,
    boxed: boxed_black,
    horizontal: horizontal_black,
    symbol: symbol_black,
    vertical: vertical_black,
  },
}

enum TypeLogo {
  Vertical = 'Vertical',
  Horizontal = 'Horizontal',
  Symbol = 'Symbol',
  Boxed = 'Boxed logo',
}

function CardDownLoad({
  logo,
  type,
  theme,
}: {
  type: TypeLogo
  logo: string
  theme: THEME
}) {
  return (
    <div
      className="flex flex-col gap-6 p-8 font-medium"
      style={{ background: LOGOS[theme].bg_color }}
    >
      <img
        src={logo}
        alt=""
        className={clsx('h-28 aspect-square', {
          '!h-20': type === TypeLogo.Symbol || type === TypeLogo.Horizontal,
        })}
      />
      <div className="flex flex-row justify-between">
        <p
          className="text-[#FCFCFD]"
          style={{ color: LOGOS[theme].text_color }}
        >
          {type}
        </p>
        <a
          href={logo}
          download={`logo-${type}.svg`}
          className="flex flex-row gap-2 cursor-pointer hover:px-1 hover:bg-[#fff] group transition-all duration-200"
        >
          <ArrowDownToLine
            width={18}
            style={{ color: LOGOS[theme].text_color }}
          />
          <p
            className="hidden group-hover:block"
            style={{ color: LOGOS[theme].text_color }}
          >
            SVG
          </p>
        </a>
      </div>
    </div>
  )
}

export default function Logo() {
  const [theme, setTheme] = useState(THEME.Dark)

  const handleDownloadAll = async () => {
    const zip = new JSZip()

    for (const [key, url] of Object.entries(LOGOS[theme])) {
      const response = await fetch(url)
      const blob = await response.blob()
      zip.file(`logo-${key}.svg`, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'logos.zip')
  }

  return (
    <div className="section-container grid grid-cols-2 gap-6">
      <div className="col-span-full flex flex-row justify-between">
        <p className="text-[100px] font-bold">LOGO</p>
        <button className="btn btn-primary flex flex-row gap-2 !px-6 py-3">
          <p onClick={handleDownloadAll} className="font-medium">
            Download Prime Vaults Logos
          </p>
          <ArrowDownToLine width={18} />
        </button>
      </div>
      <div className="col-span-full flex flex-row gap-4 justify-between">
        <p className="font-medium flex-1">
          PrimeVaults blends security with{' '}
          <span className="text-primary">AI-driven</span> optimization. The
          radiating mark reflects capital in motion — always protected, always
          compounding, always growing.
        </p>
        <div className="flex flex-row gap-4">
          {Object.keys(LOGOS).map((key, idx) => (
            <button
              key={idx}
              className="btn btn-xl !px-2.5"
              style={{ backgroundColor: LOGOS[key as THEME].bg_color }}
              onClick={() => setTheme(key as THEME)}
            >
              <img src={LOGOS[key as THEME].logo} width={160} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-full">
        <CardDownLoad
          logo={LOGOS[theme].vertical}
          type={TypeLogo.Vertical}
          theme={theme}
        />
      </div>
      <div className="col-span-1">
        <CardDownLoad
          logo={LOGOS[theme].horizontal}
          type={TypeLogo.Horizontal}
          theme={theme}
        />
      </div>
      <div className="col-span-1">
        <CardDownLoad
          logo={LOGOS[theme].symbol}
          type={TypeLogo.Symbol}
          theme={theme}
        />
      </div>
      <div className="col-span-full">
        <CardDownLoad
          logo={LOGOS[theme].boxed}
          type={TypeLogo.Boxed}
          theme={theme}
        />
      </div>
    </div>
  )
}
