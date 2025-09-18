import clsx from 'clsx'

import elm1 from '@/static/images/scrolling/elm1.png'
import elm2 from '@/static/images/scrolling/elm2.png'
import elm3 from '@/static/images/scrolling/elm3.png'
import token from '@/static/images/scrolling/token.png'
import docs from '@/static/images/scrolling/docs.png'
import dollar from '@/static/images/scrolling/dolar.png'

type ScrollAnimProps = { activeIndex?: number }
export default function ScrollAnim({ activeIndex = 0 }: ScrollAnimProps) {
  return (
    <div className="relative aspect-square w-full h-auto flex flex-col items-center justify-center">
      <img
        className="absolute top-0 left-0 w-full object-contain z-[1]"
        src={elm1}
      />
      <img
        className="absolute top-0 left-0 w-full object-contain z-[3]"
        src={elm2}
      />
      <div
        className={clsx('absolute top-0 transition-all duration-1000 z-[2]', {
          'opacity-100 translate-y-[160%]': activeIndex === 0,
          'opacity-0 top-0': activeIndex !== 0,
        })}
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
      >
        <img
          className="w-full h-auto object-contain animate-bounce"
          src={token}
        />
      </div>

      <div
        className={clsx(
          'absolute top-0 w-fit h-fit transition-all duration-1000 z-[2]',
          {
            'opacity-100 translate-y-[160%]': activeIndex === 1,
            'opacity-0 top-0': activeIndex !== 1,
          },
        )}
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
      >
        <img
          className="w-full h-auto object-contain animate-bounce"
          src={docs}
        />
      </div>
      <div
        className={clsx(
          'absolute top-0 w-fit h-fit transition-all duration-1000 z-[2]',
          {
            'opacity-100 translate-y-[160%]': activeIndex === 2,
            'opacity-0 top-0': activeIndex !== 2,
          },
        )}
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
      >
        <img
          className="w-full h-auto object-contain animate-bounce"
          src={dollar}
        />
      </div>
      <img
        className="absolute top-0 left-0 w-full object-contain z-[4]"
        src={elm3}
      />
    </div>
  )
}
