export enum StakeType {
  Flexible = 0,
}

export enum PoolCategory {
  MAJOR = 'MAJOR',
  USD = 'USD',
  BERA = 'BERA',
  BGT = 'BGT',
  THIRD_PARTY = 'THIRD_PARTY',
}

export type IChequeRaw = {
  id: bigint
  poolId: bigint
  lockId: bigint
  token: `0x${string}`
  account: `0x${string}`
  avgPrice: bigint
  stakedAmount: bigint
  shares: bigint
  lptDebtAmount: bigint
}

export type IReceiptRaw = {
  id: bigint
  poolId: bigint
  lockId: bigint
  token: `0x${string}`
  account: `0x${string}`
  amount: bigint
  lptPayback: bigint
  lockDuration: bigint
  speedupDuration: bigint
  feeToken: `0x${string}`
  feeAmount: bigint
  status: number
  createdAt: bigint
}

export type ILoanRaw = {
  id: bigint
  account: `0x${string}`
  chequeId: bigint
  collateralLptAmount: bigint
  collateralStakedAmount: bigint
  collateralShares: bigint
  debtASugarAmount: bigint
  avgPrice: bigint
  status: number
  liquidateAt: bigint
  createdAt: bigint
  lastClaimedAt: bigint
}
