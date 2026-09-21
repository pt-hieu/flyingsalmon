import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'

import { TooltipProvider } from '@/registry/ui/tooltip'

export async function renderWithRouter(content: React.ReactNode) {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <div data-testid="rendered-content">{content}</div>
        <Outlet />
      </>
    ),
  })
  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })

  render(
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>,
  )
  await screen.findByTestId('rendered-content')

  return router
}
