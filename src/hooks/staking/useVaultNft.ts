import { ABI_NFT_VAULT, useContracts } from '@beraji/web3-sdk'
import { useAccount, useReadContract } from 'wagmi'

export const useNFTVaultCheques = () => {
  const {
    contracts: { nftVault },
  } = useContracts()
  const { address } = useAccount()

  return useReadContract({
    address: nftVault,
    abi: ABI_NFT_VAULT,
    functionName: 'getCheques',
    account: address,
    args: [address!],
  })
}

export const useNFTVaultCheque = (vaultId: bigint) => {
  const cheques = useNFTVaultCheques()
  const data = cheques.data?.find((cheque) => cheque.vaultId === vaultId)
  return {
    ...cheques,
    data,
  }
}
