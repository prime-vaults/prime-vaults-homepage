import { useMemo, useState, useLayoutEffect } from 'react'

/**
 * Scale path tự động bằng bounding-box tính từ d string.
 * @param basePath - chuỗi `d` của path gốc
 * @param parentSize - [width, height] thực tế của element cha
 * @param viewBoxDelta - optional: [deltaWidth, deltaHeight] để điều chỉnh base viewBox (cộng vào)
 *
 * Example: useScaledPath(path, [244.06, 96], [0, -116])
 */
export function useScaledPath(
  basePath: string,
  parentSize: [number, number],
  viewBoxDelta: [number, number] = [0, 0],
): string {
  return useMemo(() => {
    const [parentWidth, parentHeight] = parentSize
    if (!parentWidth || !parentHeight) return basePath

    // Lấy tất cả cặp toạ độ x,y từ path
    const matches = [
      ...basePath.matchAll(/([+-]?\d*\.?\d+)[ ,]+([+-]?\d*\.?\d+)/g),
    ]
    const coords: [number, number][] = matches.map((m) => [
      parseFloat(m[1]),
      parseFloat(m[2]),
    ])

    if (!coords.length) return basePath

    const xs = coords.map(([x]) => x)
    const ys = coords.map(([, y]) => y)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)

    // base width/height từ bounding box, sau đó cộng delta (có thể âm)
    const computedWidth = maxX - minX
    const computedHeight = maxY - minY
    const baseWidth = computedWidth + (viewBoxDelta[0] ?? 0)
    const baseHeight = computedHeight + (viewBoxDelta[1] ?? 0)

    // Tránh chia cho 0 hoặc âm
    if (!(baseWidth > 0) || !(baseHeight > 0)) return basePath

    const scaleX = parentWidth / baseWidth
    const scaleY = parentHeight / baseHeight

    // Scale từng cặp toạ độ: dịch -minX/minY để bắt đầu tại (0,0), sau đó scale
    const scaledPath = basePath.replace(
      /([+-]?\d*\.?\d+)[ ,]+([+-]?\d*\.?\d+)/g,
      (_, x: string, y: string) => {
        const nx = (parseFloat(x) - minX) * scaleX
        const ny = (parseFloat(y) - minY) * scaleY
        return `${nx.toFixed(2)} ${ny.toFixed(2)}`
      },
    )

    return scaledPath
  }, [basePath, parentSize, viewBoxDelta])
}

/**
 * Hook trả về width/height realtime của 1 element (qua ref).
 * Tự detect type element (div, img, canvas, v.v.).
 *
 * @param ref - React ref của element (ví dụ: useRef<HTMLDivElement>(null))
 * @returns { width, height } realtime
 */
export function useElementSize<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      setSize({
        width: rect.width,
        height: rect.height,
      })
    }

    updateSize()

    const observer = new ResizeObserver(() => updateSize())
    observer.observe(el)

    window.addEventListener('resize', updateSize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [ref])

  return size
}
