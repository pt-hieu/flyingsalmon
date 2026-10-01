import type { Switch as SwitchPrimitive } from 'radix-ui'

export enum SwitchSize {
  Default = 'default',
  Small = 'sm',
}

export type SwitchRootProps = React.ComponentProps<typeof SwitchPrimitive.Root>
