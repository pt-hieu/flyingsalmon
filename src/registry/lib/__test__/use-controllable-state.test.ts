import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useControllableState } from '@/registry/lib/use-controllable-state'

describe('useControllableState', () => {
  it('starts at the default value when no value is given', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'Lisbon' }),
    )

    expect(result.current[0]).toBe('Lisbon')
  })

  it('moves to the value it is set to when no value is given', () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'Lisbon' }),
    )

    act(() => result.current[1]('Porto'))

    expect(result.current[0]).toBe('Porto')
  })

  it('reports every value it is set to', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 'Lisbon', onChange }),
    )

    act(() => result.current[1]('Porto'))

    expect(onChange).toHaveBeenCalledWith('Porto')
  })

  it('shows the given value over the default value', () => {
    const { result } = renderHook(() =>
      useControllableState({ value: 'Faro', defaultValue: 'Lisbon' }),
    )

    expect(result.current[0]).toBe('Faro')
  })

  it('stays on the given value when the parent ignores a change', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ value: 'Faro', defaultValue: 'Lisbon', onChange }),
    )

    act(() => result.current[1]('Porto'))

    expect(onChange).toHaveBeenCalledWith('Porto')
    expect(result.current[0]).toBe('Faro')
  })

  it('follows the given value when the parent changes it', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 'Lisbon' }),
      { initialProps: { value: 'Faro' } },
    )

    rerender({ value: 'Porto' })

    expect(result.current[0]).toBe('Porto')
  })

  it('treats null as a given value', () => {
    const { result } = renderHook(() =>
      useControllableState<number | null>({ value: null, defaultValue: 4 }),
    )

    act(() => result.current[1](6))

    expect(result.current[0]).toBeNull()
  })

  it('reports to the latest change callback', () => {
    const firstOnChange = vi.fn()
    const latestOnChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ onChange }) => useControllableState({ defaultValue: 2, onChange }),
      { initialProps: { onChange: firstOnChange } },
    )

    rerender({ onChange: latestOnChange })
    act(() => result.current[1](3))

    expect(firstOnChange).not.toHaveBeenCalled()
    expect(latestOnChange).toHaveBeenCalledWith(3)
  })

  it('keeps the same setter across renders, so an effect can depend on it', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 2 }),
      { initialProps: { value: 2 } },
    )
    const firstSetter = result.current[1]

    rerender({ value: 5 })

    expect(result.current[1]).toBe(firstSetter)
  })
})
