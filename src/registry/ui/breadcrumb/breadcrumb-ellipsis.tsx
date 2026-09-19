import { Ellipsis } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

import {
  breadcrumbEllipsisIconClassName,
  breadcrumbEllipsisTriggerClassName,
} from './classnames'

export interface BreadcrumbEllipsisProps {
  label?: string
  className?: string
  children: React.ReactNode
}

export function BreadcrumbEllipsis({
  label = 'Show hidden levels',
  className,
  children,
}: BreadcrumbEllipsisProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          aria-label={label}
          className={cn(breadcrumbEllipsisTriggerClassName, className)}
        >
          <Ellipsis className={breadcrumbEllipsisIconClassName} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DropdownMenuAlign.Start}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
