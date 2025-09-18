import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel } from 'swiper/modules'

import { Check } from 'lucide-react'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

type ScrollItemProps = {
  className?: string
  onActiveIndexChange?: (index: number) => void
}

const SCROLL_ITEMS = [
  {
    key: 'earn',
    label: 'earn',
    desc: `Your money, elevated. Safe, seamless growth for USD, Bitcoin, and Ethereum — all working harder for you in one place.`,
  },
  {
    key: 'save',
    label: 'save',
    desc: `High returns, full flexibility. Claim yields anytime and withdraw whenever you choose — without losing your earnings.`,
  },
  {
    key: 'delete',
    label: 'Delete',
    desc: `High returns, full flexibility. Claim yields anytime and withdraw whenever you choose — without losing your earnings.`,
  },
]

export default function ScrollItem({
  onActiveIndexChange = () => {},
}: ScrollItemProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const onChange = useCallback(
    (value: number) => {
      setActiveIndex(value)
      onActiveIndexChange(value)
    },
    [onActiveIndexChange],
  )

  return (
    <Swiper
      modules={[Mousewheel]}
      direction="vertical"
      pagination={{ clickable: true }}
      mousewheel={{
        enabled: true,
        forceToAxis: true,
      }}
      onSlideChange={(swiper) => {
        onChange?.(swiper.activeIndex)
      }}
      className="h-52 md:h-auto"
    >
      {SCROLL_ITEMS.map(({ key, label, desc }, idx) => {
        const isActive = activeIndex === idx

        return (
          <SwiperSlide key={key}>
            <div className="flex flex-row gap-8 pl-4">
              <div className="relative w-0.5 h-full min-h-52 md:min-h-96 flex flex-row justify-center border border-primary border-dashed">
                <div
                  className={clsx(
                    'absolute w-8 h-8 border-2 flex flex-col items-center justify-center',
                    {
                      'bg-primary border-primary': isActive,
                      'bg-base-300 border-base-100 ': !isActive,
                    },
                  )}
                >
                  {isActive && <Check size={24} className="text-neutral" />}
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-xl md:text-4xl text-primary uppercase">
                  {label}
                </p>
                <span className="text-base md:text-3xl">{desc}</span>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
