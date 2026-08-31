import { Link, createFileRoute } from '@tanstack/react-router'

import { componentNavLinks } from '@/components/component-nav-links'

export const Route = createFileRoute('/components/')({
  component: ComponentsIndexPage,
})

function ComponentsIndexPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-muted-foreground text-lg">
          Everything the registry ships. Pick one to read its states, its
          motion, and its accessibility contract.
        </p>
      </header>

      <ul className="space-y-2">
        {componentNavLinks.map((navLink) => (
          <li key={navLink.to}>
            <Link
              to={navLink.to}
              className="border-border hover:border-ring block rounded-lg border px-4 py-3 font-medium transition-colors duration-(--motion-fast)"
            >
              {navLink.label}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
