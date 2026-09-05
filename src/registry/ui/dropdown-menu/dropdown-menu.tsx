import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'

import { DropdownMenuExhibitionContext } from './context'

export interface DropdownMenuProps extends Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
  'modal'
> {
  exhibitionMode?: boolean
}

export function DropdownMenu({
  exhibitionMode = false,
  ...props
}: DropdownMenuProps) {
  return (
    <DropdownMenuExhibitionContext value={exhibitionMode}>
      <DropdownMenuPrimitive.Root modal={!exhibitionMode} {...props} />
    </DropdownMenuExhibitionContext>
  )
}
