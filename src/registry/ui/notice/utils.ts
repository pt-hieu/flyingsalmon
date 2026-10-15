import { readNodeText } from './read-node-text'
import type { NoticeInput } from './types'

export function noticeAnnouncementText(notice: NoticeInput): string {
  return [notice.title, notice.description, readNodeText(notice.subject)]
    .filter((part): part is string => Boolean(part))
    .join(' ')
}
