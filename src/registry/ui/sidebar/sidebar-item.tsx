import { motion } from 'motion/react'
import { Children, cloneElement } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'
import { Tooltip, TooltipSide } from '@/registry/ui/tooltip'

import {
  sidebarActiveIndicatorClassName,
  sidebarItemClassName,
  sidebarItemIconClassName,
  sidebarItemLabelClassName,
} from './classnames'
import { SidebarLayout } from './types'
import { useSidebar } from './use-sidebar'

interface SlottedItemProps {
  children?: React.ReactNode
  className?: string
  'aria-current'?: React.AriaAttributes['aria-current']
}

export interface SidebarItemProps extends React.ComponentProps<'button'> {
  icon?: React.ReactNode
  asChild?: boolean
}

export function SidebarItem({
  icon,
  asChild = false,
  className,
  children,
  ...props
}: SidebarItemProps) {
  const { layout } = useSidebar('SidebarItem')

  const slottedElement = asChild
    ? (Children.only(children) as React.ReactElement<SlottedItemProps>)
    : null

  const label = slottedElement ? slottedElement.props.children : children

  const isActive =
    (props['aria-current'] ?? slottedElement?.props['aria-current']) === 'page'

  const content = (
    <>
      {icon ? <span className={sidebarItemIconClassName}>{icon}</span> : null}
      <span className={sidebarItemLabelClassName}>{label}</span>
      {isActive ? (
        <motion.span
          layout
          layoutId="sidebar-active-indicator"
          transition={springBounce}
          className={sidebarActiveIndicatorClassName}
        />
      ) : null}
    </>
  )

  const item = slottedElement ? (
    cloneElement(
      slottedElement,
      {
        ...props,
        className: cn(
          sidebarItemClassName,
          slottedElement.props.className,
          className,
        ),
      },
      content,
    )
  ) : (
    <button
      type="button"
      className={cn(sidebarItemClassName, className)}
      {...props}
    >
      {content}
    </button>
  )

  if (layout === SidebarLayout.Rail && typeof label === 'string') {
    return (
      <Tooltip content={label} side={TooltipSide.Right}>
        {item}
      </Tooltip>
    )
  }

  return item
}
