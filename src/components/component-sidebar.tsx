import { Link } from '@tanstack/react-router'

import { componentNavLinks } from '@/components/component-nav-links'

export function ComponentSidebar() {
  return (
    <aside className="border-border hidden w-56 shrink-0 border-r md:block">
      <nav className="sticky top-14 flex flex-col gap-1 p-4">
        {componentNavLinks.map((navLink) => (
          <Link
            key={navLink.to}
            to={navLink.to}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors duration-(--motion-fast)"
            activeProps={{ className: 'bg-muted text-foreground' }}
          >
            {navLink.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
