import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'

import { X } from 'lucide-react'

const ModalContext = createContext<{ onClose?: () => void } | null>(null)

function hasHeader(children: React.ReactNode) {
  let found = false
  const check = (node: any) => {
    if (!node) return
    if (Array.isArray(node)) node.forEach(check)
    else if (node.type === ModalHeader) found = true
    else if (node.props?.children) check(node.props.children)
  }
  check(children)
  return found
}

function ModalHeader({ children }: PropsWithChildren) {
  const ctx = useContext(ModalContext)

  function injectModalClose(
    children: React.ReactNode,
    onClose?: () => void,
  ): React.ReactNode {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child
      const props: any = (child as React.ReactElement).props
      if (props['data-modal-close']) {
        return cloneElement(child as React.ReactElement<any>, {
          onClick: (e: any) => {
            props.onClick?.(e)
            onClose?.()
          },
        })
      }
      if (props.children) {
        return cloneElement(child as React.ReactElement<any>, {
          children: injectModalClose(props.children, onClose),
        })
      }
      return child
    })
  }
  const enhanced = injectModalClose(children, ctx?.onClose)
  return <div className="modal-header">{enhanced}</div>
}

function ModalBody({ children }: PropsWithChildren) {
  return <div className="modal-body">{children}</div>
}

type ModalProps = {
  open?: boolean
  onClose?: () => void
  backdrop?: boolean
  className?: string
  boxClassName?: string
}

function Modal({
  open = false,
  backdrop = true,
  onClose = () => {},
  className,
  boxClassName,
  children,
}: ModalProps & PropsWithChildren) {
  const modalRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
    const dialog = modalRef.current
    if (!dialog) return

    if (open) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [open])

  useLayoutEffect(() => {
    const dialog = modalRef.current
    if (!dialog || !backdrop) return

    // Xử lý click vào backdrop
    const handleBackdropClick = (e: MouseEvent) => {
      const rect = dialog.getBoundingClientRect()
      // Kiểm tra nếu click ngoài modal-box
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        onClose()
      }
    }

    // Xử lý cancel event (Esc key)
    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }

    dialog.addEventListener('click', handleBackdropClick)
    dialog.addEventListener('cancel', handleCancel)

    return () => {
      dialog.removeEventListener('click', handleBackdropClick)
      dialog.removeEventListener('cancel', handleCancel)
    }
  }, [backdrop, onClose])

  return (
    <dialog ref={modalRef} className={`modal justify-center ${className}`}>
      <ModalContext.Provider value={{ onClose }}>
        <div className={`modal-box ${boxClassName}`}>
          {!hasHeader(children) && !!onClose && (
            <X
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            />
          )}
          {!!open && children}
        </div>
      </ModalContext.Provider>
    </dialog>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
export default Modal
