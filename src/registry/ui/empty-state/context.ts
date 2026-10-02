import { createContext } from 'react'

import { EmptyStateSize, type EmptyStateContextValue } from './types'

export const EmptyStateContext = createContext<EmptyStateContextValue>({
  size: EmptyStateSize.Default,
})
