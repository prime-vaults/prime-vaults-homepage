import Button from '@/components/UI/Button'
import { useState } from 'react'
import { isAddress } from 'viem'

type InputWalletProps = {
  onCheck: (address: string) => void
}
export default function InputWallet({ onCheck }: InputWalletProps) {
  const [input, setInput] = useState('')
  const pasteInput = async () => {
    const text = await navigator.clipboard.readText()
    setInput(text)
  }

  return (
    <div className="flex flex-col p-5 md:p-10 gap-5 md:gap-10">
      <div className="flex flex-col gap-2 md:gap-3">
        <h2>Enter your wallet address</h2>
        <p className="">Paste any EVM wallet to check your points.</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <input
          placeholder="Paste your address here"
          className="input bg-transparent flex-1 outline-none! border! border-secondary!"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />

        <Button
          onClick={pasteInput}
          className="btn bg-transparent border border-secondary"
        >
          Paste
        </Button>
      </div>
      {!!input && !isAddress(input) && (
        <span className="-mt-4 md:-mt-9 text-xs text-error">
          Invalid wallet address
        </span>
      )}
      <Button
        disabled={!isAddress(input)}
        className="btn btn-primary w-fit md:px-6!"
        onClick={() => onCheck(input)}
      >
        Check
      </Button>
      <p className="text-[#878787]">
        By clicking Check, you agree to let us read your Debank portfolio for
        point calculation. <br />
        <br /> Your data is protected by Prime Vaults
      </p>
    </div>
  )
}
