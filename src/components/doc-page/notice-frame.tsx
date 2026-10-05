import { NoticeProvider } from '@/registry/ui/notice'

import { noticeFrameClassName, noticeFrameContentClassName } from './classnames'

export interface NoticeFrameProps {
  children: React.ReactNode
}

export function NoticeFrame({ children }: NoticeFrameProps) {
  return (
    <div className={noticeFrameClassName}>
      <NoticeProvider>
        <div className={noticeFrameContentClassName}>{children}</div>
      </NoticeProvider>
    </div>
  )
}
