import { NoticeProvider } from '@/registry/ui/notice'

import { noticeFrameClassName, noticeFrameContentClassName } from './classnames'

export interface NoticeFrameProps {
  children: React.ReactNode
  ownsAppShell?: boolean
}

export function NoticeFrame({
  children,
  ownsAppShell = false,
}: NoticeFrameProps) {
  if (ownsAppShell) {
    return <div className={noticeFrameClassName}>{children}</div>
  }

  return (
    <div className={noticeFrameClassName}>
      <NoticeProvider>
        <div className={noticeFrameContentClassName}>{children}</div>
      </NoticeProvider>
    </div>
  )
}
