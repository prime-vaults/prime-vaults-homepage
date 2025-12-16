import { Fragment, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import IntroPage from '@/app/home/intro/Page'

export default function SystemProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <IntroPage />
      <ToastContainer />
      {children}
    </Fragment>
  )
}
