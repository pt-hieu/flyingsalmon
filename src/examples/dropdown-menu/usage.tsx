import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuUsage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={ButtonVariant.Outline}>Trip actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => console.log('Rename')}>
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Duplicate')}>
          Duplicate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
