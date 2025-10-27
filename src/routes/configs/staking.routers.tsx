import { RouteObject } from 'react-router-dom'

import StakingLayout from '@/app/staking/Layout'
import StakingPage from '@/app/staking/Page'
import PoolDetailsPage from '@/app/staking/pool-details/Page'

import { RouterKeys } from '@/constant/router'

export const stakingRoutes: RouteObject = {
  path: RouterKeys.Staking,
  element: <StakingLayout />,
  children: [
    { index: true, element: <StakingPage /> },
    {
      path: RouterKeys.PoolDetails,
      element: <PoolDetailsPage />,
    },
  ],
}
