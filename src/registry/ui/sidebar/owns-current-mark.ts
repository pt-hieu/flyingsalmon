import type { SidebarNestState } from './types'

export function ownsCurrentMark(
  isActive: boolean,
  nest: SidebarNestState | null,
  isNestChild: boolean,
) {
  if (!nest) return isActive
  if (isNestChild) return isActive && nest.open

  return isActive || (!nest.open && nest.hasActiveChild)
}
