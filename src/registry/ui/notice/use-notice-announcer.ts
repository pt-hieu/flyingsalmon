import { useEffect, useRef } from 'react'

import { AlertVariant } from '@/registry/ui/alert'

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

  const clearAnnouncement = () => {
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
  }

  /**
   * A screen reader reads a live region when text arrives in it, and text that
   * is already there is not new. Emptying the region now and writing on the
   * next frame makes the same words arrive again.
   */
  const announce = (notice: NoticeInput) => {
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
  }

  return { politeRegionRef, assertiveRegionRef, announce, clearAnnouncement }
}
