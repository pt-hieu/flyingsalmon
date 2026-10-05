import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuWithoutIcons() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={ButtonVariant.Outline}>Sort places</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>By day</DropdownMenuItem>
        <DropdownMenuItem>By distance</DropdownMenuItem>
        <DropdownMenuItem>By opening time</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
