import Factory from './Factory'
import River from './River'

import Container from '@/components/UI/Container'
import Button from '@/components/UI/Button'
import Vault from './Vault'

export default function BannerV2Page() {
  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-base-300 transition-all overflow-auto z-[999]">
      <Container innerClassName="relative flex flex-col">
        <div className="relative min-h-[75dvh] flex flex-row justify-between items-start gap-4 px-6">
          {/* river - position absolute */}
          <div className="absolute left-[4%] top-[40%] w-full md:w-11/12 h-auto object-contain z-0">
            <River />
          </div>
          {/* vault - left side */}
          <div className="mt-52 ml-16">
            <Vault />
          </div>
          {/* text - right side */}
          <div className="md:max-w-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-2xl md:text-5xl font-bold">
              <p>Prime Strategies.</p>
              <p>Best Returns.</p>
              <p>Your On-Chain Smart Saving Accounts.</p>
            </div>
            <Button className="btn btn-primary ">Start now</Button>
          </div>
        </div>

        <Factory />
      </Container>
    </div>
  )
}
