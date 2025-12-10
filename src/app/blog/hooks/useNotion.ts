import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const DATA_SOURCE_ID = '2a22441f-a3fc-80b5-81dc-000b19e78833'
const rpc = 'https://prime-vaults-backend.onrender.com'

const primeVaultApi = axios.create({
  baseURL: `${rpc}/public/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useQueryDataSources = ({
  tag,
  pinned,
}: {
  tag?: string
  pinned?: boolean
}) => {
  const query = useQuery({
    queryKey: ['query-source-data', tag, pinned],
    queryFn: async () => {
      const { data } = await primeVaultApi.post(`notion/datasources/query`, {
        data_source_id: DATA_SOURCE_ID,
        tags: tag ? [tag] : undefined,
        pinned,
      })
      return data
    },
  })

  return query
}

export const useGetDataSources = () => {
  const query = useQuery({
    queryKey: ['get-source-data'],
    queryFn: async () => {
      const { data } = await primeVaultApi.get(
        `notion/datasources/${DATA_SOURCE_ID}`,
      )
      return data
    },
  })

  return query
}

export const useGetBlocks = (blockId: string, enabled: boolean) => {
  const query = useQuery({
    queryKey: ['get-block-children', blockId],
    queryFn: async () => {
      const { data } = await primeVaultApi.get(
        `notion/blocks/${blockId}/children`,
      )
      return data
    },
    enabled,
  })

  return query
}
