import { Link } from '@tanstack/react-router'

import { componentCatalog } from '@/components/component-catalog'
import { foundationPages } from '@/components/foundation-pages'
import { groupComponentsByCategory } from '@/components/search-components'

import {
  activeSidebarLinkClassName,
  sidebarClassName,
  sidebarLinkClassName,
  sidebarNavClassName,
} from './classnames'
import { SidebarLinkGroup } from './sidebar-link-group'

export function ComponentSidebar() {
  return (
    <aside className={sidebarClassName}>
      <nav className={sidebarNavClassName}>
        <Link
          to="/"
          className={sidebarLinkClassName}
          activeOptions={{ exact: true, includeSearch: false }}
          activeProps={{ className: activeSidebarLinkClassName }}
        >
          Home
        </Link>

        <SidebarLinkGroup
          id="sidebar-category-foundations"
          label="Foundations"
          links={foundationPages}
        />

        {groupComponentsByCategory(componentCatalog).map((categoryGroup) => (
          <SidebarLinkGroup
            key={categoryGroup.category}
            id={`sidebar-category-${categoryGroup.category}`}
            label={categoryGroup.label}
            links={categoryGroup.components}
          />
        ))}
      </nav>
    </aside>
  )
}
