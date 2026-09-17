import { readNodeText } from './read-node-text'
import type { NoticeInput, NoticeSubject } from './types'

export function assertActivatableSubject(subject: NoticeSubject) {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const rendersItsOwnElement = typeof subject.type !== 'string'

  if (
    rendersItsOwnElement ||
    subject.type === 'a' ||
    subject.type === 'button'
  ) {
    return
  }

  throw new Error(
    `A notice subject must be an anchor or a button so the user can activate it, and <${subject.type}> is neither.`,
  )
}

export function noticeAnnouncementText(notice: NoticeInput): string {
  return [notice.title, notice.description, readNodeText(notice.subject)]
    .filter((part) => part !== undefined && part.length > 0)
    .join(' ')
}
