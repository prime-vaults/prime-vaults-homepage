import { RouteObject } from 'react-router-dom'

import { RouterKeys } from '@/constant/router'
import LandingPage from '@/app/landing-page/Page'

export const landingRoutes: RouteObject = {
  path: RouterKeys.Landing,
  element: <LandingPage />,
}
