import { useMemo, useState, useLayoutEffect } from 'react'

/**
 * Scale path tự động bằng bounding-box hoặc theo viewBox gốc.
 * @param basePath - chuỗi `d` của path gốc
 * @param parentSize - [width, height] thực tế của element cha
 * @param viewBoxDelta - optional: [deltaWidth, deltaHeight] để điều chỉnh base viewBox (cộng vào)
 * @param originalViewBox - optional: [viewBoxX, viewBoxY, svg_width, height] nếu path không full viewBox
 *
 * Example:
 * useScaledPath(path, [244.06, 96], [0, -116])
 * useScaledPath(path, [244.06, 96], [0, 0], [0, 0, 350, 398])
 */
interface ScaledPathData {
  basePath: string
  parentSize: [number, number]
  viewBoxDelta?: [number, number]
  originalViewBox?: [number, number, number, number]
}
export function useScaledPath({
  basePath,
  parentSize,
  viewBoxDelta = [0, 0],
  originalViewBox,
}: ScaledPathData): string {
  return useMemo(() => {
    const [parentWidth, parentHeight] = parentSize
    if (!parentWidth || !parentHeight) return basePath

    // Parse tất cả coordinates từ path
    const segments = basePath.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || []

    // Collect all coordinate pairs để tính bounding box (nếu cần)
    const coords: [number, number][] = []
    segments.forEach((seg) => {
      const cmd = seg[0].toUpperCase()
      const values = seg
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(Number)
        .filter((n) => !isNaN(n))

      if (cmd === 'H' || cmd === 'V') {
        // Horizontal line - chỉ có x, giữ y từ point trước
        // Skip cho bounding box vì không có y mới
        // Vertical line - chỉ có y, giữ x từ point trước
        // Skip cho bounding box vì không có x mới
      } else {
        // Các commands khác có cặp x,y
        for (let i = 0; i < values.length; i += 2) {
          if (values[i + 1] !== undefined) {
            coords.push([values[i], values[i + 1]])
          }
        }
      }
    })

    if (!coords.length) return basePath

    let offsetX: number, offsetY: number, baseWidth: number, baseHeight: number

    if (originalViewBox) {
      const [vbX, vbY, vbW, vbH] = originalViewBox
      offsetX = vbX
      offsetY = vbY
      baseWidth = vbW + viewBoxDelta[0]
      baseHeight = vbH + viewBoxDelta[1]
    } else {
      const xs = coords.map(([x]) => x)
      const ys = coords.map(([, y]) => y)
      const minX = Math.min(...xs)
      const minY = Math.min(...ys)
      const maxX = Math.max(...xs)
      const maxY = Math.max(...ys)

      offsetX = minX
      offsetY = minY
      baseWidth = maxX - minX + viewBoxDelta[0]
      baseHeight = maxY - minY + viewBoxDelta[1]
    }

    if (!(baseWidth > 0) || !(baseHeight > 0)) return basePath

    const scaleX = parentWidth / baseWidth
    const scaleY = parentHeight / baseHeight

    // Scale từng segment
    let scaledPath = ''

    segments.forEach((seg) => {
      const cmd = seg[0]
      const cmdUpper = cmd.toUpperCase()
      const values = seg
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(Number)
        .filter((n) => !isNaN(n))

      scaledPath += cmd

      if (cmdUpper === 'H') {
        // Horizontal line - chỉ scale x
        const x = (values[0] - offsetX) * scaleX
        scaledPath += x.toFixed(2)
      } else if (cmdUpper === 'V') {
        // Vertical line - chỉ scale y
        const y = (values[0] - offsetY) * scaleY
        scaledPath += y.toFixed(2)
      } else if (cmdUpper === 'M' || cmdUpper === 'L' || cmdUpper === 'T') {
        // Move, Line, Smooth quadratic - cặp x,y
        for (let i = 0; i < values.length; i += 2) {
          const x = (values[i] - offsetX) * scaleX
          const y = (values[i + 1] - offsetY) * scaleY
          scaledPath += `${x.toFixed(2)} ${y.toFixed(2)}`
          if (i + 2 < values.length) scaledPath += ' '
        }
      } else if (cmdUpper === 'C') {
        // Cubic bezier - 3 cặp x,y
        for (let i = 0; i < values.length; i += 2) {
          const x = (values[i] - offsetX) * scaleX
          const y = (values[i + 1] - offsetY) * scaleY
          scaledPath += `${x.toFixed(2)} ${y.toFixed(2)}`
          if (i + 2 < values.length) scaledPath += ' '
        }
      } else if (cmdUpper === 'S' || cmdUpper === 'Q') {
        // Smooth cubic, Quadratic - 2 cặp x,y
        for (let i = 0; i < values.length; i += 2) {
          const x = (values[i] - offsetX) * scaleX
          const y = (values[i + 1] - offsetY) * scaleY
          scaledPath += `${x.toFixed(2)} ${y.toFixed(2)}`
          if (i + 2 < values.length) scaledPath += ' '
        }
      } else if (cmdUpper === 'A') {
        // Arc - rx,ry,rotation,large-arc,sweep,x,y
        for (let i = 0; i < values.length; i += 7) {
          const rx = values[i] * scaleX
          const ry = values[i + 1] * scaleY
          const rotation = values[i + 2]
          const largeArc = values[i + 3]
          const sweep = values[i + 4]
          const x = (values[i + 5] - offsetX) * scaleX
          const y = (values[i + 6] - offsetY) * scaleY
          scaledPath += `${rx.toFixed(2)} ${ry.toFixed(
            2,
          )} ${rotation} ${largeArc} ${sweep} ${x.toFixed(2)} ${y.toFixed(2)}`
          if (i + 7 < values.length) scaledPath += ' '
        }
      } else if (cmdUpper === 'Z') {
        // Close path - không có params
      }
    })

    return scaledPath
  }, [basePath, originalViewBox, parentSize, viewBoxDelta])
}
// export function useScaledPath({
//   basePath,
//   parentSize,
//   viewBoxDelta = [0, 0],
//   originalViewBox,
// }: ScaledPathData): string {
//   return useMemo(() => {
//     const [parentWidth, parentHeight] = parentSize
//     if (!parentWidth || !parentHeight) return basePath

//     let offsetX: number, offsetY: number, baseWidth: number, baseHeight: number

//     if (originalViewBox) {
//       const [vbX, vbY, vbW, vbH] = originalViewBox
//       offsetX = vbX
//       offsetY = vbY
//       baseWidth = vbW + viewBoxDelta[0]
//       baseHeight = vbH + viewBoxDelta[1]
//     } else {
//       // Parse tất cả coordinates để tính bounding box
//       const coords: number[] = []
//       const xCoords: number[] = []
//       const yCoords: number[] = []

//       // Lấy tất cả số trong path
//       const numbers = basePath.match(/[+-]?\d*\.?\d+/g)?.map(Number) || []

//       // Track current position và lệnh trước
//       let currentX = 0,
//         currentY = 0
//       let i = 0

//       for (const char of basePath) {
//         if (/[MLHVCSQTAZ]/i.test(char)) {
//           const cmd = char
//           const isRelative = char === char.toLowerCase()

//           switch (cmd.toUpperCase()) {
//             case 'M':
//             case 'L':
//             case 'T':
//               currentX = isRelative ? currentX + numbers[i] : numbers[i]
//               currentY = isRelative ? currentY + numbers[i + 1] : numbers[i + 1]
//               xCoords.push(currentX)
//               yCoords.push(currentY)
//               i += 2
//               break
//             case 'H':
//               currentX = isRelative ? currentX + numbers[i] : numbers[i]
//               xCoords.push(currentX)
//               i += 1
//               break
//             case 'V':
//               currentY = isRelative ? currentY + numbers[i] : numbers[i]
//               yCoords.push(currentY)
//               i += 1
//               break
//             case 'C':
//               i += 4 // skip control points
//               currentX = isRelative ? currentX + numbers[i] : numbers[i]
//               currentY = isRelative ? currentY + numbers[i + 1] : numbers[i + 1]
//               xCoords.push(currentX)
//               yCoords.push(currentY)
//               i += 2
//               break
//             case 'S':
//             case 'Q':
//               i += 2 // skip control point
//               currentX = isRelative ? currentX + numbers[i] : numbers[i]
//               currentY = isRelative ? currentY + numbers[i + 1] : numbers[i + 1]
//               xCoords.push(currentX)
//               yCoords.push(currentY)
//               i += 2
//               break
//           }
//         }
//       }

//       offsetX = Math.min(...xCoords)
//       offsetY = Math.min(...yCoords)
//       baseWidth = Math.max(...xCoords) - offsetX + viewBoxDelta[0]
//       baseHeight = Math.max(...yCoords) - offsetY + viewBoxDelta[1]
//     }

//     if (!(baseWidth > 0) || !(baseHeight > 0)) return basePath

//     const scaleX = parentWidth / baseWidth
//     const scaleY = parentHeight / baseHeight

//     // Scale tất cả numbers trong path
//     const scaledPath = basePath.replace(
//       /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi,
//       (match, cmd, args) => {
//         const isRelative = cmd === cmd.toLowerCase()
//         const command = cmd.toUpperCase()

//         // Lấy numbers từ args
//         const nums = args.match(/[+-]?\d*\.?\d+/g)?.map(Number) || []
//         let scaledNums: number[] = []

//         // Track current position cho relative commands

//         switch (command) {
//           case 'M':
//           case 'L':
//           case 'T':
//             scaledNums = [
//               (nums[0] - offsetX) * scaleX,
//               (nums[1] - offsetY) * scaleY,
//             ]
//             break
//           case 'H':
//             scaledNums = [(nums[0] - offsetX) * scaleX]
//             break
//           case 'V':
//             scaledNums = [(nums[0] - offsetY) * scaleY]
//             break
//           case 'C':
//             scaledNums = [
//               (nums[0] - offsetX) * scaleX,
//               (nums[1] - offsetY) * scaleY,
//               (nums[2] - offsetX) * scaleX,
//               (nums[3] - offsetY) * scaleY,
//               (nums[4] - offsetX) * scaleX,
//               (nums[5] - offsetY) * scaleY,
//             ]
//             break
//           case 'S':
//           case 'Q':
//             scaledNums = [
//               (nums[0] - offsetX) * scaleX,
//               (nums[1] - offsetY) * scaleY,
//               (nums[2] - offsetX) * scaleX,
//               (nums[3] - offsetY) * scaleY,
//             ]
//             break
//           case 'A':
//             // Arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
//             scaledNums = [
//               nums[0] * scaleX, // rx
//               nums[1] * scaleY, // ry
//               nums[2], // rotation
//               nums[3], // large-arc
//               nums[4], // sweep
//               (nums[5] - offsetX) * scaleX,
//               (nums[6] - offsetY) * scaleY,
//             ]
//             break
//           default:
//             return match
//         }

//         return cmd + scaledNums.map((n) => n.toFixed(2)).join(' ')
//       },
//     )

//     return scaledPath
//   }, [basePath, originalViewBox, parentSize, viewBoxDelta])
// }
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
