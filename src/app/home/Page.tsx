import Container from '@/components/UI/Container'
import EarnPage from './Earn'
import TimePage from './Time'
import ScrollingPage from './scrolling/Page'
import FAQPage from './FAQ'
import BannerPage from './banner/Page'
import Portfolio from './Portfolio'
import Integrated from './Integrated'
import Engines from './Engines'

export default function HomePage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="flex flex-col">
        <BannerPage />
        <Portfolio />
        <Integrated />
        <Engines />
        <EarnPage />
        <TimePage />
        <ScrollingPage />
        <FAQPage />
      </div>
    </Container>
  )
}
