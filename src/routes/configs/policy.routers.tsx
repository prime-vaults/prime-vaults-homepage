import { RouteObject } from 'react-router-dom'

import PolicyPage from '@/app/policy/Page'

import { RouterKeys } from '@/constant/router'

export const policyRoutes: RouteObject = {
  path: RouterKeys.PrivacyPolicy,
  element: <PolicyPage />,
}
