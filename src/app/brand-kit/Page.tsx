import { ArrowDownToLine } from 'lucide-react'

import Container from '@/components/UI/Container'
import Color from './Color'
import Typography from './Typography'
import Logo from './Logo'

export default function BrandKitPage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="section-container flex flex-row">
        <p className="text-[120px] font-bold uppercase leading-[150px]">
          Brand Guildelines
        </p>
        <button className="btn btn-primary flex flex-row gap-2 !px-6 py-3">
          <p className="font-medium">Download all Brand Assets</p>
          <ArrowDownToLine width={18} />
        </button>
      </div>
      <Logo />
      <Color />
      <Typography />
    </Container>
  )
}
