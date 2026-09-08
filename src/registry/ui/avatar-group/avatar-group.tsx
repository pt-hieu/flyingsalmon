import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import { Tooltip } from '@/registry/ui/tooltip'

import { childIndexContaining } from './child-index-containing'
import {
  avatarGroupChipVariants,
  avatarGroupItemClassName,
  avatarGroupVariants,
} from './classnames'
import { itemStyle } from './item-style'
import { resolveRoster } from './resolve-roster'
import { stepFocusWithin } from './step-focus-within'
import { tabStopChildIndex } from './tab-stop-child-index'
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

export function AvatarGroup({
  items,
  size = AvatarSize.Default,
  max = 4,
  cap,
  className,
  onKeyDown,
  onFocus,
  onBlur,
  onPointerOver,
  onPointerLeave,
  ...props
}: AvatarGroupProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const roster = resolveRoster({ items, max, cap })
  const revealedIndex = hoveredIndex ?? focusedIndex
  const tabStopIndex = tabStopChildIndex({
    roster,
    focusedChildIndex: focusedIndex,
  })

  if (roster.visibleItems.length === 0) return null

  return (
    <div
      role="group"
      className={cn(avatarGroupVariants({ size }), className)}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        if (!event.defaultPrevented) stepFocusWithin(event)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        setFocusedIndex(childIndexContaining(event.currentTarget, event.target))
      }}
      onBlur={(event) => {
        onBlur?.(event)

        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusedIndex(null)
        }
      }}
      onPointerOver={(event) => {
        onPointerOver?.(event)

        if (event.pointerType === 'touch') return

        const childIndex = childIndexContaining(
          event.currentTarget,
          event.target as Node,
        )

        if (childIndex !== null) setHoveredIndex(childIndex)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        setHoveredIndex(null)
      }}
    >
      {roster.visibleItems.map((visibleItem, childIndex) => {
        const avatarProps = {
          name: visibleItem.item.name,
          src: visibleItem.item.src,
          color: visibleItem.item.color,
          size,
          alt: '',
          className: avatarGroupItemClassName,
          style: itemStyle({
            layer: visibleItem.layer,
            childIndex,
            revealedIndex,
          }),
        }

        if (!visibleItem.name)
          return <Avatar key={visibleItem.key} {...avatarProps} aria-hidden />

        return (
          <Tooltip key={visibleItem.key} content={visibleItem.name}>
            <Avatar
              {...avatarProps}
              role="img"
              aria-label={visibleItem.name}
              tabIndex={childIndex === tabStopIndex ? 0 : -1}
            />
          </Tooltip>
        )
      })}

      {roster.chip ? (
        <Tooltip content={roster.chip.hiddenNames}>
          <span
            role="img"
            aria-label={`${roster.chip.count} more`}
            tabIndex={roster.visibleItems.length === tabStopIndex ? 0 : -1}
            className={avatarGroupChipVariants({ size })}
            style={itemStyle({
              layer: 0,
              childIndex: roster.visibleItems.length,
              revealedIndex,
            })}
          >
            {roster.chip.text}
          </span>
        </Tooltip>
      ) : null}
    </div>
  )
}
