import { RouteObject } from 'react-router-dom'

import VaultsLayout from '@/app/vaults/Layout'
import VaultPage from '@/app/vaults/Page'
import VaultDetailsPage from '@/app/vaults/vault-details/Page'

import { RouterKeys } from '@/constant/router'

export const vaultRoutes: RouteObject = {
  path: RouterKeys.Vaults,
  element: <VaultsLayout />,
  children: [
    { index: true, element: <VaultPage /> },
    {
      path: ':vaultId',
      element: <VaultDetailsPage />,
    },
  ],
}
