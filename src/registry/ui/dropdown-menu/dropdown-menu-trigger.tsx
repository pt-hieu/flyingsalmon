import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

export interface DropdownMenuTriggerProps extends Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
  'asChild'
> {
  children: React.ReactElement
}

export function DropdownMenuTrigger({
  children,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger asChild {...props}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  )
}
