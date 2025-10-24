import { Outlet } from 'react-router'
import { Fragment } from 'react/jsx-runtime'
import ManageWithdraw from './manage-withdraw/Page'

export default function StakingLayout() {
  return (
    <Fragment>
      <Outlet />
      <ManageWithdraw />
    </Fragment>
  )
}
