import clsx from 'clsx'
import { useMemo } from 'react'

type CornerProps = { className?: string; cornerClassName?: string }
export default function Corner({ className, cornerClassName }: CornerProps) {
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
      className={clsx(
        'absolute w-full h-full top-0 left-0 pointer-events-none',
        {
          'z-20': !className,
          className,
        },
      )}
    >
      <div className="relative w-full h-full pointer-events-none">
        {cornerConfigs.map((configs, i) => {
          const { className, ...rest } = configs
          return (
            <div
              key={i}
              className={`absolute w-auto h-1/6 aspect-square bg-transparent border-primary pointer-events-none ${className} ${cornerClassName}`}
              style={{ ...rest }}
            />
          )
        })}
      </div>
    </div>
  )
}
