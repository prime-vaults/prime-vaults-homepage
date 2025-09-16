export default function ScrollingPage() {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-full md:col-span-4 flex flex-col gap-2">
        <h3 className="text-primary text-2xl">Beyond Wealth, One Place.</h3>
        <div className="flex flex-col max-h-96 overflow-auto">
          {/* item 1 */}
          <div className="flex flex-col gap-2">
            <p className="text-xl md:text-4xl text-primary">Earn</p>
            <span>
              Your money, elevated. Safe, seamless growth for USD, Bitcoin, and
              Ethereum — all working harder for you in one place.
            </span>
          </div>
          {/* item 2 */}
          <div className="flex flex-col gap-2">
            <p className="text-xl md:text-4xl text-primary">Save</p>
            <span>
              High returns, full flexibility. Claim yields anytime and withdraw
              whenever you choose — without losing your earnings.
            </span>
          </div>
          {/* item 3 */}
          <div className="flex flex-col gap-2">
            <p className="text-xl md:text-4xl text-primary">Del</p>
            <span>
              High returns, full flexibility. Claim yields anytime and withdraw
              whenever you choose — without losing your earnings.
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-full md:col-span-3"></div>
    </div>
  )
}
