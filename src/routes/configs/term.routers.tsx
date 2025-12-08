import { RouteObject } from 'react-router-dom'

import { RouterKeys } from '@/constant/router'
import TermOfUsePage from '@/app/term-of-use/Page'

export const termRoutes: RouteObject = {
  path: RouterKeys.TermOfUse,
  element: <TermOfUsePage />,
}
