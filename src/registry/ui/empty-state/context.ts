import { createContext } from 'react'

import {
  EmptyStateKind,
  EmptyStateSize,
  type EmptyStateContextValue,
} from './types'

export const EmptyStateContext = createContext<EmptyStateContextValue>({
  size: EmptyStateSize.Default,
  kind: EmptyStateKind.Empty,
})
