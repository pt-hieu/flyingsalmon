import { MapPinPlus, Share2, UserPlus } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Tooltip } from '@/registry/ui/tooltip'

export function TooltipDemo() {
  return (
    <div className="flex gap-2">
      <Tooltip content="Add a place">
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Icon}
          aria-label="Add a place"
          icon={<MapPinPlus />}
        />
      </Tooltip>
      <Tooltip content="Invite a traveller">
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Icon}
          aria-label="Invite a traveller"
          icon={<UserPlus />}
        />
      </Tooltip>
      <Tooltip content="Share the trip">
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Icon}
          aria-label="Share the trip"
          icon={<Share2 />}
        />
      </Tooltip>
    </div>
  )
}
