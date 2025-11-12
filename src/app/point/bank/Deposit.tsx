import Button from '@/components/UI/Button'
import { useState } from 'react'

export default function BankDeposit() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center">
        <span>Amount to deposit</span>
        <div className="flex flex-row gap-2">
          <p>Your Balance:</p>
          <p>
            <b className="text-primary">{value || 0}</b> P.P
          </p>
        </div>
      </div>
      <label className="w-full input input-lg bg-base-300 !outline-none pr-2.5">
        <input
          type="number"
          placeholder="0"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="btn btn-primary btn-xs">Max</Button>
      </label>
      <Button className="btn btn-primary mt-4">Deposit</Button>
    </div>
  )
}
