import { Ellipsis } from 'lucide-react'

import { cn } from '@/lib/utils'
import { PanelAlign } from '@/registry/lib/panel'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdown-menu'

import {
  breadcrumbEllipsisIconClassName,
  breadcrumbEllipsisTriggerClassName,
} from './classnames'

export interface BreadcrumbEllipsisProps extends Omit<
  React.ComponentProps<'button'>,
  'children'
> {
  children: React.ReactNode
}

export function BreadcrumbEllipsis({
  'aria-label': ariaLabel = 'Show hidden levels',
  className,
  children,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(breadcrumbEllipsisTriggerClassName, className)}
          {...props}
        >
          <Ellipsis className={breadcrumbEllipsisIconClassName} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={PanelAlign.Start}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
