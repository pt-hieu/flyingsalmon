import { Link } from '@tanstack/react-router'
import { SearchX } from 'lucide-react'

import { componentCatalog } from '@/components/component-catalog'
import { ComponentPreview } from '@/components/component-preview'
import {
  groupComponentsByCategory,
  searchComponents,
} from '@/components/search-components'
import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@/registry/ui/empty-state'
import { Input, InputType } from '@/registry/ui/input'

export interface ComponentsOverviewProps {
  query: string
  onQueryChange: (query: string) => void
}

export function ComponentsOverview({
  query,
  onQueryChange,
}: ComponentsOverviewProps) {
  const categoryGroups = groupComponentsByCategory(
    searchComponents(componentCatalog, query),
  )

  return (
    <section aria-labelledby="components" className="space-y-10 px-6 py-12">
      <header className="space-y-3">
        <h2
          id="components"
          className="font-heading text-2xl font-bold tracking-tight"
        >
          Components
        </h2>
        <p className="text-muted-foreground">
          Everything the registry ships. Pick one to see its examples, its
          guidelines, and how to use it from the keyboard.
        </p>
      </header>

      <Input
        type={InputType.Search}
        aria-label="Filter components"
        placeholder="Filter by name, alias, or category"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="max-w-sm"
      />

      {categoryGroups.length === 0 ? (
        <EmptyState>
          <EmptyStateIcon>
            <SearchX />
          </EmptyStateIcon>
          <EmptyStateTitle>No components match “{query}”</EmptyStateTitle>
          <EmptyStateActions>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => onQueryChange('')}
            >
              Clear search
            </Button>
          </EmptyStateActions>
        </EmptyState>
      ) : (
        categoryGroups.map((categoryGroup) => (
          <section
            key={categoryGroup.category}
            aria-labelledby={`category-${categoryGroup.category}`}
            className="space-y-4"
          >
            <h3
              id={`category-${categoryGroup.category}`}
              className="font-heading text-lg font-semibold tracking-tight"
            >
              {categoryGroup.label}
            </h3>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryGroup.components.map((component) => (
                <li key={component.to} className="flex">
                  <Card interactive className="flex-1 overflow-hidden pt-0">
                    <div
                      inert
                      className="bg-muted border-border flex h-36 items-center justify-center overflow-hidden border-b"
                    >
                      <ComponentPreview to={component.to} />
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Link to={component.to}>{component.label}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {component.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </section>
  )
}
