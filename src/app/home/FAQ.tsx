import clsx from 'clsx'
import { useState } from 'react'

import BG_DOT from '@/static/images/bg-dot-long.png'

const FAQ = [
  {
    question: 'What’s Prime Vault?',
    answer:
      'Prime Vaults is an on-chain Smart Saving Account offering stable, optimized reward rates with principal protection and a guaranteed minimum yield mechanism.',
  },
  {
    question: 'Why are Prime Vault’s reward rates attractive and guaranteed?',
    answer: `All assets are pooled into one shared vault and deployed across multiple strategies.
By combining utility across many assets and many strategies, Prime Vaults generates stronger, more efficient yield - enabling attractive reward rates while guaranteeing a minimum benchmark rate.`,
  },
  {
    question: 'How is the reward rate defined?',
    answer:
      'Reward rates for each asset are determined by strategy performance, market yield, and vault demand and always stay <b>at or above the Benchmark Rate</b> from <b>AAVE V3 Core Market.</b>',
  },
  {
    question: 'Is Prime Vaults non-custodial?',
    answer:
      'Yes. Prime Vaults never takes custody. Your assets always remain under your ownership and control.',
  },
  {
    question: 'Can I withdrawals anytime?',
    answer:
      'You can withdraw after the 3-day lock period. Your principal is always guaranteed, regardless of market volatility.',
  },
  {
    question: 'Why is there a 3-day unlock period?',
    answer:
      'The unlock period allows the vault to safely unwind or rebalance strategies, protecting system stability and solvency during withdrawals.',
  },
  {
    question: 'Is Prime Vaults safe?',
    answer:
      'Prime Vaults is supported by a <b>Solvency Framework</b> built on the <b>Health Index, IL Reserve Fund</b>, and a transparent <b>Proof of Reserve Dashboard</b>, ensuring system solvency and long-term protection for user assets.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({ 0: false })

  const toggle = (key: number, value: boolean) => {
    setOpen((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <div className="section-container grid grid-cols-12 gap-6 bg-repeating bg-repeating-body">
      <div className="relative col-span-full md:col-span-3 flex flex-col h-full gap-2">
        <img
          src={BG_DOT}
          className="absolute w-full h-auto object-contain -top-4 -left-4 md:-top-8 md:-left-8 md:scale-125 origin-top-left"
        />
        <h1 className="text-primary">FAQ</h1>
        <h3>Common Questions</h3>
        <p className="text-xs text-secondary md:self-end">
          For more information please visit our Help Center.
        </p>
      </div>
      <div className="col-span-full md:col-span-9 flex flex-col gap-2">
        {FAQ.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow border-[#40444D] border-b rounded-none"
          >
            <input
              type="checkbox"
              checked={open[index]}
              onChange={(e) => toggle(index, e.target.checked)}
            />
            <div className="collapse-title flex flex-row items-center justify-between">
              <p>{faq.question}</p>
            </div>
            <div
              className={clsx('collapse-content text-sm bg-[#1C1B1D]', {
                'm-4 mt-0 p-4': open[index],
              })}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
