import { use } from 'react'

import { TabsSharedStateContext } from './context'

export function useTabsSharedState() {
  const sharedState = use(TabsSharedStateContext)

  if (!sharedState) {
    throw new Error('Tabs state is only available inside <Tabs>')
  }

  return sharedState
}
