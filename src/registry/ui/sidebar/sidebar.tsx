import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'

import { sidebarClassName } from './classnames'
import { SidebarLayout } from './types'
import { useSidebarSharedState } from './use-sidebar'

export type SidebarProps = Omit<
  React.ComponentProps<'aside'>,
  'id' | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

export function Sidebar({ className, ...props }: SidebarProps) {
  const { collapsed, layout, sidebarId, measured } =
    useSidebarSharedState('Sidebar')

  const isStrip = layout === SidebarLayout.Strip

  const wideWidth = collapsed
    ? 'var(--sidebar-width-rail)'
    : 'var(--sidebar-width)'

  const width = isStrip ? '100%' : wideWidth

  return (
    <motion.aside
      data-collapsed={collapsed}
      initial={false}
      animate={measured ? { width } : undefined}
      transition={isStrip ? { duration: 0 } : springSettle}
      className={cn(sidebarClassName, className)}
      {...props}
      id={sidebarId}
    />
  )
}
