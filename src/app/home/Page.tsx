import Container from '@/components/UI/Container'
import ScrollingPage from './scrolling/Page'
import FAQPage from './FAQ'
import BannerPage from './banner/Page'
import Portfolio from './Portfolio'
import Integrated from './Integrated'
import Engines from './Engines'
import TimePage from './time/Page'

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
        <TimePage />
        <ScrollingPage />
        <FAQPage />
      </div>
    </Container>
  )
}
