import type { AlertVariant } from '@/registry/ui/alert'

export enum NoticeDismissReason {
  User = 'user',
  Replaced = 'replaced',
  App = 'app',
}

export interface NoticeInput {
  variant: AlertVariant
  title: string
  description?: string
  subject: React.ReactElement
  onDismiss?: (reason: NoticeDismissReason) => void
}

export interface NoticeHandle {
  dismiss: () => void
}

export interface NoticeContextValue {
  show: (notice: NoticeInput) => NoticeHandle
  dismiss: () => void
}

export interface NoticeAnnouncer {
  politeRegionRef: React.RefObject<HTMLDivElement | null>
  assertiveRegionRef: React.RefObject<HTMLDivElement | null>
  announce: (notice: NoticeInput) => void
  clearAnnouncement: () => void
}
