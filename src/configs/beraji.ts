import { Hex } from 'viem'
import { Env } from './env'

/**
 * Contructor
 */

type Conf = {
  nft_address: Hex
  sugarAddress: Hex
}
const conf: Record<Env, Conf> = {
  development: {
    nft_address: '0xeb922d6788736043a983631a2115b79851c85f73',
    sugarAddress: '0x711B98F4EE9B538036cd0DDc024D4746942BD407',
  },
  staging: {
    nft_address: '0xeb922d6788736043a983631a2115b79851c85f73',
    sugarAddress: '0x711B98F4EE9B538036cd0DDc024D4746942BD407',
  },
  production: {
    nft_address: '0xec5f4668b44ffcbcc8a2d4f894a30a4dc360f6e8',
    sugarAddress: '0xd437095a7aC009dD61036c693d9D77a6B97BF6A9',
  },
}

export default conf
