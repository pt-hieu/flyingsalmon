import { Save } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Tooltip } from '@/registry/ui/tooltip'

export function TooltipKeyboardShortcut() {
  return (
    <Tooltip content="Save the itinerary (⌘S)">
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Icon}
        aria-label="Save the itinerary"
        icon={<Save />}
      />
    </Tooltip>
  )
}
