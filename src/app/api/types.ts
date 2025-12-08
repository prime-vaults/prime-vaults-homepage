export enum DebankChain {
  eth = 'eth',
  bsc = 'bsc',
  core = 'core',
  arb = 'arb',
  bera = 'bera',
}

export type NetBalanceResponse = {
  timestamp: number
  usd_value: number
}

export interface ChainInfo {
  id: string // The chain's id
  community_id: number // The community-identified id
  name: string // The chain's name
  logo_url: string | null // URL of the chain's logo image (nullable)
  native_token_id: string // The native token's id
  wrapped_token_id: string // The address of the native token (wrapped)
  usd_value: number // The price of user assets on this chain
}

export interface UserInfoBalance {
  total_usd_value: number // The price of all assets in a user's account
  points: number
}

export interface UserAssetOverview {
  total_usd_value: number // The price of all assets in a user's account
  chain_list: ChainInfo[] // Array of chain info objects
  points: number
}

export interface TokenInfo {
  id: string // Token contract address
  chain: string // Chain name
  name: string | null // Token name (nullable)
  symbol: string | null // Token symbol (nullable)
  display_symbol: string | null // Displayed symbol (for duplicate symbols)
  optimized_symbol: string | null
  decimals: number | null // Token decimals (nullable)
  logo_url: string | null // Logo URL (nullable)
  is_core: boolean // Show as common token in wallet
  price: number // USD price (0 = no data)
  time_at: number // Token deployment timestamp
  amount: number // User's token amount (formatted)
  raw_amount: number // Raw amount (bigint-safe, integer)
}

export interface ChainInfoWithPercentage extends ChainInfo {
  percentage: number // Percentage of total_usd_value
}
