import { SearchQueryKey } from '@/constant'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useUpdateSearchParams() {
  const [, setSearchParams] = useSearchParams()

  const onUpdate = useCallback(
    (key: SearchQueryKey, value: string) => {
      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams)
        updatedParams.set(key, value)
        return updatedParams
      })
    },
    [setSearchParams],
  )

  const onUpdates = useCallback(
    (params: Record<string, string>) => {
      setSearchParams((prevParams) => {
        const updatedParams = new URLSearchParams(prevParams)
        Object.entries(params).forEach(([key, value]) => {
          updatedParams.set(key, value)
        })
        return updatedParams
      })
    },
    [setSearchParams],
  )

  return { update: onUpdate, updates: onUpdates }
}
