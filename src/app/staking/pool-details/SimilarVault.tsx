import Button from '@/components/UI/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SimilarVault() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <div className="col-span-full flex flex-row justify-between items-center py-4 md:py-6">
        <p className="text-xl md:text-2xl font-medium">Similar vault</p>
        <div className="flex flex-row gap-1 items-center">
          <ChevronLeft className="w-8 cursor-pointer text-primary active:translate-y-[0.5px]" />
          <ChevronRight className="w-8 cursor-pointer text-primary active:translate-y-[0.5px]" />
        </div>
      </div>
      {[1, 2].map((item) => {
        return (
          <div
            className="flex flex-col gap-4 border border-base-100 bg-base-200 p-4"
            key={item}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <div className="w-12 h-12 rounded-full bg-cyan-300" />
                <p className="text-xl md:text-2xl">PrimeBTC #{item}</p>
              </div>
              <div>Boost</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center border border-base-100 bg-base-300 py-2 px-4">
                <span className="text-sm md:text-base text-secondary">TVL</span>
                <p className="text-xl md:text-3xl">$600.0M</p>
              </div>
              <div className="flex flex-col items-center justify-center border border-base-100 bg-base-300 py-2 px-4">
                <span className="text-sm md:text-base text-secondary">APR</span>
                <p className="text-xl md:text-3xl text-primary">22.3%</p>
              </div>
            </div>
            <p>
              <b className="text-primary">PrimeBTC</b> maximizes BTC yields by
              integrating with top lending and liquidity protocols on BNB Chain.
              It automatically reallocates funds across opportunities using
              on-chain signals, ensuring optimized returns while maintaining
              security and efficiency.
            </p>
            <Button className="btn btn-primary btn-block">Deposit</Button>
          </div>
        )
      })}
    </div>
  )
}
