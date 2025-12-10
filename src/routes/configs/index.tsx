import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import PageContainer from '@/app/Page'
import ErrorBoundary from '@/components/ErrorBoundary'

import { RouterKeys } from '@/constant/router'
import { brandKitRoutes } from './brand-kit.routers'
import { policyRoutes } from './policy.routers'
import { termRoutes } from './term.routers'
import { landingRoutes } from './landing.routers'
import { blogRoutes } from './blog.routers'

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
      brandKitRoutes,
      policyRoutes,
      termRoutes,
    ],
    ErrorBoundary,
  },
  landingRoutes,
  blogRoutes,
  {
    path: '/*',
    element: <Navigate to={RouterKeys.Home} />,
  },
])
