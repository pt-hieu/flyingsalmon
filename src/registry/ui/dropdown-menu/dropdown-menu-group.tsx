import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

export interface DropdownMenuGroupProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Group
> {}

export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
  return <DropdownMenuPrimitive.Group {...props} />
}
