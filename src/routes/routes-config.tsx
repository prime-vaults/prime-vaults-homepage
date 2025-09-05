import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
} from 'react-router-dom'
import { CoreRoutes } from '../constant/router'

import AppLayout from '@/layouts/AppLayout'
import HomePage from '@/app/Page'
import StakingPage from '@/app/staking/Page'

import ErrorBoundary from '@/components/ErrorBoundary'

const ROUTES_CONFIG: RouteObject[] = [
  {
    path: CoreRoutes.Home,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: CoreRoutes.Staking,
        children: [
          {
            index: true,
            element: <StakingPage />,
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
