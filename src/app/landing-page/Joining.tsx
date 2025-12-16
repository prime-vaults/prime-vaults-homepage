import { useQuery } from '@tanstack/react-query'
import { countWhitelistWallets } from '../api/supabase'

export default function Joining() {
  const { data: total } = useQuery({
    queryKey: ['get-joining'],
    queryFn: async () => {
      return await countWhitelistWallets()
    },
  })

  if (!total) return null
  return (
    <h3
      className="font-bold text-center text-primary"
      style={{
        fontStyle: 'italic',
      }}
    >
      {total} are in the closed-beta
    </h3>
  )
}
