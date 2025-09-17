import { useEffect, useState } from 'react'

const textColors = [
  'text-red-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-orange-500',
  'text-teal-500',
  'text-cyan-500',
  'text-emerald-500',
  'text-lime-500',
  'text-amber-500',
  'text-rose-500',
  'text-violet-500',
  'text-sky-500',
  'text-red-600',
  'text-blue-600',
  'text-green-600',
  'text-purple-600',
  'text-pink-600',
  'text-indigo-600',
]

type RandomTextColorProps = {
  title: string
  className?: string
}

export default function RandomTextColor({
  title,
  className,
}: RandomTextColorProps) {
  const [currentColor, setCurrentColor] = useState(
    textColors[Math.floor(Math.random() * textColors.length)],
  )

  const randomizeColor = () => {
    const randomIndex = Math.floor(Math.random() * textColors.length)
    setCurrentColor(textColors[randomIndex])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      randomizeColor()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`${currentColor} ${className} transition-colors duration-300`}
    >
      {title}
    </span>
  )
}
