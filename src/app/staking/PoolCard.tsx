import { usePoolStat } from '@/hooks/usePrimePools'
import {
  formatNumber,
  IPool,
  TokenAvatar,
  TokenName,
  TokenSymbol,
  useRewards,
} from '@beraji/web3-sdk'

const PoolCard = (props: { pool: IPool }) => {
  const poolStat = usePoolStat(props.pool.poolId)
  const rewards = useRewards(props.pool.poolId)

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="avatar">
              <TokenAvatar
                token={props.pool.stakingToken}
                className="size-10"
              />
            </div>
            <div className="flex flex-col ">
              <TokenName
                token={props.pool.stakingToken}
                className="text-xl font-bold"
              />
              <TokenSymbol
                token={props.pool.stakingToken}
                className="text uppercase"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center border-b-base-content/20 justify-between border-b border-dashed py-2">
            Total Value Locked:
            <span className="font-mono font-bold">
              {formatNumber(poolStat.totalValueLocked, '$')}
            </span>
          </div>
          <div className="flex items-center border-b-base-content/20 justify-between border-b border-dashed py-2">
            Rewards:
            <div className="flex gap-2">
              {rewards.data.map((rw) => (
                <div className="avatar">
                  <TokenAvatar token={rw.token} className="size-6" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center border-b-base-content/20 justify-between border-b border-dashed py-2">
            Lock duration:
            <span className="badge  badge-soft">8 days</span>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn btn-primary">Deposit</button>
        </div>
      </div>
    </div>
  )
}

export default PoolCard
