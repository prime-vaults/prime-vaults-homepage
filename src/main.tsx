import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './constant/wagmi.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import timezone from 'dayjs/plugin/timezone'
import timeZoneUTC from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'

import App from './App.tsx'

dayjs.extend(relativeTime)
dayjs.extend(timeZoneUTC)
dayjs.extend(timezone)
dayjs.extend(duration)

const queryClient = new QueryClient({})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
