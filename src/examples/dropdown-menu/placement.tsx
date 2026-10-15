import { PanelAlign, PanelSide } from '@/registry/lib/panel'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuPlacement() {
  return (
    <div className="flex w-full justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={ButtonVariant.Outline}>Travellers</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side={PanelSide.Bottom} align={PanelAlign.End}>
          <DropdownMenuItem>Invite by email</DropdownMenuItem>
          <DropdownMenuItem>Copy the invite link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
