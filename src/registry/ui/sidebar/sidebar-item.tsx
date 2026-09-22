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
  sidebarSubmenuChildItemClassName,
  sidebarSubmenuParentItemClassName,
  sidebarSubmenuRowClassName,
} from './classnames'
import { SidebarSubmenuContext, SidebarSubmenuItemsContext } from './context'
import { SidebarSubmenuToggle } from './sidebar-submenu-toggle'
import { SidebarLayout, type SidebarSubmenuState } from './types'
import { useSidebarSharedState } from './use-sidebar'

interface SlottedItemProps {
  children?: React.ReactNode
  className?: string
  'aria-current'?: React.AriaAttributes['aria-current']
}

export interface SidebarItemProps extends React.ComponentProps<'button'> {
  icon?: React.ReactNode
  asChild?: boolean
}

function ownsCurrentMark(
  isActive: boolean,
  submenu: SidebarSubmenuState | null,
  isSubmenuChild: boolean,
) {
  if (!submenu) return isActive
  if (isSubmenuChild) return isActive && submenu.open

  return isActive || (!submenu.open && submenu.hasActiveChild)
}

export function SidebarItem({
  icon,
  asChild = false,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { layout } = useSidebarSharedState()
  const submenu = useContext(SidebarSubmenuContext)
  const isSubmenuChild = useContext(SidebarSubmenuItemsContext)
  const isSubmenuParent = submenu !== null && !isSubmenuChild

  const slottedElement = asChild
    ? (Children.only(children) as React.ReactElement<SlottedItemProps>)
    : null

  const label = slottedElement ? slottedElement.props.children : children

  const isActive =
    (props['aria-current'] ?? slottedElement?.props['aria-current']) === 'page'

  const registerActiveChild = submenu?.registerActiveChild

  useEffect(() => {
    if (registerActiveChild && isSubmenuChild && isActive) {
      return registerActiveChild()
    }
  }, [registerActiveChild, isSubmenuChild, isActive])

  const showsBar = ownsCurrentMark(isActive, submenu, isSubmenuChild)

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
    isSubmenuParent && sidebarSubmenuParentItemClassName,
    isSubmenuChild && sidebarSubmenuChildItemClassName,
    slottedElement?.props.className,
    className,
  )

  const item = slottedElement ? (
    cloneElement(
      slottedElement,
      { ...props, className: itemClassName },
      content,
    )
  ) : (
    <button type="button" className={itemClassName} {...props}>
      {content}
    </button>
  )

  const row = isSubmenuParent ? (
    <div className={sidebarSubmenuRowClassName}>
      {item}
      <SidebarSubmenuToggle submenu={submenu} label={label} />
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
