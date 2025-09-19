import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'

import MatrixEffect from '../components/MatrixEffect'
import PC from './PC'
import Corner from '@/components/UI/Corner'

import { useTypingDecrypt } from '@/hooks/useTyping'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const TEXTS = [
  'Prime Stratgies.',
  'Best Returns.',
  'Your On-Chain Smart Saving Accounts.',
  'Press Enter ↵',
]
let timer: NodeJS.Timeout | undefined = undefined

type WelcomeProps = { onFinished?: () => void }
export default function Welcome({ onFinished = () => {} }: WelcomeProps) {
  const [debug] = useState(true)
  const [start, setStart] = useState(false)
  const [scaleStatus, setScaleStatus] = useState<
    'none' | 'processing' | 'finished'
  >('none')
  const [effectConfigs, setEffectConfigs] = useState({})
  const [finished, setFinished] = useLocalStorage('welcome-finished', false)
  const { textLines, running, ended, reset } = useTypingDecrypt(TEXTS, {
    start,
    speed: { typing: 60, flash: 60 },
    lineDelay: 1500,
    delay: 1000,
  })

  const wRef = useRef<HTMLDivElement | null>(null)
  const mRef = useRef<HTMLDivElement | null>(null)
  const pRef = useRef<HTMLDivElement | null>(null)

  const scalingConfigs = useMemo(
    () => ({
      fadeDuration: 1000,
      transformDuration: 1000,
    }),
    [],
  )

  const randomEffectConfig = useCallback(() => {
    const effects = ['wave', 'attract']
    const modes = ['sides', 'full']
    const styles = ['matrix', 'fade']

    const pick = <T,>(arr: readonly T[]): T =>
      arr[Math.floor(Math.random() * arr.length)]

    return {
      initialEffect: pick(effects),
      initialMode: pick(modes),
      initialStyle: pick(styles),
    }
  }, [])

  // trigger glitch
  useLayoutEffect(() => {
    if (timer) clearInterval(timer)
    if (!ended) return
    timer = setInterval(() => {
      const configs = randomEffectConfig()
      setEffectConfigs(configs)
    }, 3000)
  }, [ended, randomEffectConfig])

  const handleFinishAnimation = useCallback(() => {
    setScaleStatus('finished')
    onFinished()
    setFinished(true)
  }, [onFinished, setFinished])

  const waitForTransition = useCallback(
    (element: HTMLDivElement, property: string, duration: number) => {
      return new Promise<void>((resolve) => {
        let finished = false

        const handleEnd = (e: TransitionEvent) => {
          if (e.target !== element || e.propertyName !== property) return
          if (finished) return
          finished = true
          resolve()
        }
        setTimeout(() => {
          if (finished) return
          finished = true
          element.removeEventListener('transitionend', handleEnd)
          resolve()
        }, duration + 100)

        element.addEventListener('transitionend', handleEnd, { once: true })
      })
    },
    [],
  )

  const onScaling = useCallback(async () => {
    if (!ended || !wRef.current || !mRef.current || !pRef.current) return
    const wrapper = wRef.current
    const mask = mRef.current
    const panel = pRef.current
    const parent = wrapper.parentElement
    if (!parent) return

    // current bounding rects (viewport coords)
    const parentRect = parent.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()

    const parentCenterX = parentRect.left + parentRect.width / 2
    const parentCenterY = parentRect.top + parentRect.height / 2
    const panelCenterX = panelRect.left + panelRect.width / 2
    const panelCenterY = panelRect.top + panelRect.height / 2

    // delta needed so that panelCenter + delta === parentCenter
    const translateX = parentCenterX - panelCenterX
    const translateY = parentCenterY - panelCenterY
    mask.style.transition = `opacity ${scalingConfigs.fadeDuration}ms ease`
    requestAnimationFrame(() => (mask.style.opacity = '0'))
    await waitForTransition(mask, 'opacity', scalingConfigs.fadeDuration)
    panel.style.boxSizing = 'border-box'
    panel.style.width = `${panelRect.width}px`
    wrapper.style.transition = `transform ${scalingConfigs.transformDuration}ms ease`
    void wrapper.offsetWidth
    requestAnimationFrame(() => {
      wrapper.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
    })
    await waitForTransition(
      wrapper,
      'transform',
      scalingConfigs.transformDuration,
    )
    const targetWidthPx = parentRect.width
    panel.style.transition = `width ${scalingConfigs.transformDuration}ms ease`
    void panel.offsetWidth
    requestAnimationFrame(() => (panel.style.width = `${targetWidthPx}px`))
    await waitForTransition(panel, 'width', scalingConfigs.transformDuration)
    handleFinishAnimation()
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        panel.style.width = '100%'
        wrapper.style.transform = ''
        panel.style.transition = ''
        wrapper.style.transition = ''
      }),
    )
  }, [ended, handleFinishAnimation, scalingConfigs, waitForTransition])

  // handle welcome
  useLayoutEffect(() => {
    if (running || finished) return
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && ended) {
        onScaling()
      }
      if (ended) return
      setStart(e.key === 'p')
      // debug mode
      // if (!debug) return
      // if (e.key === 'r') {
      //   setFinished(false)
      //   setScaleStatus('none')
      //   reset()
      // }
    })
    return () => {
      window.removeEventListener('keypress', () => reset())
    }
  }, [ended, finished, onScaling, reset, running, setFinished])

  // touch support
  useLayoutEffect(() => {
    if (running || finished) return

    const touchMap: Record<string, () => void> = {
      p_key: () => !ended && setStart(true),
      enter_key: () => ended && onScaling(),
    }

    const elements: [HTMLElement, () => void][] = []

    Object.entries(touchMap).forEach(([id, handler]) => {
      const el = document.getElementById(id)
      if (!el) return
      elements.push([el, handler])
      el.addEventListener('touchstart', handler)
    })

    return () => {
      elements.forEach(([el, handler]) => {
        el?.removeEventListener('touchstart', handler)
      })
    }
  }, [ended, finished, onScaling, running])

  return (
    <div
      ref={wRef}
      className={clsx(
        'w-full h-full z-[999]',
        { 'fixed top-0 left-0': scaleStatus !== 'finished' && !finished },
        { relative: scaleStatus === 'finished' && finished },
      )}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* background */}
        <div
          ref={mRef}
          className={clsx('absolute top-0 left-0 w-full h-full', {
            hidden: scaleStatus === 'finished' && finished,
            'scroll-not-allow': !finished,
          })}
        >
          {scaleStatus !== 'finished' && !finished && (
            <MatrixEffect debug={debug} {...effectConfigs} />
          )}
        </div>
        {/* content */}
        <div
          ref={pRef}
          className={clsx('relative h-auto aspect-[684/781] bg-no-repeat', {
            'w-full md:w-[45%]': !finished,
            'w-full': finished,
          })}
        >
          <div className="absolute w-full h-full z-[1]">
            <PC />
          </div>
          <div
            className="absolute skew-y-[10deg] z-[2]"
            style={{
              top: `${(173 / 781) * 100}%`,
              left: `${(236 / 684) * 100}%`,
              width: `${(246 / 684) * 100}%`,
              height: `${(180 / 781) * 100}%`,
            }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center px-2 gap-2">
              {!running && !ended && (
                <div className="relative flex flex-row items-center px-2 md:px-4 py-1">
                  <p className="text-sm md:text-base font-bold">
                    Press{' '}
                    <b
                      className="animate-pulse"
                      style={{ animationDuration: '500ms' }}
                    >
                      [P]
                    </b>
                  </p>
                  <Corner />
                </div>
              )}
              {!!running &&
                textLines.map((t, i) => {
                  if (i === textLines.length - 1 && !ended)
                    return (
                      <div
                        className="w-full relative text-sm md:text-xl text-center"
                        key={i}
                      >
                        {t}
                      </div>
                    )
                  return null
                })}
              {ended && !!textLines.length && scaleStatus == 'finished' && (
                <div className="relative text-sm md:text-xl">
                  {textLines[textLines.length - 2]}
                </div>
              )}
              {ended && !!textLines.length && scaleStatus !== 'finished' && (
                <div
                  className="relative text-sm md:text-2xl animate-pulse"
                  style={{ animationDuration: '600ms' }}
                >
                  {textLines[textLines.length - 1]}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
