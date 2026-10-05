import { CalendarClock, Lock } from 'lucide-react'

import { IconTooltip } from '@/registry/ui/icon-tooltip'

export function IconTooltipDemo() {
  return (
    <span className="text-muted-foreground flex items-center gap-3 [&_svg]:size-4">
      <IconTooltip content="Locked, so the AI won’t change it">
        <Lock aria-hidden />
      </IconTooltip>
      <IconTooltip content="Tied to this date">
        <CalendarClock aria-hidden />
      </IconTooltip>
      <IconTooltip content="Food activities">🍜</IconTooltip>
    </span>
  )
}
