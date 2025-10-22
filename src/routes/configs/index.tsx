import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import PageContainer from '@/app/Page'

import ErrorBoundary from '@/components/ErrorBoundary'
import { RouterKeys } from '@/constant/router'
import { stakingRoutes } from './staking.routers'
import { pointRoutes } from './point.routers'
import { brandKitRoutes } from './brand-kit.routers'
import { policyRoutes } from './policy.routers'
import { termRoutes } from './term.routers'

export const routes = createBrowserRouter([
  {
    path: RouterKeys.Home,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { index: true, element: <PageContainer /> },
      stakingRoutes,
      pointRoutes,
      brandKitRoutes,
      policyRoutes,
      termRoutes,
    ],
    ErrorBoundary,
  },

  {
    path: '/*',
    element: <Navigate to={RouterKeys.Home} />,
  },
])
