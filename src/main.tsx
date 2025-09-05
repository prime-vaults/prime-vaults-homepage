import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './constant/wagmi.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JHubProvider } from '@beraji/web3-sdk'

import App from './App.tsx'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

const queryClient = new QueryClient({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <JHubProvider
          defaultChainId={wagmiConfig.chains[0].id}
          env={import.meta.env.VITE_ENV}
          loadingPage={
            <div className="fixed w-screen h-screen top-0 left-0 flex flex-row justify-center">
              <span>loading...</span>
            </div>
          }
        >
          <App />
        </JHubProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
