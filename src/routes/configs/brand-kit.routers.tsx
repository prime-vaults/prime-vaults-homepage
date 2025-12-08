import { RouteObject } from 'react-router-dom'

import BrandKitPage from '@/app/brand-kit/Page'

import { RouterKeys } from '@/constant/router'

export const brandKitRoutes: RouteObject = {
  path: RouterKeys.BrandKit,
  element: <BrandKitPage />,
}
