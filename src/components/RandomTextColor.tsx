import { useEffect, useState } from 'react'

const textColors = [
  'text-[#EAFAF0]',
  'text-[#26A168]',
  'text-[#1BC26A]',
  'text-[#ECF4FC]',
  'text-[#EFFFB6]',
  'text-[#BDFFB6]',
  'text-[#56D9F6]',
  'text-[#F6C356]',
  'text-[#56F699]',
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
