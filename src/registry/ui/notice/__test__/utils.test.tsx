import { describe, expect, it } from 'vitest'

import { AlertVariant } from '@/registry/ui/alert'
import {
  assertActivatableSubject,
  noticeAnnouncementText,
} from '@/registry/ui/notice/utils'

function TripLink({ children }: { children: React.ReactNode }) {
  return <a href="/trips/1">{children}</a>
}

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
