import { RouteObject } from 'react-router-dom'

import PortfolioPage from '@/app/portfolio/Page'

import { RouterKeys } from '@/constant/router'

export const portfolioRoutes: RouteObject = {
  path: RouterKeys.Portfolio,
  element: <PortfolioPage />,
}
