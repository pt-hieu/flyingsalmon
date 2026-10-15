import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useSearchParamDraft } from '@/components/use-search-param-draft'

function deferredCommits() {
  const settles: (() => void)[] = []
  const commit = () =>
    new Promise<void>((resolve) => {
      settles.push(resolve)
    })

  async function settleAll() {
    await act(async () => {
      settles.splice(0).forEach((settle) => settle())
    })
  }

  return { commit, settleAll }
}

describe('useSearchParamDraft', () => {
  it('keeps the typed value while its URL update is still in flight', () => {
    const { commit } = deferredCommits()
    const { result, rerender } = renderHook(
      ({ urlValue }) => useSearchParamDraft(urlValue, commit),
      { initialProps: { urlValue: '' } },
    )

    act(() => result.current[1]('ky'))
    act(() => result.current[1]('kyo'))
    rerender({ urlValue: 'ky' })

    expect(result.current[0]).toBe('kyo')
  })

  it('follows the URL once no update is in flight', async () => {
    const { commit, settleAll } = deferredCommits()
    const { result, rerender } = renderHook(
      ({ urlValue }) => useSearchParamDraft(urlValue, commit),
      { initialProps: { urlValue: '' } },
    )

    act(() => result.current[1]('kyoto'))
    await settleAll()
    rerender({ urlValue: 'lisbon' })

    expect(result.current[0]).toBe('lisbon')
  })
})
