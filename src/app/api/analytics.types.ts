export interface ApiResponse<T> {
  statusCode: number
  data: T
}

export interface VaultMetrics {
  vaults: Vault[]
  totalVaults: number
}

export interface Vault {
  vaultAddress: string
  chainId: number
  asset: Asset
  contracts: Contracts
  metadata: Metadata
  displayApy: number
  pointMultiplier: number
  rewardCustomApy: RewardCustomApy
  isActive: boolean
  snapshot: Snapshot
}

export interface Asset {
  address: string
  symbol: string
  decimals: number
}

export interface Contracts {
  teller: string
  accountant: string
  distributor: string
  withdrawer: string
}

export interface Metadata {
  name: string
  description: string
}

export interface RewardCustomApy {
  '0x2f6f07cdcf3588944bf4c42ac74ff24bf56e7590'?: number
  '0x779ded0c9e1022225f8e0630b35a9b54be713736'?: number
  '0x549943e04f40284185054145c6e4e9568c1d3241'?: number
}

export interface Snapshot {
  dateKey: number
  totalAmount: number
  tvl: number
  totalShares: string
  apy: number
  rewards: Reward[]
  uniqueStakers: number
  averageStake: number
  pendingWithdrawals: PendingWithdrawals
  lastUpdated: string
}

export interface Reward {
  token: string
  rewardRatePerDay: number
  rewardValuePerDay: number
  periodFinish: number
  rewardsDuration: number
  isActive: boolean
  autoApy: number
  _id: string
  id: string
}

export interface PendingWithdrawals {
  totalPendingShares: number
  totalPendingWithdrawalValue: number
  pendingWithdrawalCount: number
}
