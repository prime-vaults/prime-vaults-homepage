import { Env } from './env'

/**
 * Constructor
 */

type Conf = {
  primeVaultRpc: string
}
const conf: Record<Env, Conf> = {
  development: {
    primeVaultRpc: 'https://prime-vaults-backend.onrender.com',
  },
  staging: {
    primeVaultRpc: 'https://prime-strategy-backend.onrender.com',
  },
  production: {
    primeVaultRpc: 'https://prime-strategy-backend.onrender.com',
  },
}

export default conf
