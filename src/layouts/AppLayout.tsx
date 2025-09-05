import React, { ReactNode } from 'react'
import FooterLayout from './Footer'
import HeaderLayout from './Header'

interface LayoutProps {
  children: ReactNode
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <HeaderLayout />
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-full bg-base-300">
          <main className="p-4 flex-1">{children}</main>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-base-200">
        <FooterLayout />
      </footer>
    </div>
  )
}

export default AppLayout
