import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
)

export enum Badge {
  PrimeWhale = 'prime_whale',
  PrimeOG = 'prime_og',
  ActiveWallet = 'active_wallet',
  NewSaver = 'new_saver',
}

export type Whitelist = {
  wallet_address: string
  badge: Badge
}

export async function submitWhitelist(address: string, badge: Badge) {
  return await supabase
    .from('whitelist_wallets')
    .insert([{ wallet_address: address.toLowerCase(), badge }])
    .select()
}

export async function getTopWhitelist() {
  return await supabase.from('whitelist_wallets').select('*').range(0, 99)
}

export async function getWhitelistByAddressOrBadge(
  address?: string,
  badge?: Badge,
) {
  let query = supabase.from('whitelist_wallets').select()

  if (address) {
    query = query.eq('wallet_address', address.toLowerCase())
  }

  if (badge) {
    query = query.eq('badge', badge)
  }

  return await query.range(0, 99)
}

export async function countWhitelistWallets() {
  const { count } = await supabase
    .from('whitelist_wallets')
    .select('*', { count: 'exact', head: true })

  return count
}
