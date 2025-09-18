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
import TermOfUsePage from '@/app/term-of-use/Page'
import PolicyPage from '@/app/policy/Page'
import BrandKitPage from '@/app/brand-kit/Page'

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
      {
        path: CoreRoutes.TermOfUse,
        children: [
          {
            index: true,
            element: <TermOfUsePage />,
          },
        ],
      },
      {
        path: CoreRoutes.BrandKit,
        children: [
          {
            index: true,
            element: <BrandKitPage />,
          },
        ],
      },
      {
        path: CoreRoutes.PrivacyPolicy,
        children: [
          {
            index: true,
            element: <PolicyPage />,
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
