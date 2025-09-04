import { RouterProvider } from 'react-router-dom'
import { routes } from '@/routes/routes-config'

import SystemProvider from './providers/system'

import '@/static/styles/index.scss'

function App() {
  return (
    <SystemProvider>
      <RouterProvider router={routes} />
    </SystemProvider>
  )
}

export default App
