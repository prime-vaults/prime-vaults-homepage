import clsx from 'clsx'
import { useMemo } from 'react'

type CornerProps = { className?: string }
export default function Corner({ className }: CornerProps) {
  const cornerConfigs = useMemo(
    () => [
      { top: 0, left: 0, className: 'border-t border-l' },
      { top: 0, right: 0, className: 'border-t border-r' },
      { bottom: 0, left: 0, className: 'border-b border-l' },
      { bottom: 0, right: 0, className: 'border-b border-r' },
    ],
    [],
  )
  return (
    <div
      className={clsx('absolute w-full h-full top-0 left-0', {
        'z-20': !className,
        className,
      })}
    >
      <div className="relative w-full h-full">
        {cornerConfigs.map((configs, i) => {
          const { className, ...rest } = configs
          return (
            <div
              key={i}
              className={`absolute w-1/12 h-auto aspect-square bg-transparent border-primary ${className}`}
              style={{ ...rest }}
            />
          )
        })}
      </div>
    </div>
  )
}
