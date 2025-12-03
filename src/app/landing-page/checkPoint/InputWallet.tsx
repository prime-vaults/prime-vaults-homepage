import Button from '@/components/UI/Button'
import { isAddress } from 'viem'

type InputWalletProps = {
  address: string
  setAddress: (address: string) => void
}
export default function InputWallet({ address, setAddress }: InputWalletProps) {
  const pasteInput = async () => {
    const text = await navigator.clipboard.readText()
    setAddress(text)
  }
  return (
    <div className="check-point">
      <div className="flex flex-col gap-8 px-4">
        <p className="font-medium text-3xl">Enter your wallet address</p>
        <p className="-mt-6">Paste any EVM wallet to check your points.</p>
        <div className="flex flex-row items-center gap-2">
          <input
            placeholder="Paste your wallet address here"
            className="input bg-transparent flex-1"
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />

          <Button onClick={pasteInput} className="btn bg-transparent">
            Paste
          </Button>
        </div>
        {!!address && !isAddress(address) && (
          <p className="-mt-5 text-xs text-error">Invalid wallet address</p>
        )}
        <Button disabled={!isAddress(address)} className="btn btn-primary">
          Check
        </Button>
        <p className="text-[#878787]">
          By clicking Check, you agree to let us read your Debank portfolio for
          point calculation.
        </p>
        <p className=" text-[#878787] -mt-2">
          Your data is protected by Prime Vaults
        </p>
      </div>
      <div />
    </div>
  )
}
