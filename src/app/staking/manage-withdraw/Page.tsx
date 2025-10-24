import { Fragment } from 'react/jsx-runtime'
import WithdrawRequest from './WithdrawRequest'

export default function ManageWithdraw() {
  return (
    <Fragment>
      <label
        htmlFor="manage_withdraw_drawer"
        className="fixed bottom-[20%] right-0 border border-r-0 border-primary px-4 py-2 bg-base-200 z-[999]"
      >
        $20.999 pending - unlocks in <b className="text-primary">7d:32h:59m</b>
      </label>
      <div className="drawer drawer-end">
        <input
          id="manage_withdraw_drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-side z-[999999]">
          <label
            htmlFor="manage_withdraw_drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <WithdrawRequest />
        </div>
      </div>
    </Fragment>
  )
}
