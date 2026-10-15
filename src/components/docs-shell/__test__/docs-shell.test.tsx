import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { TooltipProvider } from '@/registry/ui/tooltip'

import { DocsShell, ErrorPage, NotFoundPage } from '..'

function ThrowingPage(): React.ReactNode {
  throw new Error('Render failed')
}

async function renderSiteAt(path: string) {
  const rootRoute = createRootRoute()
  const docsRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: '_docs',
    component: () => (
      <DocsShell>
        <Outlet />
      </DocsShell>
    ),
  })
  const homeRoute = createRoute({
    getParentRoute: () => docsRoute,
    path: '/',
    component: () => <h1>Home</h1>,
  })
  const brokenRoute = createRoute({
    getParentRoute: () => docsRoute,
    path: '/broken',
    component: ThrowingPage,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([
      docsRoute.addChildren([homeRoute, brokenRoute]),
    ]),
    history: createMemoryHistory({ initialEntries: [path] }),
    defaultNotFoundComponent: NotFoundPage,
    defaultErrorComponent: ErrorPage,
  })

  render(
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>,
  )
  await screen.findByRole('heading', { level: 1 })
}

function expectOneSiteChrome() {
  expect(screen.getAllByRole('link', { name: 'Skip to content' })).toHaveLength(
    1,
  )
  expect(screen.getAllByRole('complementary')).toHaveLength(1)
  expect(screen.getAllByRole('main')).toHaveLength(1)
}

describe('DocsShell', () => {
  it('offers a skip link as the first stop that leads to the page content', async () => {
    const user = userEvent.setup()
    await renderSiteAt('/')

    await user.tab()

    const skipLink = screen.getByRole('link', { name: 'Skip to content' })
    expect(skipLink).toHaveFocus()
    expect(skipLink).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('keeps the sidebar out of the main landmark', async () => {
    await renderSiteAt('/')

    const main = screen.getByRole('main')
    expect(within(main).getByRole('heading', { name: 'Home' })).toBeVisible()
    expect(within(main).queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('shows an unknown address as a page inside the site header and sidebar', async () => {
    await renderSiteAt('/no-such-page')

    expectOneSiteChrome()
    const main = screen.getByRole('main')
    expect(
      within(main).getByRole('heading', { name: 'Page not found' }),
    ).toBeVisible()
    expect(
      within(main).getByRole('link', { name: 'home page' }),
    ).toHaveAttribute('href', '/')
  })

  it('shows a page that fails to render inside the site header and sidebar, with a retry', async () => {
    await renderSiteAt('/broken')

    expectOneSiteChrome()
    const main = screen.getByRole('main')
    expect(
      within(main).getByRole('heading', { name: 'This page failed to load' }),
    ).toBeVisible()
    expect(
      within(main).getByRole('button', { name: 'Try again' }),
    ).toBeVisible()
  })
})
