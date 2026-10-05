import { Share2 } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Tooltip } from '@/registry/ui/tooltip'

export function TooltipUsage() {
  return (
    <Tooltip content="Share the trip">
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Icon}
        aria-label="Share the trip"
        icon={<Share2 />}
      />
    </Tooltip>
  )
}
