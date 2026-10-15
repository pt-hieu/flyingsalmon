import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

interface DropdownMenuUsageProps {
  onRename: () => void
  onDuplicate: () => void
}

export function DropdownMenuUsage({
  onRename,
  onDuplicate,
}: DropdownMenuUsageProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={ButtonVariant.Outline}>Trip actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onRename}>Rename</DropdownMenuItem>
        <DropdownMenuItem onSelect={onDuplicate}>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
