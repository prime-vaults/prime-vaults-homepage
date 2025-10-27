import { Outlet } from 'react-router'
import { Fragment } from 'react/jsx-runtime'
import ManageWithdraw from './manage-withdraw/Page'

export default function VaultsLayout() {
  return (
    <Fragment>
      <Outlet />
      <ManageWithdraw />
    </Fragment>
  )
}
