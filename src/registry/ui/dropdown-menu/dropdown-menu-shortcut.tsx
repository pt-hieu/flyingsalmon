import { cn } from '@/lib/utils'
import { dropdownMenuShortcut } from './classnames'

export interface DropdownMenuShortcutProps extends React.ComponentProps<'span'> {}

export function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return <span className={cn(dropdownMenuShortcut, className)} {...props} />
}
