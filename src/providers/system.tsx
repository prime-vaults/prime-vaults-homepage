import { Fragment, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export default function SystemProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <ToastContainer />
      {children}
    </Fragment>
  )
}
