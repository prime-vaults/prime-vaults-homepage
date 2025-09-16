import Container from '@/components/UI/Container'
import EarnPage from './Earn'
import TimePage from './Time'
import ScrollingPage from './Scrolling'
import FAQPage from './FAQ'
import BannerPage from './banner/Page'

export default function HomePage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="flex flex-col gap-4 p-6">
        <BannerPage />
        <EarnPage />
        <TimePage />
        <ScrollingPage />
        <FAQPage />
      </div>
    </Container>
  )
}
