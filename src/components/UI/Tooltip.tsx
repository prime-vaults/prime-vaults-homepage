import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
} from 'react'
import ReactDOM from 'react-dom'

import { InfoIcon } from 'lucide-react'

type TooltipProps = {
  type?: keyof DocumentEventMap
  placement?: 'bottom' | 'top'
  target?: ReactNode
  className?: string
  debug?: boolean
} & PropsWithChildren

export default function Tooltip({
  children,
  type = 'mouseenter',
  placement = 'bottom',
  target = <InfoIcon size={24} />,
  className,
  debug = false,
}: TooltipProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const _timeout = useMemo(() => {
    if (debug) return 999999999
    return 150
  }, [debug])

  // handle target hover events
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const showTooltip = () => {
      // Clear any existing hide timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setVisible(true)
    }

    const hideTooltip = () => {
      // Use a small delay to allow for mouse movement between elements
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, _timeout)
    }

    // Setup listeners based on the interaction type
    if (type === 'click') {
      const handleDocumentClick = (e: MouseEvent) => {
        const targetEl = e.target as Node
        if (
          !ref.current?.contains(targetEl) &&
          !tooltipRef.current?.contains(targetEl)
        ) {
          setVisible(false)
        }
      }

      el.addEventListener('click', showTooltip)
      document.addEventListener('click', handleDocumentClick)

      return () => {
        el.removeEventListener('click', showTooltip)
        document.addEventListener('click', handleDocumentClick)
      }
    } else {
      // For hover interactions
      el.addEventListener('mouseenter', showTooltip)
      el.addEventListener('mouseleave', hideTooltip)

      return () => {
        el.removeEventListener('mouseenter', showTooltip)
        el.removeEventListener('mouseleave', hideTooltip)
      }
    }
  }, [_timeout, type])

  // Handle tooltip hover events
  useEffect(() => {
    if (!visible || !tooltipRef.current) return
    const tooltipEl = tooltipRef.current
    const handleTooltipMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    const handleTooltipMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
      }, _timeout)
    }
    tooltipEl.addEventListener('mouseenter', handleTooltipMouseEnter)
    tooltipEl.addEventListener('mouseleave', handleTooltipMouseLeave)
    return () => {
      tooltipEl.removeEventListener('mouseenter', handleTooltipMouseEnter)
      tooltipEl.removeEventListener('mouseleave', handleTooltipMouseLeave)
    }
  }, [_timeout, visible])

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useLayoutEffect(() => {
    if (!visible || !ref.current || !tooltipRef.current) return

    const rect = ref.current.getBoundingClientRect()

    const tooltipWidth = tooltipRef.current.offsetWidth
    const tooltipHeight = tooltipRef.current.offsetHeight

    let left = rect.left
    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 10
    }

    const top =
      placement === 'top'
        ? rect.top + window.scrollY - tooltipHeight - 5
        : rect.bottom + window.scrollY + 5

    setPosition({ top, left })
  }, [visible, placement])

  return (
    <>
      <div ref={ref} className={`cursor-pointer ${className}`}>
        {target}
      </div>
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className="tooltip-container"
            style={{
              top: position.top,
              left: position.left,
              position: 'absolute',
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  )
}
