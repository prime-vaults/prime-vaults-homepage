import { RouteObject } from 'react-router-dom'
import Point from '@/app/point/Page'

import { RouterKeys } from '@/constant/router'

export const pointRoutes: RouteObject = {
  path: RouterKeys.Point,
  element: <Point />,
}
