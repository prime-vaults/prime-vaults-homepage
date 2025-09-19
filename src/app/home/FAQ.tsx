import clsx from 'clsx'
import { useState } from 'react'

const FAQ = [
  {
    question: 'What’s PrimeVaults?',
    answer:
      'PrimeVaults is an AI-powered platform that works like a smarter savings account for digital assets. You deposit tokens such as USDC, ETH, or BTC, and the system automatically allocates them into high-yield, risk-managed strategies. It’s designed to deliver higher returns with the same simplicity as traditional saving.',
  },
  {
    question: 'What can I expect when using PrimeVaults?',
    answer: `<p>PrimeVaults aims to deliver <a style="color: #b2e77b" href="https://docs.google.com/document/d/1wyRe9LP4VAFBsUAd37epSAGXUyPYsH3KCwZkJlLZXHQ/edit?tab=t.0" target="_blank">higher returns than leaving assets idle or in a bank account</a>. Its AI engine automatically allocates your capital across multiple yield sources such as lending, liquidity provision (LP), and restaking — optimizing performance without manual effort.</p>`,
  },
  {
    question: 'Is PrimeVaults safe?',
    answer:
      'Yes. It features dual protection layers: dynamic fees and reserve funds to mitigate market risks, combined with top-tier audited smart contracts.',
  },
  {
    question: 'Can I withdraw anytime?',
    answer:
      'You can withdraw after the 8-day lock period. Your principal is always guaranteed, regardless of market volatility.',
  },
  {
    question: 'Why is there an 8-day lock?',
    answer:
      'The 8-day lock ensures safe unwinding of positions and accurate redistribution of assets. Yield generated during this period is distributed to active stakers, encouraging long-term commitment.',
  },
  {
    question: 'Do I need deep DeFi knowledge to use it?',
    answer:
      'No. PrimeVaults’ AI handles the complexity—you just deposit and earn yield.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({ 0: false })

  const toggle = (key: number, value: boolean) => {
    setOpen((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <div
      className="section-container grid grid-cols-12 gap-6 bg-cover bg-no-repeat"
      style={{ backgroundImage: 'url(/imgs/background.png)' }}
    >
      <div className="col-span-full md:col-span-3 flex flex-col h-full gap-2">
        <h3 className="text-xl md:text-5xl text-primary">FAQ</h3>
        <span>Common Questions</span>
        <span className="text-xs text-secondary self-end">
          For more information please visit our Help Center.
        </span>
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
              className={clsx('collapse-content text-sm  bg-[#1C1B1D]', {
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
