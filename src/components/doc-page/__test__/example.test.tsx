import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Example } from '@/components/doc-page/example'

const source = `import { Button } from '@/registry/ui/button'
import { cn } from '@/registry/lib/utils'

export function ButtonDemo() {
  return <Button className={cn('w-full')}>Book trip</Button>
}
`

const consumerSource = `import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ButtonDemo() {
  return <Button className={cn('w-full')}>Book trip</Button>
}`

function renderExample() {
  render(
    <Example caption="Book a trip" source={source}>
      <button type="button">Book trip</button>
    </Example>,
  )
}

async function openCodeTab(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('tab', { name: 'Code' }))
}

describe('Example', () => {
  it('shows the source with consumer import paths on the Code tab', async () => {
    const user = userEvent.setup()
    renderExample()

    await openCodeTab(user)

    expect(
      screen.getByRole('group', { name: 'Book a trip code' }),
    ).toHaveTextContent(consumerSource, { normalizeWhitespace: false })
  })

  it('copies the consumer source and announces it', async () => {
    const user = userEvent.setup()
    renderExample()
    await openCodeTab(user)

    await user.click(screen.getByRole('button', { name: 'Copy' }))

    expect(await navigator.clipboard.readText()).toBe(consumerSource)
    expect(screen.getByRole('status')).toHaveTextContent('Copied')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  })

  it('announces a failed copy', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(
      new Error('Clipboard blocked'),
    )
    renderExample()
    await openCodeTab(user)

    await user.click(screen.getByRole('button', { name: 'Copy' }))

    expect(screen.getByRole('status')).toHaveTextContent('Copy failed')
  })

  it('returns to Copy once focus leaves the button', async () => {
    const user = userEvent.setup()
    renderExample()
    await openCodeTab(user)

    await user.click(screen.getByRole('button', { name: 'Copy' }))
    await user.tab()

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })
})
