import clsx from 'clsx'
import { ReactNode, useMemo } from 'react'

export type TabItem<T = string> = {
  key: T
  label: string
  disabledItem?: boolean
  icon?: ReactNode
}

type TabProps<T> = {
  items: TabItem<T>[]
  activeKey?: T
  onClick?: (key: T) => void
  className?: string
  itemClassName?: string
  vertical?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xs'
  disabled?: boolean
}

export default function Tab<T extends string | number | symbol>({
  items = [],
  activeKey,
  onClick = () => {},
  className = '',
  vertical = false,
  itemClassName = '',
  size = 'sm',
  disabled = false,
}: TabProps<T>) {
  const height = useMemo(() => {
    if (vertical) return 'auto'

    switch (size) {
      case 'xs':
        return 32
      case 'sm':
        return 36
      case 'lg':
        return 54
      case 'md':
      default:
        return 42
    }
  }, [size, vertical])

  return (
    <div
      className={clsx(
        `flex items-center p-1 w-full md:w-fit bg-[#000] rounded-2xl ${className}`,
        {
          'flex-row overflow-auto md:overflow-visible': !vertical,
          'flex-col': vertical,
        },
      )}
      style={{ height }}
    >
      {items.map(({ key, label, disabledItem, icon }) => {
        const isActive = key === activeKey
        return (
          <div
            className={clsx(
              'relative overflow-hidden min-w-max w-fit px-5 md:px-3 py-1 text-center cursor-pointer select-none h-full flex items-center gap-1' +
                itemClassName,
              {
                'bg-[#4197FF] rounded-xl': isActive,
                'bg-[#535151]': isActive && disabled,
                'w-full md:w-fit justify-center': !vertical,
                'w-full': vertical,
                '!cursor-not-allowed': disabled || disabledItem,
              },
            )}
            onClick={() => {
              if (disabledItem) return
              return !disabled && onClick(key)
            }}
            key={key as any}
          >
            <div
              className={clsx(
                'absolute w-6 aspect-square bg-[#FF93DD] rotate-45 top-0 left-0 z-[1]',
                {
                  'opacity-0 -translate-x-full -translate-y-full': !isActive,
                  'opacity-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-300':
                    isActive,
                },
              )}
            />
            {icon}
            <p
              className={clsx('text-nowrap whitespace-nowrap', {
                'text-white': !disabled || !disabledItem,
                '!text-[#ededed80]': disabled || disabledItem,
              })}
              style={{
                fontSize: size === 'xs' ? 14 : 16,
              }}
            >
              {label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
