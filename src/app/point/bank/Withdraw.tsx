import Button from '@/components/UI/Button'

export default function Withdraw() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center">
        <span>Amount to withdraw</span>
        <div className="flex flex-row">
          <p>Your Balance:</p>
          <p>
            <b className="text-primary">5555</b> P.P
          </p>
        </div>
      </div>
      <label className="w-full input input-lg bg-base-300 !outline-none pr-2.5">
        <input type="text" placeholder="0" />
        <Button className="btn btn-primary btn-xs">Max</Button>
      </label>
      <Button className="btn btn-primary mt-4">Withdraw</Button>
    </div>
  )
}
