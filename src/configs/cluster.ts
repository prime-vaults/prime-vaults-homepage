import { Env } from './env'

/**
 * Constructor
 */

type Conf = {
  primeVaultRpc: string
  primeAnalyticsRpc: string
}
const conf: Record<Env, Conf> = {
  development: {
    primeVaultRpc: 'https://prime-vaults-backend.onrender.com',
    primeAnalyticsRpc: 'https://dev-prime-vaults-analytics.onrender.com/api',
  },
  staging: {
    primeVaultRpc: 'https://prime-strategy-backend.onrender.com',
    primeAnalyticsRpc: 'https://dev-prime-vaults-analytics.onrender.com/api',
  },
  production: {
    primeVaultRpc: 'https://prime-strategy-backend.onrender.com',
    primeAnalyticsRpc: 'https://api.primevaults.finance/api',
  },
}

export default conf
