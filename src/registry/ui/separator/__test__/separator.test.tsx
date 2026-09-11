import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator, SeparatorOrientation } from '@/registry/ui/separator'

describe('Separator', () => {
  it('announces nothing by default', () => {
    render(<Separator />)

    expect(screen.queryByRole('separator')).not.toBeInTheDocument()
  })

  it('leaves aria-orientation off an announced horizontal boundary', () => {
    render(<Separator decorative={false} />)

    const separator = screen.getByRole('separator')

    expect(separator).not.toHaveAttribute('aria-orientation')
  })

  it('announces a vertical boundary as vertical', () => {
    render(
      <Separator
        decorative={false}
        orientation={SeparatorOrientation.Vertical}
      />,
    )

    const separator = screen.getByRole('separator')

    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
  })
})
