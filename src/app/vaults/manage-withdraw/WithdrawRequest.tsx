import { X } from 'lucide-react'
import WithdrawCard from './WithdrawCard'

export default function WithdrawRequest() {
  return (
    <div className="w-2/3 h-full max-h-screen bg-base-300 p-4 flex flex-col gap-4 overflow-auto">
      <div className="flex flex-row justify-between gap-4 items-center">
        <p className="text-xl md:text-2xl font-medium">Manage withdraw</p>
        <label
          htmlFor="manage_withdraw_drawer"
          aria-label="close sidebar"
          className="cursor-pointer"
        >
          <X className="w-6" />
        </label>
      </div>
      {new Array(5).fill('').map((_, idx) => (
        <WithdrawCard key={idx} />
      ))}
    </div>
  )
}
