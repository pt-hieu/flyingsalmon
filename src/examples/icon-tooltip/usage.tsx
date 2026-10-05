import { Lock } from 'lucide-react'

import { IconTooltip } from '@/registry/ui/icon-tooltip'

export function IconTooltipUsage() {
  return (
    <IconTooltip content="Locked, so the AI won’t change it">
      <Lock aria-hidden className="size-4" />
    </IconTooltip>
  )
}
