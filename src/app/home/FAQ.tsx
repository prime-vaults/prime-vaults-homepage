import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-span-3 flex flex-col h-full gap-2">
        <h3 className="text-xl md:text-5xl text-primary">FAQ</h3>
        <span>Common Questions</span>
        <span className="text-xs text-secondary self-end">
          For more information please visit our Help Center.
        </span>
      </div>
      <div className="col-span-full md:col-span-9 flex flex-col gap-2">
        {/* question 1 */}
        <div className="collapse border-base-100 border-b">
          <input type="checkbox" />
          <div className="collapse-title flex flex-row items-center justify-between">
            <p>How do I create an account?</p>
            <ChevronDown size={16} />
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        {/* question 2 */}
        <div className="collapse border-base-100 border-b">
          <input type="checkbox" />
          <div className="collapse-title flex flex-row items-center justify-between">
            <p>How do I create an account?</p>
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        {/* question 3 */}
        <div className="collapse border-base-100 border-b">
          <input type="checkbox" />
          <div className="collapse-title flex flex-row items-center justify-between">
            <p>How do I create an account?</p>
          </div>
          <div className="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
      </div>
    </div>
  )
}
