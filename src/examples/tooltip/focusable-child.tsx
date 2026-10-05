import { Avatar } from '@/registry/ui/avatar'
import { Tooltip } from '@/registry/ui/tooltip'

export function TooltipFocusableChild() {
  return (
    <Tooltip content="Brian Nguyen, organiser">
      <Avatar tabIndex={0} name="Brian Nguyen" />
    </Tooltip>
  )
}
