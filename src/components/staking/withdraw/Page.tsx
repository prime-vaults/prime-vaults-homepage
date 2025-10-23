import { Fragment, PropsWithChildren, useState } from 'react'

import { ArrowLeft, XCircle } from 'lucide-react'
import Modal from '@/components/UI/Modal'

import { useTokenSelection } from '@/hooks/useTokenAvailable'
import TokenSelection from './TokenSelection'
import WithdrawForm from './WithdrawForm'

function DefaultButton() {
  return <button className="btn btn-primary">Withdraw</button>
}

export type DepositProps = {
  poolId: number
}
export default function Withdraw({
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
            <ArrowLeft className="w-4 cursor-pointer" onClick={reset} />
            <p className="text-base md:text-xl">
              Target chain to withdraw #{poolId}
            </p>
            <div data-modal-close>
              <XCircle className="w-6" />
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          {!token && <TokenSelection />}
          {!!token && <WithdrawForm />}
        </Modal.Body>
      </Modal>
    </Fragment>
  )
}
