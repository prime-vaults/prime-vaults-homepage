import Button from '@/components/UI/Button'
import Container from '@/components/UI/Container'

export default function PortfolioPage() {
  return (
    <Container>
      <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 bg-base-200">
        <div className="flex flex-col gap-4">
          <p>PortfolioPage</p>
          <div className="p-4 border border-base-100 bg-repeating min-h-80">
            Chart
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-1">
              <p>My position</p>
              <p className="text-sm py-0.5 px-2 bg-base-100">1</p>
            </div>
            <Button className="btn bg-white text-black">
              History Deposit (optional)
            </Button>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-amber-600" />
              <div className="flex flex-col">
                <p className="text-xl md:text-2xl font-medium">PrimeETH</p>
                <span className="text-sm md:text-base font-medium">
                  My Prime Points: <b className="text-primary">29.9993</b> P.P
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col py-1 px-4 md:px-8 border border-base-100 bg-repeating items-center text-center">
                <span className="text-sm md:text-base text-secondary">APR</span>
                <p className="text-xl md:text-2xl font-medium text-primary">
                  22.75%
                </p>
              </div>
              <div className="flex flex-col py-1 px-4 md:px-8 border border-base-100 bg-repeating items-center text-center">
                <span className="text-sm md:text-base text-secondary">
                  Boosted Points
                </span>
                <p className="text-xl md:text-2xl font-medium text-primary">
                  x2
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
