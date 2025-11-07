import Container from '@/components/UI/Container'
import ScrollingPage from './scrolling/Page'
import FAQPage from './FAQ'
import Portfolio from './Portfolio'
import Integrated from './Integrated'
import Engines from './Engines'
import TimePage from './time/Page'
import IntroPage from './intro/Page'
import BannerV2Page from './banner_v2/Page'
import YieldFlowPage from './yield-flow/Page'

export default function HomePage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="flex flex-col">
        <IntroPage />
        <BannerV2Page />
        <Portfolio />
        <Integrated />
        <YieldFlowPage />
        <TimePage />
        <Engines />
        <ScrollingPage />
        <FAQPage />
      </div>
    </Container>
  )
}
