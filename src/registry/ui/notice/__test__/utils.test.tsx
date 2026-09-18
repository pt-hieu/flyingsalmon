import { describe, expect, it } from 'vitest'

import { AlertVariant } from '@/registry/ui/alert'
import { noticeAnnouncementText } from '@/registry/ui/notice/utils'

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
