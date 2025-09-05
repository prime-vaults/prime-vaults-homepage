import { PropsWithChildren, useLayoutEffect, useRef } from 'react'

import { X } from 'lucide-react'

type ModalProps = {
  open?: boolean
  onClose?: () => void
  backdrop?: boolean
}
export default function Modal({
  open = false,
  backdrop = true,
  onClose = () => {},
  children,
}: ModalProps & PropsWithChildren) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    if (!modalRef.current) return
    if (open) modalRef.current.show()
    else modalRef.current.close()
  }, [open])

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        {!!onClose && (
          <X
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          />
        )}
        {!!open && children}
      </div>
      {!!backdrop && (
        <form method="dialog" className="modal-backdrop" onClick={onClose} />
      )}
    </dialog>
  )
}
