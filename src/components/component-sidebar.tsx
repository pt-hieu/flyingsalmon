import { Link } from '@tanstack/react-router'

import { componentCatalog } from '@/components/component-catalog'
import { groupComponentsByCategory } from '@/components/search-components'

const sidebarLinkClassName =
  'text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors duration-(--motion-fast)'

const activeSidebarLinkProps = { className: 'bg-muted text-foreground' }

export function ComponentSidebar() {
  return (
    <aside className="border-border hidden w-56 shrink-0 self-stretch border-r md:block">
      <nav className="sticky top-14 flex max-h-[calc(100dvh-3.5rem)] flex-col gap-6 overflow-y-auto p-4">
        <Link
          to="/"
          className={sidebarLinkClassName}
          activeOptions={{ exact: true, includeSearch: false }}
          activeProps={activeSidebarLinkProps}
        >
          Overview
        </Link>

        {groupComponentsByCategory(componentCatalog).map((categoryGroup) => (
          <div
            key={categoryGroup.category}
            role="group"
            aria-labelledby={`sidebar-category-${categoryGroup.category}`}
            className="flex flex-col gap-1"
          >
            <span
              id={`sidebar-category-${categoryGroup.category}`}
              className="text-muted-foreground px-3 pb-1 text-xs font-medium"
            >
              {categoryGroup.label}
            </span>
            {categoryGroup.components.map((component) => (
              <Link
                key={component.to}
                to={component.to}
                className={sidebarLinkClassName}
                activeProps={activeSidebarLinkProps}
              >
                {component.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
