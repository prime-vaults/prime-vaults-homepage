import { Fragment, useState } from 'react'

import { ArrowLeft, XCircle } from 'lucide-react'
import Modal from '@/components/UI/Modal'
import TokenSelection from './TokenSelection'
import DepositForm from './DepositForm'

import { useTokenSelection } from '@/hooks/useTokenAvailable'

export type DepositProps = {
  poolId: number
}
export default function Deposit({ poolId }: DepositProps) {
  const [open, setOpen] = useState(false)
  const { token, reset } = useTokenSelection()

  return (
    <Fragment>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Deposit
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <div className="flex flex-row p-4 justify-between items-center">
            <ArrowLeft className="w-4 cursor-pointer" onClick={reset} />
            <p className="text-base md:text-xl">Deposit Pool#{poolId}</p>
            <div data-modal-close>
              <XCircle className="w-6" />
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          {!token && <TokenSelection />}
          {!!token && <DepositForm />}
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}
