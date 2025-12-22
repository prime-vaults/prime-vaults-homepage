import { Copy } from 'lucide-react'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'

const NEUTRAL = [
  {
    name: '900',
    hex: '#141510',
  },
  {
    name: '800',
    hex: '#1A1A1A',
  },
  {
    name: '500',
    hex: '#3E3E3E',
  },
  {
    name: '300',
    hex: '#878787',
  },
  {
    name: '0',
    hex: '#ffffff',
  },
]

const PRIMARY = [
  {
    name: 'DEEP TEAL',
    hex: '#B2E77B',
  },
  {
    name: 'MIDNIGHT GREEN',
    hex: '#00332C',
  },
  {
    name: 'LIGHT GREEN',
    hex: '#1BC26A',
  },
  {
    name: 'MEDIUM GREEN',
    hex: '#26A168',
  },
  {
    name: 'CHARCOL',
    hex: '#EAFAF0',
  },
]

function ColorCard({ hex, name }: { name: string; hex: string }) {
  const onCopy = () => {
    copy(hex)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="flex flex-col border border-[#3E3E3E]">
      <div className="h-24 w-full" style={{ backgroundColor: hex }} />
      <div className="flex-1 flex flex-col p-4 bg-[#fff]">
        <p className="text-[#121212] font-medium">{name}</p>
        <div
          className="flex flex-row gap-2 items-center cursor-pointer"
          onClick={onCopy}
        >
          <p className="text-[#7A7F89] uppercase">{hex}</p>
          <Copy size={16} color="#000" />
        </div>
      </div>
    </div>
  )
}

export default function Color() {
  return (
    <div className="section-container flex flex-col gap-12">
      <div className="flex flex-col gap-4 text-[#FCFCFD]">
        <span className="text-4xl md:text-8xl font-bold">COLOR</span>
        <p className="text-sm md:text-base font-medium">
          Green for growth, black for strength — the colors of Prime Vaults.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-[32px]">Neutral</p>
        <div className="w-full h-[1px] bg-[#3E3E3E]" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {NEUTRAL.map((color, idx) => (
            <ColorCard key={idx} hex={color.hex} name={color.name} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl">Primary</h2>
        <div className="w-full h-[1px] bg-[#3E3E3E]" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {PRIMARY.map((color, idx) => (
            <ColorCard key={idx} hex={color.hex} name={color.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
