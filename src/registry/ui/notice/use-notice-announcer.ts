import { useCallback, useEffect, useRef } from 'react'

import { AlertVariant } from '../alert'

import type { NoticeAnnouncer, NoticeInput } from './types'
import { noticeAnnouncementText } from './utils'

export function useNoticeAnnouncer(): NoticeAnnouncer {
  const politeRegionRef = useRef<HTMLDivElement | null>(null)
  const assertiveRegionRef = useRef<HTMLDivElement | null>(null)
  const pendingFrame = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (pendingFrame.current !== null) {
        cancelAnimationFrame(pendingFrame.current)
      }
    }
  }, [])

  const clearAnnouncement = useCallback(() => {
    if (pendingFrame.current !== null) {
      cancelAnimationFrame(pendingFrame.current)
      pendingFrame.current = null
    }

    if (politeRegionRef.current) {
      politeRegionRef.current.textContent = ''
    }

    if (assertiveRegionRef.current) {
      assertiveRegionRef.current.textContent = ''
    }
  }, [])

  const announce = useCallback(
    (notice: NoticeInput) => {
      clearAnnouncement()

      pendingFrame.current = requestAnimationFrame(() => {
        pendingFrame.current = null

        const region =
          notice.variant === AlertVariant.Error
            ? assertiveRegionRef.current
            : politeRegionRef.current

        if (region) {
          region.textContent = noticeAnnouncementText(notice)
        }
      })
    },
    [clearAnnouncement],
  )

  return { politeRegionRef, assertiveRegionRef, announce, clearAnnouncement }
}
