import Container from '@/components/UI/Container'
import { usePrimePools } from '@/hooks/usePrimePools'
import PoolCard from './PoolCard'

export default function StakingPage() {
  const pools = usePrimePools()
  return (
    <Container>
      <div>
        <h1 className="text-2xl font-bold mb-4">Vaults</h1>
        <div className="grid grid-cols-3 gap-4">
          {pools.data.map((pool) => (
            <PoolCard pool={pool} />
          ))}
        </div>
      </div>
    </Container>
  )
}
