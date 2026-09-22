import { motion } from 'motion/react'
import { useContext } from 'react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'

import { sidebarNestItemsClassName } from './classnames'
import { SidebarNestContext, SidebarNestItemsContext } from './context'

export type SidebarNestItemsProps = Omit<
  React.ComponentProps<'div'>,
  'id' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

export function SidebarNestItems({
  className,
  ...props
}: SidebarNestItemsProps) {
  const nest = useContext(SidebarNestContext)

  if (!nest) {
    throw new Error('SidebarNestItems only renders inside <SidebarNest>')
  }

  const { open, itemsId } = nest

  return (
    <SidebarNestItemsContext value>
      <motion.div
        id={itemsId}
        data-slot="sidebar-nest-items"
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={springSettle}
        inert={!open}
        aria-hidden={!open}
        className={cn(sidebarNestItemsClassName, className)}
        {...props}
      />
    </SidebarNestItemsContext>
  )
}
