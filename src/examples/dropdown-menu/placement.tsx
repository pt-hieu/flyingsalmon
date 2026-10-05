import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSide,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuPlacement() {
  return (
    <div className="flex w-full justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={ButtonVariant.Outline}>Travellers</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={DropdownMenuSide.Bottom}
          align={DropdownMenuAlign.End}
        >
          <DropdownMenuItem>Invite by email</DropdownMenuItem>
          <DropdownMenuItem>Copy the invite link</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
