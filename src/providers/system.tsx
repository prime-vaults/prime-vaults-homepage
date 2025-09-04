import { Fragment, ReactNode, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import clsx from 'clsx'

import { X, Ban, CircleCheckBig, Info, ShieldQuestionMark } from 'lucide-react'

const message = ({
  msg,
  type = 'success',
  onClick,
}: {
  msg: string
  type?: 'success' | 'error' | 'warning' | 'information'
  onClick?: () => void
}) => {
  const success = type === 'success'
  const error = type === 'error'
  const warning = type === 'warning'
  const information = type === 'information'

  const id = toast(
    () => (
      <div
        className={clsx('toast-container', {
          success,
          error,
          warning,
          information,
        })}
      >
        {success && <CircleCheckBig size={24} color="#1bc24d" />}
        {error && <Ban size={24} color="#F02D68" />}
        {warning && <ShieldQuestionMark size={24} color="#ffbf35" />}
        {information && <Info size={24} color="#4197FF" />}
        <div className="p-3 flex-1 overflow-x-hidden">
          <p className="text-black text-sm text-medium break-words text-wrap line-clamp-[10]">
            {msg}
          </p>
        </div>
      </div>
    ),
    {
      autoClose: 4000,
      closeButton: ({ closeToast }) => (
        <X
          size={16}
          className="cursor-pointer absolute right-2 top-5 text-default font-bold"
          onClick={() => {
            closeToast()
            toast.dismiss(id)
          }}
        />
      ),
      onClick,
      className: 'flex flex-col p-0 bg-[transparent]',
      progressClassName: clsx('toast-progress-bar', {
        success: type === 'success',
        error: type === 'error',
        warning: type === 'warning',
        information: type === 'information',
      }),
    },
  )
}

export default function SystemProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.jiko.message = message
  }, [])

  return (
    <Fragment>
      <ToastContainer />
      {children}
    </Fragment>
  )
}
