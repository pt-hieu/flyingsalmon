import type { RadioGroup as RadioGroupPrimitive } from 'radix-ui'

export enum RadioGroupOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type RadioGroupRootProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Root
>

export type RadioGroupItemRootProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>

export interface RadioGroupSharedState {
  error: boolean
  disabled: boolean
}
