import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('jsdom pointer and scroll polyfills', () => {
  it('lets an element report and take pointer capture without throwing', () => {
    const { container } = render(<div>target</div>)
    const target = container.firstElementChild as HTMLElement

    expect(() => target.hasPointerCapture(1)).not.toThrow()
    expect(target.hasPointerCapture(1)).toBe(false)
  })

  it('lets an element set and release pointer capture without throwing', () => {
    const { container } = render(<div>target</div>)
    const target = container.firstElementChild as HTMLElement

    expect(() => target.setPointerCapture(1)).not.toThrow()
    expect(() => target.releasePointerCapture(1)).not.toThrow()
  })

  it('lets an element scroll itself into view without throwing', () => {
    const { container } = render(<div>target</div>)
    const target = container.firstElementChild as HTMLElement

    expect(() => target.scrollIntoView()).not.toThrow()
  })
})
