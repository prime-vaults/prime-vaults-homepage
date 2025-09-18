import clsx from 'clsx'

import Corner from '@/components/UI/Corner'

import ai from '@/static/images/ai-security/ai.png'
import strategy from '@/static/images/ai-security/strategy.png'
import security from '@/static/images/ai-security/security.png'
import bg_card from '@/static/images/background/bg-card.svg'

const LIST = [
  {
    title: 'Prime Yield Engines',
    desc: 'From blue-chip lending to advanced LP strategies, PrimeVault’s AI-driven engine constantly optimizes for performance. All you see is consistent, sustainable high yield.',
    img: ai,
    reverse: false,
  },
  {
    title: 'The Financial Shield',
    desc: 'Your assets stay protected through a dual layer of defense. Dynamic fees manage market shifts, and reserve funds cover predicted risks.',
    img: strategy,
    reverse: true,
  },
  {
    title: 'The Security Shield',
    desc: 'Institutional-grade audits and continuous monitoring fortify every contract, keeping your assets safe at the code level.',
    img: security,
    reverse: false,
  },
]

export default function Engines() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 px-4 md:px-0 py-8 md:py-16">
      {LIST.map((item, index) => (
        <div key={index} className="relative overflow-hidden group h-full">
          <div
            className={clsx(
              'absolute inset-0 bg-gradient-to-t from-[#A3E96B] to-transparent translate-y-full group-hover:translate-y-[20%] transition-transform duration-500 ease-out z-0',
              {
                '!bg-gradient-to-b !scale-y-0 !origin-top group-hover:!scale-y-80 !translate-y-0':
                  !!item.reverse,
              },
            )}
          />
          <div
            className={clsx(
              'relative flex flex-col h-full gap-2 p-6 border-r border-t border-b border-[#3E3E3E] bg-cover bg-no-repeat z-10',
              item.reverse && 'flex-col-reverse',
              index === LIST.length - 1 && 'border-r-0',
            )}
            style={{
              backgroundImage: `url(${bg_card})`,
            }}
          >
            <div className="flex flex-col gap-4 font-medium">
              <p className="text-2xl md:text-5xl text-primary uppercase">
                {item.title}
              </p>
              <span className="text-base md:text-3xl">{item.desc}</span>
            </div>
            <div className="flex-1" />
            <img src={item.img} className="w-full h-auto object-contain" />
          </div>
          <Corner />
        </div>
      ))}
    </div>
  )
}
