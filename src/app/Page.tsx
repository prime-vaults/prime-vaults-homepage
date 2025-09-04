import Container from '@/components/UI/Container'

export default function HomePage() {
  return (
    <Container>
      <div className="page-home">
        <div className="flex flex-col gap-2">
          <p className="text-base md:text-lg font-bold">JIKO - Prime Vaults</p>
          <span className="text-sm md:text-base">
            Bring me your money. We’ll keep it safe for you. Trustfully!
          </span>
        </div>
      </div>
    </Container>
  )
}
