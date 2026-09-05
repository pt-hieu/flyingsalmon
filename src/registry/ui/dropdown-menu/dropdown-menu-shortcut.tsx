import { cn } from '@/lib/utils'
import { dropdownMenuShortcut } from './classnames'

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return <span className={cn(dropdownMenuShortcut, className)} {...props} />
}
