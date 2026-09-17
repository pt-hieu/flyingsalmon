import { useContext } from 'react'

import { NoticeContext } from './notice-context'
import type { NoticeContextValue } from './types'

export function useNotice(): NoticeContextValue {
  const notice = useContext(NoticeContext)

  if (!notice) {
    throw new Error('useNotice is only available inside <NoticeProvider>')
  }

  return notice
}
