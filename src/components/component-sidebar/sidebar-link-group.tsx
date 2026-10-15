import { Link } from '@tanstack/react-router'

import type { DocRoute } from '@/components/doc-page'

import {
  activeSidebarLinkClassName,
  sidebarLinkClassName,
  sidebarLinkGroupClassName,
  sidebarLinkGroupLabelClassName,
} from './classnames'

export interface SidebarLinkGroupProps {
  id: string
  label: string
  links: { to: DocRoute; label: string }[]
}

export function SidebarLinkGroup({ id, label, links }: SidebarLinkGroupProps) {
  return (
    <div
      role="group"
      aria-labelledby={id}
      className={sidebarLinkGroupClassName}
    >
      <span id={id} className={sidebarLinkGroupLabelClassName}>
        {label}
      </span>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={sidebarLinkClassName}
          activeProps={{ className: activeSidebarLinkClassName }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
