import Container from '@/components/UI/Container'
import BannerPage from './Banner'
import EarnPage from './Earn'
import TimePage from './Time'

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
      </div>
    </Container>
  )
}
