import { Fragment, PropsWithChildren, useState } from 'react'

import { MoveLeft, XCircle } from 'lucide-react'
import Modal from '@/components/UI/Modal'
import TokenSelection from './TokenSelection'
import DepositForm from './DepositForm'

import { useTokenSelection } from '@/hooks/useTokenAvailable'

function DefaultButton() {
  return <button className="btn btn-primary">Deposit</button>
}

export type DepositProps = {
  poolId: number
}
export default function Deposit({
  poolId,
  children = <DefaultButton />,
}: DepositProps & PropsWithChildren) {
  const [open, setOpen] = useState(false)
  const { token, reset } = useTokenSelection()

  return (
    <Fragment>
      <div onClick={() => setOpen(true)}>{children}</div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <div className="flex flex-row p-4 justify-between items-center">
            <MoveLeft className="w-6 cursor-pointer" onClick={reset} />
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
