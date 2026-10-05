import { Archive, Copy, Ellipsis } from 'lucide-react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuDisabledItem() {
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
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem icon={<Archive />} disabled>
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
