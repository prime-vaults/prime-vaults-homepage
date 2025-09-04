import Container from '@/components/UI/Container'
import { CoreRoutes } from '@/constant/router'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <Container className="page-header">
      <div className="ph-container">
        <Link
          to={CoreRoutes.Home}
          className="text-cyan uppercase font-bold text-lg md:text-2xl"
        >
          prime vaults
        </Link>
        <div className="ph-menus">
          <Link to={CoreRoutes.Staking} className="btn hover:btn-primary">
            Staking
          </Link>
          <Link to={CoreRoutes.Staking} className="btn hover:btn-primary">
            Games
          </Link>
        </div>
      </div>
    </Container>
  )
}
