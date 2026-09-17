import { cloneElement } from 'react'

import { cn } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'

import { noticeSubjectClassName } from './classnames'
import type { NoticeInput } from './types'

interface NoticeSubjectProps {
  className?: string
}

export interface NoticeCardProps {
  notice: NoticeInput
  onDismiss: () => void
}

export function NoticeCard({ notice, onDismiss }: NoticeCardProps) {
  const subject = notice.subject as React.ReactElement<NoticeSubjectProps>

  return (
    <Alert variant={notice.variant} role="presentation" onClose={onDismiss}>
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
