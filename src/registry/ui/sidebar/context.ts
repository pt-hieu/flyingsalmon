import { createContext } from 'react'

import type { SidebarState } from './types'

export const SidebarContext = createContext<SidebarState | null>(null)
