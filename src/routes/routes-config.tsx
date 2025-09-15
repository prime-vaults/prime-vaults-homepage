import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
} from 'react-router-dom'
import { CoreRoutes } from '../constant/router'

import AppLayout from '@/layouts/AppLayout'
import PageContainer from '@/app/Page'
import StakingPage from '@/app/staking/Page'

import ErrorBoundary from '@/components/ErrorBoundary'
import Point from '@/app/point/Page'

const ROUTES_CONFIG: RouteObject[] = [
  {
    path: CoreRoutes.Home,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { index: true, element: <PageContainer /> },
      {
        path: CoreRoutes.Staking,
        children: [
          {
            index: true,
            element: <StakingPage />,
          },
        ],
      },
      {
        path: 'point',
        children: [
          {
            index: true,
            element: <Point />,
          },
        ],
      },
    ],
    ErrorBoundary,
  },

  {
    path: '/*',
    element: <Navigate to={CoreRoutes.Home} />,
  },
]

export const routes = createBrowserRouter(ROUTES_CONFIG)
