import { env } from './env'
import chain from './chain'
import cluster from './cluster'
import network from './network'
import beraji from './beraji'

const configs = {
  env,
  chain: chain[env],
  cluster: cluster[env],
  network: network[env],
  beraji: beraji[env],
}

/**
 * Module exports
 */
export default configs
