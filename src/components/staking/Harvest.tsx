import clsx from 'clsx'
import { useHarvest } from '@beraji/web3-sdk'

type HarvestProps = {
  poolId: number
  size?: 'sm' | 'md'
  className?: string
}

export default function Harvest({ poolId, className }: HarvestProps) {
  const harvest = useHarvest()

  return (
    <button
      onClick={() => harvest.mutateAsync(poolId)}
      disabled={harvest.isPending}
      className={clsx('w-auto font-bold', className)}
    >
      {harvest.isPending && <span className="loading loading-spinner" />}
      <p className="!text-sm">HARVEST</p>
    </button>
  )
}
