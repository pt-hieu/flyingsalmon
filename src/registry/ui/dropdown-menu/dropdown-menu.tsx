import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

export interface DropdownMenuProps extends Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
  'modal'
> {}

export function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root modal {...props} />
}
