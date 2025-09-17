import eImg from '@/static/images/banner/e.png'
import iImg from '@/static/images/banner/i.png'
import mImg from '@/static/images/banner/m.png'
import pImg from '@/static/images/banner/p.png'
import rImg from '@/static/images/banner/r.png'
import enterImg from '@/static/images/banner/enter.png'
import kImg from '@/static/images/banner/keyboard.png'
import pcImg from '@/static/images/banner/pc.png'
import { useLayoutEffect, useMemo } from 'react'

export const BASE_WIDTH = 684
export const BASE_HEIGHT = 781
export const BASE_KEYBOARD_WIDTH = 500
export const BASE_KEYBOARD_HEIGHT = 271
export const BASE_KEYBOARD_RATIO = BASE_KEYBOARD_WIDTH / BASE_KEYBOARD_HEIGHT
export const BASE_PC_WIDTH = 540
export const BASE_PC_HEIGHT = 641
export const BASE_PC_RATIO = BASE_PC_WIDTH / BASE_PC_HEIGHT
export const BASE_KEY_WIDTH = 137
export const BASE_KEY_HEIGHT = 122
export const BASE_KEY_RATIO = BASE_KEY_WIDTH / BASE_KEY_HEIGHT

export default function PC() {
  const keys = useMemo(() => {
    return [
      { img: pImg, positions: { x: 24, y: -2 }, id: 'p_key' },
      { img: rImg, positions: { x: 43, y: 7 }, id: 'r_key' },
      { img: iImg, positions: { x: 62, y: 18 }, id: 'i_key' },
      { img: eImg, positions: { x: 12, y: 23 }, id: 'e_key' },
      { img: mImg, positions: { x: 31, y: 33 }, id: 'm_key' },
      { img: enterImg, positions: { x: 50, y: 43 }, id: 'enter_key' },
    ]
  }, [])

  useLayoutEffect(() => {
    const keyMap: Record<string, string> = {
      Enter: 'enter_key',
      p: 'p_key',
      r: 'r_key',
      i: 'i_key',
      e: 'e_key',
      m: 'm_key',
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const elId = keyMap[e.key]
      if (!elId) return
      const el = document.getElementById(elId)
      if (el) el.classList.add('anim-press')
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const elId = keyMap[e.key]
      if (!elId) return
      const el = document.getElementById(elId)
      if (el) el.classList.remove('anim-press')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <img
        className="absolute top-0 right-0 ri h-auto z-[1]"
        style={{
          width: `${(BASE_PC_WIDTH / BASE_WIDTH) * 100}%`,
          aspectRatio: BASE_PC_RATIO,
        }}
        src={pcImg}
      />
      <div
        className="absolute left-0 bottom-0 h-auto z-[2]"
        style={{
          width: `${(BASE_KEYBOARD_WIDTH / BASE_WIDTH) * 100}%`,
          aspectRatio: BASE_KEYBOARD_RATIO,
        }}
      >
        <div className="relative w-full h-full">
          <img
            src={kImg}
            className="relative w-full h-full object-contain z-[0]"
          />
          {keys.map(({ img, positions, id }) => (
            <img
              key={id}
              id={id}
              className="absolute top-0 left-[25%] h-auto z-[1]"
              style={{
                width: `${(BASE_KEY_WIDTH / BASE_KEYBOARD_WIDTH) * 100}%`,
                aspectRatio: BASE_KEY_RATIO,
                top: `${positions.y}%`,
                left: `${positions.x}%`,
              }}
              src={img}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
