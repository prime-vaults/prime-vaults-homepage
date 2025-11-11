import Factory from './Factory'
import River from './River'

import Container from '@/components/UI/Container'
import Button from '@/components/UI/Button'
import Vault from './Vault'

export default function BannerV2Page() {
  return (
    <Container innerClassName="relative flex flex-col border-none">
      <div className="relative flex flex-row items-start gap-4 md:gap-16 px-6 z-30">
        {/* vault - left side */}
        <div className="mt-[4dvw] md:ml-4">
          <Vault />
        </div>
        {/* text - right side */}
        <div className="relative md:max-w-1/2 flex-1 z-20">
          <div className="absolute top-0 left-0 w-full flex flex-col gap-4 pt-6 md:pt-24">
            <div className="flex flex-col md:gap-2 text-xl md:text-5xl font-bold uppercase">
              <p>Prime Strategies.</p>
              <p className="text-primary">Best Returns.</p>
              <p className="text-primary">
                Your On-Chain Smart Saving Accounts.
              </p>
            </div>
            <Button className="btn btn-primary btn-xs md:btn-lg w-fit !px-6">
              Start now
            </Button>
          </div>
        </div>
      </div>
      {/* river */}
      <div className="w-9/12 md:w-10/12 -mt-[10dvw] mx-auto h-auto object-contain">
        <River />
      </div>
      <Factory />
    </Container>
  )
}
