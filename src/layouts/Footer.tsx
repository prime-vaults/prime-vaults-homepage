import Container from '@/components/UI/Container'

function FooterLayout() {
  return (
    <Container
      className="border-t border-neutral"
      innerClassName="border-x border-neutral"
    >
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content px-6 py-10">
        <aside>
          <img src="/logo.svg" />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </footer>
    </Container>
  )
}

export default FooterLayout
