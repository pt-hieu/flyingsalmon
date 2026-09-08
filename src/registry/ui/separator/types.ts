import type { Separator as SeparatorPrimitive } from 'radix-ui'

export enum SeparatorOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type SeparatorRootProps = React.ComponentProps<
  typeof SeparatorPrimitive.Root
>
