import { useCallback, useEffect, useRef, useState } from 'react'

const DECRYPTED_CHARS =
  '!@#$%^&*()_+=-[]{}<>?/|~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export type UseTypingDecryptOptions = {
  start: boolean
  delay?: number
  speed?: {
    typing?: number
    decrypted?: number
  }
  decryptFrames?: number
  onEnded?: () => any | Promise<any>
  lineDelay?: number // Delay giữa các dòng
}

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function useTypingDecrypt(
  textArray: string[],
  {
    start,
    delay = 0,
    speed = {},
    decryptFrames = 3,
    onEnded,
    lineDelay = 200,
  }: UseTypingDecryptOptions,
) {
  const [textLines, setTextLines] = useState<string[]>([])
  const [ended, setEnded] = useState(false)
  const [endValue, setEndValue] = useState<any>(undefined)
  const [running, setRunning] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  const cancelledRef = useRef(false)
  const onEndedRef = useRef(onEnded)
  const speedRef = useRef(speed)
  const prevStartRef = useRef<boolean>(!!start)
  const prevTextArrayRef = useRef<string[]>(textArray)

  // Keep refs up-to-date
  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  const reset = useCallback(() => {
    console.log('Resetting...')
    cancelledRef.current = true
    requestAnimationFrame(() => {
      cancelledRef.current = false
      setTextLines([])
      setEnded(false)
      setEndValue(undefined)
      setRunning(false)
      setCurrentLineIndex(0)
      prevStartRef.current = false
      prevTextArrayRef.current = textArray
    })
  }, [textArray])

  // Memoize randChar function
  const randChar = useCallback(
    () => DECRYPTED_CHARS[Math.floor(Math.random() * DECRYPTED_CHARS.length)],
    [],
  )

  // Check if arrays are equal
  const arraysEqual = useCallback((a: string[], b: string[]) => {
    if (a.length !== b.length) return false
    return a.every((val, i) => val === b[i])
  }, [])

  useEffect(() => {
    const shouldStart =
      (start && !prevStartRef.current) ||
      (start && !arraysEqual(prevTextArrayRef.current, textArray))

    console.log('useEffect triggered:', {
      start,
      prevStart: prevStartRef.current,
      shouldStart,
      textArray,
      prevTextArray: prevTextArrayRef.current,
    })

    prevStartRef.current = start
    prevTextArrayRef.current = [...textArray]

    if (!shouldStart) return

    console.log('Starting animation...')
    cancelledRef.current = false
    setTextLines([])
    setEnded(false)
    setEndValue(undefined)
    setRunning(true)
    setCurrentLineIndex(0)

    const animate = async () => {
      try {
        const typingSpeed = speedRef.current?.typing ?? 80
        const frameDuration = speedRef.current?.decrypted ?? 20

        if (delay > 0) {
          await wait(delay)
          if (cancelledRef.current) {
            setRunning(false)
            return
          }
        }

        const completedLines: string[] = []

        // Process each line one by one
        for (let lineIndex = 0; lineIndex < textArray.length; lineIndex++) {
          if (cancelledRef.current) {
            setRunning(false)
            return
          }

          setCurrentLineIndex(lineIndex)
          const currentText = textArray[lineIndex]
          let out = ''

          // Animate current line character by character
          for (let i = 0; i < currentText.length; i++) {
            if (cancelledRef.current) {
              setRunning(false)
              return
            }

            const target = currentText[i]

            // Handle whitespace characters (including newlines)
            if (/\s/.test(target)) {
              out += target
              setTextLines([...completedLines, out])
              await wait(typingSpeed)
              continue
            }

            // Decrypt animation frames
            for (let f = 0; f < decryptFrames; f++) {
              if (cancelledRef.current) {
                setRunning(false)
                return
              }
              setTextLines([...completedLines, out + randChar()])
              await wait(frameDuration)
            }

            if (cancelledRef.current) {
              setRunning(false)
              return
            }

            out += target
            setTextLines([...completedLines, out])
            await wait(typingSpeed)
          }

          // Line completed, add to completed lines
          completedLines.push(out)
          setTextLines([...completedLines])

          // Delay between lines (except for the last line)
          if (lineIndex < textArray.length - 1) {
            await wait(lineDelay)
          }
        }

        // All lines completed
        if (!cancelledRef.current) {
          setRunning(false)
          setEnded(true)
          if (onEndedRef.current) {
            try {
              const result = onEndedRef.current()
              if (result instanceof Promise) {
                const resolved = await result
                if (!cancelledRef.current) {
                  setEndValue(resolved)
                }
              } else {
                if (!cancelledRef.current) {
                  setEndValue(result)
                }
              }
            } catch (error) {
              console.warn('Error in onEnded callback:', error)
              if (!cancelledRef.current) {
                setEndValue(undefined)
              }
            }
          }
        }
      } catch (error) {
        console.warn('Error in typing decrypt animation:', error)
        if (!cancelledRef.current) {
          setRunning(false)
        }
      }
    }

    animate()

    return () => {
      cancelledRef.current = true
    }
  }, [start, textArray, delay, decryptFrames, lineDelay, randChar, arraysEqual])

  return {
    textLines,
    ended,
    endValue,
    running,
    currentLineIndex,
    reset,
  }
}
