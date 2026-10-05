import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemVariant,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.IconSmall}
          aria-label="Trip actions"
          icon={<Ellipsis />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DropdownMenuAlign.Start}>
        <DropdownMenuLabel>Kyoto in autumn</DropdownMenuLabel>
        <DropdownMenuItem icon={<Pencil />}>
          Rename
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          icon={<Trash2 />}
          variant={DropdownMenuItemVariant.Destructive}
        >
          Delete trip
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
