type Props = {
  type: string
  name: string
  className: string
  font: string[]
}

const TYPOGRAPHY: Props[] = [
  {
    type: 'Main font',
    name: 'Space Grotesk',
    className: 'font-space',
    font: ['Light', 'Regular', 'Medium'],
  },
  {
    type: 'Support font',
    name: 'Tomorrow',
    className: 'font-tomorrow',
    font: ['Light', 'Regular', 'Medium'],
  },
]

function TypographyCard({ className, name, font, type }: Props) {
  return (
    <div className="flex flex-col gap-2 md:gap-4 p-8 border border-[#3E3E3E] font-medium text-[#FFF]">
      <h5 className="text-lg">{type}</h5>
      <span className={`text-3xl md:text-6xl mt-4 md:mt-12 ${className}`}>
        {name}
      </span>
      {font && (
        <div className="flex flex-row gap-4">
          {font.map((font, idx) => (
            <p key={idx} className="text-base md:text-lg">
              {font}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Typography() {
  return (
    <div className="section-container grid grid-cols-2 gap-12">
      <div className="col-span-full flex flex-col gap-4">
        <span className="text-4xl md:text-8xl font-bold">TYPOGRAPHY</span>
        <p className="font-medium">
          Space Grotesk brings a precise and engineered feel, with sharp corners
          and subtle ink traps that stand out in both small text and bold
          headlines. Paired with Tomorrow, a futuristic sans-serif, the
          typography balances technical clarity with forward-looking elegance —
          making it suitable for both innovation-driven narratives and timeless
          digital aesthetics.
        </p>
      </div>
      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {TYPOGRAPHY.map((typo, idx) => (
          <TypographyCard key={idx} {...typo} />
        ))}
      </div>
    </div>
  )
}
