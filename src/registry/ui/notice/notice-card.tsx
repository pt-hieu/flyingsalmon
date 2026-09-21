import { cloneElement } from 'react'

import { cn } from '@/lib/utils'

import { Alert, AlertDescription, AlertTitle } from '../alert'

import { noticeSubjectClassName } from './classnames'
import type { NoticeInput } from './types'

export interface NoticeCardProps {
  notice: NoticeInput
  onDismiss: () => void
}

export function NoticeCard({ notice, onDismiss }: NoticeCardProps) {
  const subject = notice.subject

  return (
    <Alert
      variant={notice.variant}
      role="presentation"
      animateOpen={false}
      onClose={onDismiss}
    >
      <AlertTitle>{notice.title}</AlertTitle>

      {notice.description ? (
        <AlertDescription>{notice.description}</AlertDescription>
      ) : null}

      {cloneElement(subject, {
        className: cn(noticeSubjectClassName, subject.props.className),
      })}
    </Alert>
  )
}
