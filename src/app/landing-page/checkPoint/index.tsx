import { useState } from 'react'

import { X } from 'lucide-react'
import Corner from '@/components/UI/Corner'
import InputWallet from './InputWallet'
import Modal from '@/components/UI/Modal'
import Checking from './Checking'
import Result from './Result'

import ASSET from '@/static/images/landing-page/asset.png'

export default function CheckPoint() {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')

  const onClose = (e: any) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div
      onClick={() => setOpen(true)}
      className="relative w-full grid grid-cols-5 gap-4 items-center border border-base-100 cursor-pointer group/point"
    >
      <Corner />
      <div className="absolute top-0 left-0 w-0 group-hover/point:w-full h-full bg-gradient-to-r from-0% from-[var(--color-primary)] to-100% transition-all" />
      <img
        className="col-span-2 w-full h-auto object-contain scale-[1.4] z-[99]"
        src={ASSET}
      />
      <div className="col-span-3 flex flex-col">
        <p className="text-2xl md:text-4xl">Check Your Points</p>
        <span className="text-primary cursor-pointer">
          You might be surprised
        </span>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="check-point">
          <div className="flex flex-row items-center justify-between">
            <img className="w-auto h-10 object-contain" src="/logo.svg" />
            <X onClick={onClose} />
          </div>
          <InputWallet address={address} setAddress={setAddress} />
          <Checking />
          <Result />
          <div />
        </div>
      </Modal>
    </div>
  )
}
