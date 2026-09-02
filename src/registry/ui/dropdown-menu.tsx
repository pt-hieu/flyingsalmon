import { DropdownMenu as DropdownMenuPrimitive, Slot } from 'radix-ui'
import { createContext, use } from 'react'

import { cn } from '@/lib/utils'
import {
  menuContent,
  menuItem,
  menuItemDestructive,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'

const DropdownMenuExhibitionContext = createContext(false)

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

export interface DropdownMenuContentProps extends Pick<
  React.ComponentProps<typeof DropdownMenuPrimitive.Content>,
  'side' | 'align' | 'className' | 'children'
> {}

export function DropdownMenuContent({
  side = 'bottom',
  align = 'center',
  className,
  children,
}: DropdownMenuContentProps) {
  const exhibitionMode = use(DropdownMenuExhibitionContext)

  const content = (
    <DropdownMenuPrimitive.Content
      side={side}
      align={align}
      sideOffset={8}
      alignOffset={0}
      avoidCollisions
      collisionPadding={8}
      loop={false}
      className={cn(
        menuContent,
        'outline-hidden',
        'max-h-(--radix-dropdown-menu-content-available-height) overflow-y-auto',
        'origin-(--radix-popper-transform-origin)',
        'data-[state=open]:animate-floating-anchored-enter',
        'data-[state=closed]:animate-floating-anchored-exit',
        className,
      )}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  )

  if (exhibitionMode) return content

  return <DropdownMenuPrimitive.Portal>{content}</DropdownMenuPrimitive.Portal>
}

export function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return <DropdownMenuPrimitive.Group {...props} />
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(menuLabel, className)}
      {...props}
    />
  )
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn(menuSeparator, className)}
      {...props}
    />
  )
}

export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-muted-foreground group-data-highlighted:text-inherit ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}

export type DropdownMenuItemVariant = 'default' | 'destructive'

export interface DropdownMenuItemProps extends Omit<
  React.ComponentProps<typeof DropdownMenuPrimitive.Item>,
  'asChild'
> {
  variant?: DropdownMenuItemVariant
  icon?: React.ReactNode
  asChild?: boolean
}

export function DropdownMenuItem({
  variant = 'default',
  icon,
  asChild = false,
  className,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      asChild={asChild}
      className={cn(
        menuItem,
        'group',
        menuItemHighlighted,
        variant === 'destructive' && menuItemDestructive,
        className,
      )}
      {...props}
    >
      <span key="icon" aria-hidden className={menuItemIconSlot}>
        {icon}
      </span>
      {asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children}
    </DropdownMenuPrimitive.Item>
  )
}
