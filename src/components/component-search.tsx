import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import type { CatalogComponent } from '@/components/component-catalog'
import {
  componentCatalog,
  componentCategoryLabels,
} from '@/components/component-catalog'
import type { ComponentCategoryGroup } from '@/components/search-components'
import {
  groupComponentsByCategory,
  searchComponents,
} from '@/components/search-components'
import { isApplePlatform, isSearchShortcut } from '@/components/search-shortcut'
import { cn } from '@/lib/utils'
import { menuItem, menuItemHighlighted, menuLabel } from '@/registry/lib/menu'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import { Input, InputType } from '@/registry/ui/input'

function wrapIndex(index: number, count: number) {
  return (index + count) % count
}

export function ComponentSearch() {
  const navigate = useNavigate()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const resultGroups: ComponentCategoryGroup[] | undefined = query.trim()
    ? undefined
    : groupComponentsByCategory(componentCatalog)
  const results = resultGroups
    ? resultGroups.flatMap((categoryGroup) => categoryGroup.components)
    : searchComponents(componentCatalog, query)
  const optionId = (index: number) => `${listboxId}-option-${index}`

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setQuery('')
      setHighlightedIndex(0)
    }
  }

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)
    setHighlightedIndex(0)
  }

  function selectComponent(component: CatalogComponent) {
    handleOpenChange(false)
    void navigate({ to: component.to })
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const step = event.key === 'ArrowDown' ? 1 : -1
      setHighlightedIndex(wrapIndex(highlightedIndex + step, results.length))
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      selectComponent(results[highlightedIndex])
    }
  }

  useEffect(() => {
    const applePlatform = isApplePlatform()

    function handleShortcut(event: KeyboardEvent) {
      if (!isSearchShortcut(event, applePlatform)) return

      event.preventDefault()
      setOpen(true)
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    if (!open) return

    document
      .getElementById(`${listboxId}-option-${highlightedIndex}`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [open, highlightedIndex, listboxId])

  function renderOption(component: CatalogComponent, index: number) {
    const highlighted = index === highlightedIndex

    return (
      <div
        key={component.to}
        id={optionId(index)}
        role="option"
        aria-selected={highlighted}
        data-highlighted={highlighted || undefined}
        onPointerMove={() => setHighlightedIndex(index)}
        onClick={() => selectComponent(component)}
        className={cn(menuItem, menuItemHighlighted, 'justify-between')}
      >
        <span>{component.label}</span>
        {resultGroups ? null : (
          <span className="text-muted-foreground text-xs">
            {componentCategoryLabels[component.category]}
          </span>
        )}
      </div>
    )
  }

  function renderResults() {
    if (!resultGroups) return results.map(renderOption)

    return resultGroups.map((categoryGroup) => (
      <div
        key={categoryGroup.category}
        role="group"
        aria-label={categoryGroup.label}
      >
        <div aria-hidden className={menuLabel}>
          {categoryGroup.label}
        </div>
        {categoryGroup.components.map((component) =>
          renderOption(component, results.indexOf(component)),
        )}
      </div>
    ))
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button
          ref={triggerRef}
          variant={ButtonVariant.Outline}
          size={ButtonSize.Small}
          aria-keyshortcuts="Meta+K Control+K /"
          icon={<Search />}
        >
          Search components
          <kbd className="text-muted-foreground ml-3 font-sans text-xs">⌘K</kbd>
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          triggerRef.current?.focus()
        }}
      >
        <DialogTitle>Search components</DialogTitle>

        <DialogBody className="space-y-3 pb-(--dialog-spacing)">
          <Input
            type={InputType.Search}
            role="combobox"
            aria-label="Search components"
            aria-autocomplete="list"
            aria-expanded={results.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={
              results.length > 0 ? optionId(highlightedIndex) : undefined
            }
            placeholder="Name, alias, or category"
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="h-80 overflow-y-auto">
            {results.length > 0 ? (
              <div id={listboxId} role="listbox" aria-label="Components">
                {renderResults()}
              </div>
            ) : (
              <p className="text-muted-foreground px-2 py-6 text-center text-sm">
                No components match “{query}”
              </p>
            )}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
