import type { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'

export enum ToggleGroupMode {
  Single = 'single',
  Multiple = 'multiple',
}

export enum ToggleGroupSize {
  Default = 'default',
  Small = 'sm',
}

export enum ToggleGroupItemVariant {
  Default = 'default',
  Amber = 'amber',
}

export type ToggleGroupItemRootProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Item
>

export interface ToggleGroupSharedState {
  size: ToggleGroupSize
  pressedValues: string[]
  isAtMax: boolean
}
