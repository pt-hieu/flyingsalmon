import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'

import { springSettle } from '@/registry/lib/motion'

import { noticeLiveRegionClassName, noticeOutletClassName } from './classnames'
import { NoticeCard } from './notice-card'
import { NoticeContext } from './notice-context'
import {
  NoticeDismissReason,
  type NoticeHandle,
  type NoticeInput,
} from './types'
import { useNoticeAnnouncer } from './use-notice-announcer'
import { assertActivatableSubject } from './utils'

interface ShownNotice {
  sequence: number
  input: NoticeInput
}

export interface NoticeProviderProps {
  children?: React.ReactNode
}

export function NoticeProvider({ children }: NoticeProviderProps) {
  const [shownNotice, setShownNotice] = useState<ShownNotice | null>(null)
  const shownNoticeRef = useRef<ShownNotice | null>(null)
  const nextSequence = useRef(0)

  const { politeRegionRef, assertiveRegionRef, announce, clearAnnouncement } =
    useNoticeAnnouncer()

  const dismissShownNotice = (reason: NoticeDismissReason) => {
    const dismissed = shownNoticeRef.current

    if (!dismissed) {
      return
    }

    shownNoticeRef.current = null
    setShownNotice(null)
    clearAnnouncement()
    dismissed.input.onDismiss?.(reason)
  }

  const show = (input: NoticeInput): NoticeHandle => {
    assertActivatableSubject(input.subject)

    const replaced = shownNoticeRef.current
    replaced?.input.onDismiss?.(NoticeDismissReason.Replaced)

    const shown = { sequence: nextSequence.current, input }
    nextSequence.current += 1

    shownNoticeRef.current = shown
    setShownNotice(shown)
    announce(input)

    return {
      dismiss: () => {
        if (shownNoticeRef.current?.sequence === shown.sequence) {
          dismissShownNotice(NoticeDismissReason.App)
        }
      },
    }
  }

  const dismiss = () => dismissShownNotice(NoticeDismissReason.App)

  return (
    <NoticeContext.Provider value={{ show, dismiss }}>
      <div
        ref={politeRegionRef}
        role="status"
        className={noticeLiveRegionClassName}
      />

      <div
        ref={assertiveRegionRef}
        role="alert"
        className={noticeLiveRegionClassName}
      />

      <AnimatePresence>
        {shownNotice ? (
          <motion.div
            key="notice"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: springSettle }}
            exit={{ opacity: 0, y: -8, transition: springSettle }}
            className={noticeOutletClassName}
          >
            <NoticeCard
              notice={shownNotice.input}
              onDismiss={() => dismissShownNotice(NoticeDismissReason.User)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {children}
    </NoticeContext.Provider>
  )
}
