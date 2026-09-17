import { describe, expect, it } from 'vitest'

import { AlertVariant } from '@/registry/ui/alert'
import {
  assertActivatableSubject,
  noticeAnnouncementText,
  readNodeText,
} from '@/registry/ui/notice/utils'

function TripLink({ children }: { children: React.ReactNode }) {
  return <a href="/trips/1">{children}</a>
}

describe('readNodeText', () => {
  it('reads the text of a nested element tree', () => {
    expect(
      readNodeText(
        <span>
          View <strong>the Da Nang trip</strong>
        </span>,
      ),
    ).toBe('View the Da Nang trip')
  })

  it('reads a number as its digits', () => {
    expect(readNodeText(<span>{6} days</span>)).toBe('6 days')
  })

  it('reads an element with no text as an empty string', () => {
    expect(readNodeText(<span />)).toBe('')
  })
})

describe('noticeAnnouncementText', () => {
  it('announces the title, the description, and the subject text', () => {
    expect(
      noticeAnnouncementText({
        variant: AlertVariant.Success,
        title: 'Trip saved',
        description: 'Six days in Da Nang.',
        subject: <a href="/trips/1">View trip</a>,
      }),
    ).toBe('Trip saved Six days in Da Nang. View trip')
  })

  it('announces a notice with no description without a gap', () => {
    expect(
      noticeAnnouncementText({
        variant: AlertVariant.Info,
        title: 'Link copied',
        subject: <a href="/trips/1">View trip</a>,
      }),
    ).toBe('Link copied View trip')
  })
})

describe('assertActivatableSubject', () => {
  it('accepts a button subject', () => {
    expect(() =>
      assertActivatableSubject(<button type="button">Reopen the form</button>),
    ).not.toThrow()
  })

  it('accepts a component that renders its own element, such as a router link', () => {
    expect(() =>
      assertActivatableSubject(<TripLink>View trip</TripLink>),
    ).not.toThrow()
  })

  it('names the element it rejects', () => {
    expect(() => assertActivatableSubject(<span>View trip</span>)).toThrow(
      '<span>',
    )
  })
})
