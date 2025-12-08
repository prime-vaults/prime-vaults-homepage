import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { RouterProvider } from 'react-router-dom'

import SystemProvider from './providers/system'

import { routes } from './routes/configs'

import '@/static/styles/index.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'swiper/css'
import 'swiper/css/pagination'

function App() {
  return (
    <RainbowKitProvider>
      <SystemProvider>
        <RouterProvider router={routes} />
      </SystemProvider>
    </RainbowKitProvider>
  )
}

export default App
