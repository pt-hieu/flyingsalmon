import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import { Tooltip } from '@/registry/ui/tooltip'

import {
  avatarGroupChipVariants,
  avatarGroupItemClassName,
  avatarGroupVariants,
} from './classnames'
import type { AvatarGroupItem } from './types'

export interface AvatarGroupProps extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  items: AvatarGroupItem[]
  size?: AvatarSize
  max?: number
  cap?: number
}

function resolveItemName(item: AvatarGroupItem) {
  return item.name || item.alt || ''
}

function stackingLayer(layer: number) {
  return { '--avatar-group-layer': layer } as React.CSSProperties
}

function focusableElementsOf(group: HTMLElement) {
  return Array.from(group.querySelectorAll<HTMLElement>('[tabindex]'))
}

export function AvatarGroup({
  items,
  size = AvatarSize.Default,
  max = 4,
  cap,
  className,
  ...props
}: AvatarGroupProps) {
  const [focusedPosition, setFocusedPosition] = useState(0)

  const visibleLimit = Math.max(1, max)
  const visibleItems = items.slice(0, visibleLimit)
  const hiddenItems = items.slice(visibleLimit)
  const hiddenCount = hiddenItems.length
  const chipCount = cap === undefined ? hiddenCount : Math.min(hiddenCount, cap)

  const itemNames = visibleItems.map(resolveItemName)
  const itemFocusPositions: number[] = []
  let assignedPositions = 0
  for (const itemName of itemNames) {
    itemFocusPositions.push(itemName ? assignedPositions++ : -1)
  }
  const chipFocusPosition = hiddenCount > 0 ? assignedPositions++ : -1
  const hiddenNames = hiddenItems
    .map(resolveItemName)
    .filter(Boolean)
    .join(', ')
  const activePosition = Math.min(focusedPosition, assignedPositions - 1)

  const moveFocusTo = (group: HTMLElement, position: number) => {
    const focusableElements = focusableElementsOf(group)
    const clampedPosition = Math.min(
      Math.max(position, 0),
      focusableElements.length - 1,
    )
    const target = focusableElements[clampedPosition]

    if (!target) return

    setFocusedPosition(clampedPosition)
    target.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const group = event.currentTarget
    const currentPosition = focusableElementsOf(group).indexOf(
      document.activeElement as HTMLElement,
    )

    if (currentPosition === -1) return

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveFocusTo(group, currentPosition + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveFocusTo(group, currentPosition - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveFocusTo(group, 0)
    } else if (event.key === 'End') {
      event.preventDefault()
      moveFocusTo(group, Number.MAX_SAFE_INTEGER)
    }
  }

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const position = focusableElementsOf(event.currentTarget).indexOf(
      event.target,
    )

    if (position !== -1) setFocusedPosition(position)
  }

  if (items.length === 0) return null

  return (
    <div
      role="group"
      className={cn(avatarGroupVariants({ size }), className)}
      {...props}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    >
      {visibleItems.map((item, index) => {
        const itemName = itemNames[index]
        const itemFocusPosition = itemFocusPositions[index]
        const itemKey = item.id ?? index
        const itemTabIndex = itemFocusPosition === activePosition ? 0 : -1

        const avatar = (
          <Avatar
            key={itemKey}
            name={item.name}
            src={item.src}
            color={item.color}
            size={size}
            alt=""
            role={itemName ? 'img' : undefined}
            aria-label={itemName || undefined}
            aria-hidden={itemName ? undefined : true}
            tabIndex={itemName ? itemTabIndex : undefined}
            className={avatarGroupItemClassName}
            style={stackingLayer(visibleItems.length - index)}
          />
        )

        if (!itemName) return avatar

        return (
          <Tooltip key={itemKey} content={itemName}>
            {avatar}
          </Tooltip>
        )
      })}

      {hiddenCount > 0 ? (
        <Tooltip content={hiddenNames}>
          <span
            role="img"
            aria-label={`${hiddenCount} more`}
            tabIndex={chipFocusPosition === activePosition ? 0 : -1}
            className={avatarGroupChipVariants({ size })}
            style={stackingLayer(0)}
          >
            {`+${chipCount}`}
          </span>
        </Tooltip>
      ) : null}
    </div>
  )
}
