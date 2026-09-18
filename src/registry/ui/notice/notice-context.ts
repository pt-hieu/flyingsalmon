import { createContext } from 'react'

import type { NoticeContextValue } from './types'

export const NoticeContext = createContext<NoticeContextValue | null>(null)
