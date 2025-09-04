import clsx from 'clsx'
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useMemo,
} from 'react'

type InputProps = {
  type?: HTMLInputTypeAttribute
  suffix?: ReactNode
  subPrefix?: ReactNode
  inputClassName?: string
  className?: string
  disabled?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export default function Input({
  type = 'text',
  suffix,
  inputClassName = '',
  className = '',
  disabled = false,
  size = 'md',
  subPrefix,
  ...props
}: InputProps) {
  const {
    num: numHeight,
    text: textHeight,
    radius,
  } = useMemo(() => {
    const isResponsive = window.innerWidth < 768
    switch (size) {
      case 'xs':
        return {
          text: isResponsive ? 24 : 28,
          num: isResponsive ? 32 : 40,
          radius: isResponsive ? 8 : 10,
        }
      case 'sm':
        return {
          text: isResponsive ? 28 : 32,
          num: isResponsive ? 40 : 48,
          radius: isResponsive ? 10 : 12,
        }
      case 'md':
        return {
          text: isResponsive ? 32 : 40,
          num: isResponsive ? 42 : 54,
          radius: isResponsive ? 12 : 16,
        }
      case 'lg':
      default:
        return {
          text: isResponsive ? 42 : 54,
          num: isResponsive ? 50 : 64,
          radius: isResponsive ? 16 : 20,
        }
    }
  }, [size])

  const { height, color } = useMemo(() => {
    switch (type) {
      case 'text':
        return {
          height: textHeight,
          color: '#000',
          secondary: '#898989',
        }
      case 'number':
      default:
        return {
          height: numHeight,
          color: '#DA2ACB',
          secondary: '#898989',
        }
    }
  }, [numHeight, textHeight, type])

  return (
    <div
      className={clsx('input ' + className, {
        'bg-[#898989]': disabled,
        'bg-white': !disabled,
      })}
      style={{
        height,
        borderRadius: radius,
        boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.45) inset',
      }}
    >
      <div className="flexbox-col flex-1">
        <input
          {...props}
          type={type}
          className={inputClassName}
          style={{ color: disabled ? '#EDEDED' : color }}
          disabled={disabled}
        />
        {subPrefix}
      </div>
      {suffix}
    </div>
  )
}
