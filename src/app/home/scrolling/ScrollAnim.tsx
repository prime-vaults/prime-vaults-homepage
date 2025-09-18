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
      <img
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
        className={clsx(
          'absolute top-0 h-auto object-contain transition-all duration-1000 z-[2]',
          {
            'opacity-100 translate-y-[160%]': activeIndex === 0,
            'opacity-0': activeIndex !== 0,
          },
        )}
        src={token}
      />
      <img
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
        className={clsx(
          'absolute top-0 h-auto object-contain transition-all duration-1000 z-[2]',
          {
            'opacity-100 translate-y-[160%]': activeIndex === 1,
            'opacity-0': activeIndex !== 1,
          },
        )}
        src={docs}
      />
      <img
        style={{
          width: `${(78.7 / 423) * 100}%`,
        }}
        className={clsx(
          'absolute top-0 h-auto object-contain transition-all duration-1000 z-[2]',
          {
            'opacity-100 translate-y-[160%]': activeIndex === 2,
            'opacity-0 top-0': activeIndex !== 2,
          },
        )}
        src={dollar}
      />
      <img
        className="absolute top-0 left-0 w-full object-contain z-[4]"
        src={elm3}
      />
    </div>
  )
}
