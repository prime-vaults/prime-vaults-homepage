import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TokenSelectionState = {
  chainId?: number
  token?: string
  setChain: (chainId: number) => void
  setToken: (token: string) => void
  reset: () => void
}

export const useTokenSelection = create<TokenSelectionState>()(
  persist(
    (set) => ({
      chainId: undefined,
      token: undefined,
      setChain: (chainId) => set({ chainId, token: undefined }),
      setToken: (token) => set({ token }),
      reset: () => set({ chainId: undefined, token: undefined }),
    }),
    { name: 'token-selection' },
  ),
)
