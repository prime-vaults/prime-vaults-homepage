import Button from '@/components/UI/Button'

const APP_LINK = 'https://app.primevaults.finance/'
const DOCS_LINK = 'https://docs.primevaults.finance/'

export default function CTA() {
  return (
    <div className="relative section-container flex flex-col gap-6 md:gap-12">
      <h1 className="uppercase text-primary">Ready to Grow Your Wealth?</h1>
      <h2>
        Join thousands earning higher returns with Prime Vaults. Your principal
        is guaranteed, your growth is automatic, and your future starts today.
      </h2>
      <div className="flex flex-row gap-3 md:gap-6">
        <Button
          className="btn btn-primary"
          onClick={() => window.open(APP_LINK, '_blank')}
        >
          Start Earning Now
        </Button>
        <Button
          className="btn btn-outline"
          onClick={() => window.open(DOCS_LINK, '_blank')}
        >
          View Documentation
        </Button>
      </div>
    </div>
  )
}
