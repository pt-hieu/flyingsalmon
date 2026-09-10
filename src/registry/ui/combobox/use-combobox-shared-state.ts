import { use } from 'react'

import { ComboboxSharedStateContext } from './context'
import type { ComboboxSharedState } from './types'

export function useComboboxSharedState(): ComboboxSharedState {
  const sharedState = use(ComboboxSharedStateContext)

  if (!sharedState) {
    throw new Error('Combobox parts are only available inside <Combobox>')
  }

  return sharedState
}
