import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect, useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { AlertVariant } from '@/registry/ui/alert'
import {
  NoticeDismissReason,
  NoticeProvider,
  useNotice,
  type NoticeContextValue,
  type NoticeHandle,
  type NoticeInput,
} from '@/registry/ui/notice'

function NoticeConsumer() {
  useNotice()

  return null
}

function NoticeApiCapture({
  publish,
}: {
  publish: (noticeApi: NoticeContextValue) => void
}) {
  const noticeApi = useNotice()

  useEffect(() => {
    publish(noticeApi)
  }, [noticeApi, publish])

  return null
}

function ShowNoticeButton({
  label,
  notice,
}: {
  label: string
  notice: NoticeInput
}) {
  const { show } = useNotice()

  return (
    <button type="button" onClick={() => show(notice)}>
      {label}
    </button>
  )
}

function TwoNoticeHarness({
  firstNotice,
  secondNotice,
}: {
  firstNotice: NoticeInput
  secondNotice: NoticeInput
}) {
  const { show } = useNotice()
  const firstHandle = useRef<NoticeHandle | null>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          firstHandle.current = show(firstNotice)
        }}
      >
        Show the first
      </button>

      <button type="button" onClick={() => show(secondNotice)}>
        Show the second
      </button>

      <button type="button" onClick={() => firstHandle.current?.dismiss()}>
        Dismiss the first
      </button>
    </>
  )
}

/**
 * A live region only re-announces text it already held when the text leaves the
 * DOM and comes back, and the rendered result alone cannot show that it did.
 */
function recordLiveRegionTexts(region: HTMLElement, texts: string[]) {
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.removedNodes.length > 0) {
        texts.push('')
      }

      for (const addedNode of record.addedNodes) {
        texts.push(addedNode.textContent ?? '')
      }
    }
  })

  observer.observe(region, { childList: true, subtree: true })

  return observer
}

describe('useNotice', () => {
  it('throws outside a provider', () => {
    expect(() => render(<NoticeConsumer />)).toThrow(/NoticeProvider/)
  })
})

describe('NoticeProvider', () => {
  it('reports a dismissal from the dismiss button with the user reason', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Save the trip"
          notice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            description: 'Six days in Da Nang, ready to share.',
            subject: <a href="/trips/1">View trip</a>,
            onDismiss,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Save the trip' }))

    expect(screen.getByText('Trip saved')).toBeInTheDocument()
    expect(
      screen.getByText('Six days in Da Nang, ready to share.'),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View trip' })).toHaveAttribute(
      'href',
      '/trips/1',
    )

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))

    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(onDismiss).toHaveBeenCalledWith(NoticeDismissReason.User)

    await waitFor(() => {
      expect(screen.queryByText('Trip saved')).not.toBeInTheDocument()
    })
  })

  it('replaces the notice it shows and reports the previous one as replaced', async () => {
    const user = userEvent.setup()
    const onFirstDismiss = vi.fn()
    render(
      <NoticeProvider>
        <TwoNoticeHarness
          firstNotice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            subject: <a href="/trips/1">View trip</a>,
            onDismiss: onFirstDismiss,
          }}
          secondNotice={{
            variant: AlertVariant.Error,
            title: 'The payment failed',
            subject: <a href="/trips/1/payment">Try the payment again</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Show the first' }))
    await user.click(screen.getByRole('button', { name: 'Show the second' }))

    expect(onFirstDismiss).toHaveBeenCalledTimes(1)
    expect(onFirstDismiss).toHaveBeenCalledWith(NoticeDismissReason.Replaced)

    expect(screen.queryByText('Trip saved')).not.toBeInTheDocument()
    expect(screen.getByText('The payment failed')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Dismiss' })).toHaveLength(1)
  })

  it('ignores a handle whose notice has been replaced', async () => {
    const user = userEvent.setup()
    const onFirstDismiss = vi.fn()
    render(
      <NoticeProvider>
        <TwoNoticeHarness
          firstNotice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            subject: <a href="/trips/1">View trip</a>,
            onDismiss: onFirstDismiss,
          }}
          secondNotice={{
            variant: AlertVariant.Error,
            title: 'The payment failed',
            subject: <a href="/trips/1/payment">Try the payment again</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Show the first' }))
    await user.click(screen.getByRole('button', { name: 'Show the second' }))
    await user.click(screen.getByRole('button', { name: 'Dismiss the first' }))

    expect(screen.getByText('The payment failed')).toBeInTheDocument()
    expect(onFirstDismiss).toHaveBeenCalledTimes(1)
  })

  it('dismisses the notice it shows from a live handle with the app reason', async () => {
    const user = userEvent.setup()
    const onFirstDismiss = vi.fn()
    render(
      <NoticeProvider>
        <TwoNoticeHarness
          firstNotice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            subject: <a href="/trips/1">View trip</a>,
            onDismiss: onFirstDismiss,
          }}
          secondNotice={{
            variant: AlertVariant.Error,
            title: 'The payment failed',
            subject: <a href="/trips/1/payment">Try the payment again</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Show the first' }))
    await user.click(screen.getByRole('button', { name: 'Dismiss the first' }))

    expect(onFirstDismiss).toHaveBeenCalledTimes(1)
    expect(onFirstDismiss).toHaveBeenCalledWith(NoticeDismissReason.App)

    await waitFor(() => {
      expect(screen.queryByText('Trip saved')).not.toBeInTheDocument()
    })
  })

  it('mounts both live regions empty', () => {
    render(
      <NoticeProvider>
        <p>Page content</p>
      </NoticeProvider>,
    )

    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    expect(screen.getByRole('alert')).toBeEmptyDOMElement()
  })

  it.each([AlertVariant.Info, AlertVariant.Success, AlertVariant.Warning])(
    'announces a %s notice from the polite region',
    async (variant) => {
      const user = userEvent.setup()
      render(
        <NoticeProvider>
          <ShowNoticeButton
            label="Save the trip"
            notice={{
              variant,
              title: 'Trip saved',
              description: 'Six days in Da Nang.',
              subject: <a href="/trips/1">View trip</a>,
            }}
          />
        </NoticeProvider>,
      )

      await user.click(screen.getByRole('button', { name: 'Save the trip' }))

      await waitFor(() => {
        expect(screen.getByRole('status')).toHaveTextContent(
          /^Trip saved Six days in Da Nang\. View trip$/,
        )
      })

      expect(screen.getByRole('alert')).toBeEmptyDOMElement()
    },
  )

  it('announces an error notice from the assertive region', async () => {
    const user = userEvent.setup()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Pay for the trip"
          notice={{
            variant: AlertVariant.Error,
            title: 'The payment failed',
            description: 'Your card was declined.',
            subject: <a href="/trips/1/payment">Try again</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Pay for the trip' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        /^The payment failed Your card was declined\. Try again$/,
      )
    })

    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('empties the live region when the notice is dismissed', async () => {
    const user = userEvent.setup()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Copy the link"
          notice={{
            variant: AlertVariant.Info,
            title: 'Link copied',
            subject: <a href="/trips/1">View trip</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Copy the link' }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Link copied')
    })

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeEmptyDOMElement()
    })
  })

  it('empties the live region before it writes identical text again', async () => {
    const user = userEvent.setup()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Copy the link"
          notice={{
            variant: AlertVariant.Info,
            title: 'Link copied',
            subject: <a href="/trips/1">View trip</a>,
          }}
        />
      </NoticeProvider>,
    )

    const announcedTexts: string[] = []
    const observer = recordLiveRegionTexts(
      screen.getByRole('status'),
      announcedTexts,
    )

    await user.click(screen.getByRole('button', { name: 'Copy the link' }))
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Link copied')
    })

    await user.click(screen.getByRole('button', { name: 'Copy the link' }))
    await waitFor(() => {
      expect(announcedTexts).toEqual([
        'Link copied View trip',
        '',
        'Link copied View trip',
      ])
    })

    observer.disconnect()
  })

  it('reaches the subject and then the dismiss button before page content', async () => {
    const user = userEvent.setup()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Save the trip"
          notice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            subject: <a href="/trips/1">View trip</a>,
          }}
        />
      </NoticeProvider>,
    )

    const showButton = screen.getByRole('button', { name: 'Save the trip' })
    await user.click(showButton)

    expect(showButton).toHaveFocus()

    showButton.blur()

    await user.tab()
    expect(screen.getByRole('link', { name: 'View trip' })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole('button', { name: 'Dismiss' })).toHaveFocus()

    await user.tab()
    expect(showButton).toHaveFocus()
  })

  it('keeps the notice on Escape', async () => {
    const user = userEvent.setup()
    render(
      <NoticeProvider>
        <ShowNoticeButton
          label="Save the trip"
          notice={{
            variant: AlertVariant.Success,
            title: 'Trip saved',
            subject: <a href="/trips/1">View trip</a>,
          }}
        />
      </NoticeProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Save the trip' }))
    await user.keyboard('{Escape}')

    expect(screen.getByText('Trip saved')).toBeInTheDocument()
  })

  it('rejects a subject that is neither an anchor nor a button', () => {
    let noticeApi: NoticeContextValue | undefined
    render(
      <NoticeProvider>
        <NoticeApiCapture
          publish={(capturedNoticeApi) => {
            noticeApi = capturedNoticeApi
          }}
        />
      </NoticeProvider>,
    )

    expect(() =>
      noticeApi?.show({
        variant: AlertVariant.Info,
        title: 'Link copied',
        subject: <span>View trip</span>,
      }),
    ).toThrow(/anchor or a button/)
  })
})
