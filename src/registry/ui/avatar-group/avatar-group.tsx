import { cn } from '@/lib/utils'
import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import { Tooltip } from '@/registry/ui/tooltip'

import {
  avatarGroupChipVariants,
  avatarGroupItemClassName,
  avatarGroupVariants,
} from './classnames'
import { resolveItemName } from './resolve-item-name'
import { stackingLayer } from './stacking-layer'
import type { AvatarGroupItem } from './types'
import { useRovingFocus } from './use-roving-focus'

export interface AvatarGroupProps extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  items: AvatarGroupItem[]
  size?: AvatarSize
  max?: number
  cap?: number
}

export function AvatarGroup({
  items,
  size = AvatarSize.Default,
  max = 4,
  cap,
  className,
  onKeyDown,
  onFocus,
  onBlur,
  ...props
}: AvatarGroupProps) {
  const visibleLimit = Math.max(1, max)
  const visibleItems = items.slice(0, visibleLimit)
  const hiddenItems = items.slice(visibleLimit)
  const hiddenCount = hiddenItems.length
  const chipCount = cap === undefined ? hiddenCount : Math.min(hiddenCount, cap)
  const hiddenNames = hiddenItems
    .map(resolveItemName)
    .filter(Boolean)
    .join(', ')

  const itemNames = visibleItems.map(resolveItemName)
  const itemFocusPositions: number[] = []
  let assignedPositions = 0
  for (const itemName of itemNames) {
    itemFocusPositions.push(itemName ? assignedPositions++ : -1)
  }
  const chipFocusPosition = hiddenCount > 0 ? assignedPositions++ : -1

  const rovingFocus = useRovingFocus(assignedPositions)

  if (items.length === 0) return null

  return (
    <div
      role="group"
      className={cn(avatarGroupVariants({ size }), className)}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        if (!event.defaultPrevented) rovingFocus.handleKeyDown(event)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        rovingFocus.handleFocus(event)
      }}
      onBlur={(event) => {
        onBlur?.(event)
        rovingFocus.handleBlur(event)
      }}
    >
      {visibleItems.map((item, index) => {
        const itemName = itemNames[index]
        const itemKey = item.id ?? index
        const avatarProps = {
          name: item.name,
          src: item.src,
          color: item.color,
          size,
          alt: '',
          className: avatarGroupItemClassName,
          style: stackingLayer(visibleItems.length - index),
        }

        if (!itemName)
          return <Avatar key={itemKey} {...avatarProps} aria-hidden />

        return (
          <Tooltip key={itemKey} content={itemName}>
            <Avatar
              {...avatarProps}
              role="img"
              aria-label={itemName}
              tabIndex={
                itemFocusPositions[index] === rovingFocus.activePosition
                  ? 0
                  : -1
              }
            />
          </Tooltip>
        )
      })}

      {hiddenCount > 0 ? (
        <Tooltip content={hiddenNames}>
          <span
            role="img"
            aria-label={`${hiddenCount} more`}
            tabIndex={chipFocusPosition === rovingFocus.activePosition ? 0 : -1}
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
