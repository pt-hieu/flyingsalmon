import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import type { CatalogComponent } from '@/components/component-catalog'
import {
  componentCatalog,
  componentCategoryLabels,
} from '@/components/component-catalog'
import {
  groupComponentsByCategory,
  searchComponents,
} from '@/components/search-components'
import {
  isSearchShortcut,
  searchShortcutHint,
  useApplePlatform,
} from '@/components/search-shortcut'
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

function toOptionId(listboxId: string, index: number) {
  return `${listboxId}-option-${index}`
}

export function ComponentSearch() {
  const navigate = useNavigate()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const applePlatform = useApplePlatform()

  const grouped = query.trim() === ''
  const resultGroups = grouped
    ? groupComponentsByCategory(componentCatalog)
    : []
  const results = grouped
    ? resultGroups.flatMap((categoryGroup) => categoryGroup.components)
    : searchComponents(componentCatalog, query)
  const indexedResults = results.map((component, index) => ({
    component,
    index,
  }))

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
    function handleShortcut(event: KeyboardEvent) {
      if (!isSearchShortcut(event, applePlatform)) return

      event.preventDefault()
      setOpen(true)
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [applePlatform])

  useEffect(() => {
    if (!open) return

    document
      .getElementById(toOptionId(listboxId, highlightedIndex))
      ?.scrollIntoView({ block: 'nearest' })
  }, [open, highlightedIndex, listboxId])

  function renderOption(component: CatalogComponent, index: number) {
    const highlighted = index === highlightedIndex

    return (
      <div
        key={component.to}
        id={toOptionId(listboxId, index)}
        role="option"
        aria-selected={highlighted}
        data-highlighted={highlighted || undefined}
        onPointerMove={() => setHighlightedIndex(index)}
        onClick={() => selectComponent(component)}
        className={cn(menuItem, menuItemHighlighted, 'justify-between')}
      >
        <span>{component.label}</span>
        {grouped ? null : (
          <span className="text-muted-foreground text-xs">
            {componentCategoryLabels[component.category]}
          </span>
        )}
      </div>
    )
  }

  function renderResults() {
    if (!grouped) return results.map(renderOption)

    return resultGroups.map((categoryGroup) => (
      <div
        key={categoryGroup.category}
        role="group"
        aria-label={categoryGroup.label}
      >
        <div aria-hidden className={menuLabel}>
          {categoryGroup.label}
        </div>
        {indexedResults
          .filter(
            ({ component }) => component.category === categoryGroup.category,
          )
          .map(({ component, index }) => renderOption(component, index))}
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
          <kbd className="text-muted-foreground ml-3 font-sans text-xs">
            {searchShortcutHint(applePlatform)}
          </kbd>
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
              results.length > 0
                ? toOptionId(listboxId, highlightedIndex)
                : undefined
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
