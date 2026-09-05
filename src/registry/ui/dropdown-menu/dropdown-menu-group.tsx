import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

export function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return <DropdownMenuPrimitive.Group {...props} />
}
