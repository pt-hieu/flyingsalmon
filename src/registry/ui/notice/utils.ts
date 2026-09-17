import { isValidElement } from 'react'

import type { NoticeInput } from './types'

export function readNodeText(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }

  if (typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(readNodeText).join('')
  }

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return readNodeText(node.props.children)
  }

  return ''
}

export function assertActivatableSubject(subject: React.ReactElement) {
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
