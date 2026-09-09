import { createContext } from 'react'

import { DialogSize, type DialogContextValue } from './types'

export const DialogContext = createContext<DialogContextValue>({
  size: DialogSize.Default,
  dismissible: true,
  pending: false,
})
