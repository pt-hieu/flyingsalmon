import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

function BasicTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return (
    <Tabs defaultValue="account" {...props}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
      <TabsContent value="billing">Billing settings</TabsContent>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('lands Tab focus on the active trigger', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    await user.tab()

    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus()
  })

  it('moves and selects with ArrowRight and ArrowLeft under automatic activation', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    const passwordTab = screen.getByRole('tab', { name: 'Password' })
    expect(passwordTab).toHaveFocus()
    expect(passwordTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Password settings')).toBeVisible()

    await user.keyboard('{ArrowLeft}')

    const accountTab = screen.getByRole('tab', { name: 'Account' })
    expect(accountTab).toHaveFocus()
    expect(accountTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Account settings')).toBeVisible()
  })

  it('moves focus without selecting under manual activation, until Enter or Space', async () => {
    const user = userEvent.setup()
    render(<BasicTabs activationMode="manual" />)

    await user.tab()
    await user.keyboard('{ArrowRight}')

    const passwordTab = screen.getByRole('tab', { name: 'Password' })
    expect(passwordTab).toHaveFocus()
    expect(passwordTab).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('Account settings')).toBeVisible()

    await user.keyboard('{Enter}')

    expect(passwordTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Password settings')).toBeVisible()
  })

  it('selects with Space under manual activation', async () => {
    const user = userEvent.setup()
    render(<BasicTabs activationMode="manual" />)

    await user.tab()
    await user.keyboard('{ArrowRight}{ArrowRight}')
    await user.keyboard(' ')

    const billingTab = screen.getByRole('tab', { name: 'Billing' })
    expect(billingTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Billing settings')).toBeVisible()
  })

  it('skips a disabled trigger when arrowing through the list', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password" disabled>
            Password
          </TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password">Password settings</TabsContent>
        <TabsContent value="billing">Billing settings</TabsContent>
      </Tabs>,
    )

    await user.tab()
    await user.keyboard('{ArrowRight}')

    const billingTab = screen.getByRole('tab', { name: 'Billing' })
    expect(billingTab).toHaveFocus()
    expect(billingTab).toHaveAttribute('aria-selected', 'true')
  })

  it('reports the newly selected value to onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicTabs onValueChange={onValueChange} />)

    await user.click(screen.getByRole('tab', { name: 'Billing' }))

    expect(onValueChange).toHaveBeenCalledWith('billing')
  })

  it('unmounts inactive panels by default', () => {
    render(<BasicTabs />)

    expect(screen.getByText('Account settings')).toBeVisible()
    expect(screen.queryByText('Password settings')).not.toBeInTheDocument()
    expect(screen.queryByText('Billing settings')).not.toBeInTheDocument()
  })

  it('keeps a force-mounted inactive panel present but hidden', () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password" forceMount>
          Password settings
        </TabsContent>
      </Tabs>,
    )

    const passwordPanel = screen.getByText('Password settings')
    expect(passwordPanel).toBeInTheDocument()
    expect(passwordPanel).not.toBeVisible()
    expect(
      screen.queryByRole('tabpanel', { name: 'Password' }),
    ).not.toBeInTheDocument()
  })

  it('shows a force-mounted panel once its tab becomes active', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account settings</TabsContent>
        <TabsContent value="password" forceMount>
          Password settings
        </TabsContent>
      </Tabs>,
    )

    await user.click(screen.getByRole('tab', { name: 'Password' }))

    expect(screen.getByText('Password settings')).toBeVisible()
  })

  it('labels the active panel with its trigger', () => {
    render(<BasicTabs />)

    expect(screen.getByRole('tabpanel', { name: 'Account' })).toHaveTextContent(
      'Account settings',
    )
  })

  it('jumps to the first trigger on Home and the last on End', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    await user.tab()
    await user.keyboard('{End}')

    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus()

    await user.keyboard('{Home}')

    expect(screen.getByRole('tab', { name: 'Account' })).toHaveFocus()
  })

  it('follows an externally controlled value to the newly active panel', () => {
    const { rerender } = render(<BasicTabs value="account" />)

    expect(screen.getByText('Account settings')).toBeVisible()

    rerender(<BasicTabs value="billing" />)

    expect(screen.getByText('Billing settings')).toBeVisible()
    expect(screen.queryByText('Account settings')).not.toBeInTheDocument()
  })
})
