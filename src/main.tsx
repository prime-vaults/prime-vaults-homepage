import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './constant/wagmi.ts'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { JHubProvider } from '@beraji/web3-sdk'

import App from './App.tsx'

window.jiko = {} as any

const mutationCache = new MutationCache({
  onSuccess: () => {},
  // onError: (error) => {
  //   window.jiko.message({ msg: normalizeError(error), type: 'error' })
  // },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 24 * 60 * 60 * 1000,
    },
  },
  mutationCache,
})

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
