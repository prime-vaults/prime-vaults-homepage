import { formatUiNumber } from '@/helpers/utils'
import { usePoolStat } from '@/hooks/staking/usePools'

export default function TotalAPR({ poolId }: { poolId: number }) {
  const { apr } = usePoolStat(poolId)
  return <p>{formatUiNumber(apr * 100)}%</p>
}
