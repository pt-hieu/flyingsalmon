import { motion } from 'motion/react'
import { Children, cloneElement, useContext, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

import { Tooltip, TooltipSide } from '../tooltip'

import {
  sidebarActiveIndicatorClassName,
  sidebarItemClassName,
  sidebarItemIconClassName,
  sidebarItemLabelClassName,
  sidebarNestChildItemClassName,
  sidebarNestParentItemClassName,
  sidebarNestRowClassName,
} from './classnames'
import { SidebarNestContext, SidebarNestItemsContext } from './context'
import { SidebarNestToggle } from './sidebar-nest-toggle'
import { SidebarLayout, type SidebarNestState } from './types'
import { useSidebarSharedState } from './use-sidebar'

interface SlottedItemProps {
  children?: React.ReactNode
  className?: string
  'data-slot'?: string
  'aria-current'?: React.AriaAttributes['aria-current']
}

export interface SidebarItemProps extends React.ComponentProps<'button'> {
  icon?: React.ReactNode
  asChild?: boolean
}

function ownsCurrentMark(
  isActive: boolean,
  nest: SidebarNestState | null,
  isNestChild: boolean,
) {
  if (!nest) return isActive
  if (isNestChild) return isActive && nest.open

  return isActive || (!nest.open && nest.hasActiveChild)
}

export function SidebarItem({
  icon,
  asChild = false,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { layout } = useSidebarSharedState()
  const nest = useContext(SidebarNestContext)
  const isNestChild = useContext(SidebarNestItemsContext)
  const isNestParent = nest !== null && !isNestChild

  const slottedElement = asChild
    ? (Children.only(children) as React.ReactElement<SlottedItemProps>)
    : null

  const label = slottedElement ? slottedElement.props.children : children

  const isActive =
    (props['aria-current'] ?? slottedElement?.props['aria-current']) === 'page'

  const registerActiveChild = nest?.registerActiveChild

  useEffect(() => {
    if (registerActiveChild && isNestChild && isActive) {
      return registerActiveChild()
    }
  }, [registerActiveChild, isNestChild, isActive])

  const showsBar = ownsCurrentMark(isActive, nest, isNestChild)

  const content = (
    <>
      {icon ? <span className={sidebarItemIconClassName}>{icon}</span> : null}
      <span className={sidebarItemLabelClassName}>{label}</span>
      {showsBar ? (
        <motion.span
          data-slot="sidebar-active-indicator"
          layoutId="sidebar-active-indicator"
          transition={springBounce}
          className={sidebarActiveIndicatorClassName}
        />
      ) : null}
    </>
  )

  const itemClassName = cn(
    sidebarItemClassName,
    isNestParent && sidebarNestParentItemClassName,
    isNestChild && sidebarNestChildItemClassName,
    slottedElement?.props.className,
    className,
  )

  const item = slottedElement ? (
    cloneElement(
      slottedElement,
      { ...props, 'data-slot': 'sidebar-item', className: itemClassName },
      content,
    )
  ) : (
    <button
      type="button"
      data-slot="sidebar-item"
      className={itemClassName}
      {...props}
    >
      {content}
    </button>
  )

  const row = isNestParent ? (
    <div className={sidebarNestRowClassName}>
      {item}
      <SidebarNestToggle nest={nest} label={label} />
    </div>
  ) : (
    item
  )

  // The registry tooltip renders text only, so a non-string label keeps its
  // own visible text in the rail instead of gaining a tooltip.
  if (layout === SidebarLayout.Collapsed && typeof label === 'string') {
    return (
      <Tooltip content={label} side={TooltipSide.Right}>
        {row}
      </Tooltip>
    )
  }

  return row
}
