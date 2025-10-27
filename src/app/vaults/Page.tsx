import Container from '@/components/UI/Container'
import VaultCard from './VaultCard'

import { usePrimePools } from '@/hooks/usePrimePools'

export default function VaultPage() {
  const pools = usePrimePools()
  return (
    <Container>
      <div className="grid grid-cols-1">
        <div className="flex flex-col justify-center items-center py-6 md:py-8 px-4 md:px-6 font-tomorrow">
          <p className="text-base">WELCOME TO THE</p>
          <h1 className="text-2xl md:text-5xl font-bold">
            <b className="text-primary">PRIME</b> VAULTS
          </h1>
          <span className="text-base">
            A superior yield platform powered by{' '}
            <b className="text-primary">AI</b>
          </span>
        </div>
        <div className="grid grid-cols-1">
          {pools.data.map((pool) => (
            <VaultCard pool={pool} />
          ))}
        </div>
      </div>
    </Container>
  )
}
