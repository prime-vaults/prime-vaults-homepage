import React, { ReactNode } from 'react'
import FooterLayout from './Footer'
import HeaderLayout from './Header'

interface LayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderLayout />
      <div className="flex-1 flex flex-row">
        <div className="flex flex-col w-full">
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <FooterLayout />
    </div>
  )
}

export default AppLayout
