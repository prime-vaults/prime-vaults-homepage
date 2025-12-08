import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  primeVaultRpc: string
}
const conf: Record<Env, Conf> = {
  development: {
    primeVaultRpc: 'https://prime-vaults-backend.onrender.com',
  },
  staging: {
    primeVaultRpc: 'https://prime-vaults-backend.onrender.com',
  },
  production: {
    primeVaultRpc: 'https://prime-vaults-backend.onrender.com',
  },
}

export default conf
