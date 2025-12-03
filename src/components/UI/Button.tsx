import clsx from 'clsx'
import React, { useState } from 'react'

type ReactBtnProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type BtnProps = ReactBtnProps & {
  children: React.ReactNode
  loading?: boolean
}

const Button = ({ children, loading, disabled, ...rest }: BtnProps) => {
  const [internalLoading, setInternalLoading] = useState(false)

  const handleOnClick = async (e: any) => {
    try {
      setInternalLoading(true)
      if (rest.onClick) await rest.onClick(e)
    } catch (error: any) {
      console.log(error)
    } finally {
      setInternalLoading(false)
    }
  }

  const isLoading = loading || internalLoading

  return (
    <button
      {...rest}
      className={clsx(`${rest.className}`, {
        '!cursor-not-allowed !bg-[#898989] !text-[#BBBBBB]': disabled,
      })}
      disabled={disabled || isLoading}
      onClick={handleOnClick}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
