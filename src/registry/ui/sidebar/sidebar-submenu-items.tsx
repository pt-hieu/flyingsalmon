import { motion } from 'motion/react'
import { useContext } from 'react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'

import { sidebarSubmenuItemsClassName } from './classnames'
import { SidebarSubmenuContext, SidebarSubmenuItemsContext } from './context'

export type SidebarSubmenuItemsProps = Omit<
  React.ComponentProps<'div'>,
  'id' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

export function SidebarSubmenuItems({
  className,
  ...props
}: SidebarSubmenuItemsProps) {
  const submenu = useContext(SidebarSubmenuContext)

  if (!submenu) {
    throw new Error('SidebarSubmenuItems only renders inside <SidebarSubmenu>')
  }

  const { open, itemsId } = submenu

  return (
    <SidebarSubmenuItemsContext value>
      <motion.div
        id={itemsId}
        data-slot="sidebar-submenu-items"
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={springSettle}
        inert={!open}
        aria-hidden={!open}
        className={cn(sidebarSubmenuItemsClassName, className)}
        {...props}
      />
    </SidebarSubmenuItemsContext>
  )
}
