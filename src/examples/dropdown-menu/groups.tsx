import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuGroups() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={ButtonVariant.Outline}>Share the trip</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Send</DropdownMenuLabel>
          <DropdownMenuItem>Email the itinerary</DropdownMenuItem>
          <DropdownMenuItem>Copy the invite link</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Export</DropdownMenuLabel>
          <DropdownMenuItem>Download as PDF</DropdownMenuItem>
          <DropdownMenuItem>Add to calendar</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
