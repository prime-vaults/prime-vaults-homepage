import { Chain, berachain, berachainBepolia } from "wagmi/chains";

import { Env } from "./env";

/**
 * Contructor
 */

type Conf = {
  chain: Chain;
};
const conf: Record<Env, Conf> = {
  development: {
    chain: berachainBepolia,
  },

  staging: {
    chain: berachainBepolia,
  },

  production: {
    chain: berachain,
  },
};

export default conf;
