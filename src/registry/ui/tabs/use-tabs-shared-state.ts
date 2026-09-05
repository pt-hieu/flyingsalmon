import { useContext } from 'react'

import { TabsSharedStateContext } from './context'

export function useTabsSharedState(componentName: string) {
  const sharedState = useContext(TabsSharedStateContext)

  if (!sharedState) {
    throw new Error(`${componentName} must be rendered inside <Tabs>`)
  }

  return sharedState
}
