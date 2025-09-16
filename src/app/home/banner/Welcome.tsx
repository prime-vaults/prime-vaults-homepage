import { Fragment, useLayoutEffect, useState } from 'react'

import { useTypingDecrypt } from '@/hooks/useTyping'
import screenBg from '@/static/images/banner/screen-bg.png'

const TEXTS = [
  'Prime Stratgies. Best Returns.',
  'Your On-Chain Wealth Solution.',
]

export default function Welcome() {
  const [start, setStart] = useState(false)
  const { textLines, running, ended, reset } = useTypingDecrypt(TEXTS, {
    start,
    speed: { typing: 5, decrypted: 15 },
  })

  useLayoutEffect(() => {
    window.addEventListener('keypress', (e) => {
      setStart(e.key === 'p')
    })
    return () => {
      window.removeEventListener('keypress', () => reset())
    }
  }, [reset])

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-no-repeat z-[999]"
      style={{
        backgroundImage: `url(${screenBg})`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-2">
          {!running && !ended && (
            <span className="text-xl md:text-5xl">
              Press <b className="animate-pulse">[P]</b>
            </span>
          )}
          {!!running && (
            <span className="relative text-xl md:text-3xl">
              {textLines.map((text) => (
                <Fragment>
                  <b key={text}>{text}</b>
                  <br />
                </Fragment>
              ))}{' '}
              <b
                className="animate-pulse"
                style={{ animationDuration: '200ms' }}
              >
                |
              </b>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
