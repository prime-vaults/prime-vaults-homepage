import Button from '@/components/UI/Button'

export default function EarnPage() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-full md:col-span-3 flex flex-col gap-2">
        <p className="text-2xl md:text-5xl text-primary font-bold">
          Time is the real currency of wealth.
        </p>
        <span>
          PrimeVault turns your deposits into continuous growth, harnessing
          real-time DeFi strategies so your assets never stop working.
        </span>
        <Button className="btn btn-primary w-fit text-base-300">
          Start earning
        </Button>
      </div>
      <div className="col-span-full md:col-span-2">
        {/* <img src="" className="w-full" /> */}
      </div>
    </div>
  )
}
