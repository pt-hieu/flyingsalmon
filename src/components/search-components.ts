import type {
  CatalogComponent,
  ComponentCategory,
} from '@/components/component-catalog'
import {
  componentCategoryLabels,
  componentCategoryOrder,
} from '@/components/component-catalog'

enum MatchRank {
  NameOrAlias = 0,
  CategoryOrDescription = 1,
}

export interface ComponentCategoryGroup {
  category: ComponentCategory
  label: string
  components: CatalogComponent[]
}

function queryWords(query: string) {
  return query.toLowerCase().split(/\s+/).filter(Boolean)
}

function rankWordMatch(component: CatalogComponent, word: string) {
  const namesAndAliases = [component.label, ...component.aliases]
  if (namesAndAliases.some((name) => name.toLowerCase().includes(word))) {
    return MatchRank.NameOrAlias
  }

  const otherFields = [
    componentCategoryLabels[component.category],
    component.description,
  ]
  if (otherFields.some((field) => field.toLowerCase().includes(word))) {
    return MatchRank.CategoryOrDescription
  }

  return undefined
}

function rankComponentMatch(component: CatalogComponent, words: string[]) {
  let componentRank = MatchRank.NameOrAlias
  for (const word of words) {
    const wordRank = rankWordMatch(component, word)
    if (wordRank === undefined) return undefined
    componentRank = Math.max(componentRank, wordRank)
  }
  return componentRank
}

export function searchComponents(
  components: CatalogComponent[],
  query: string,
) {
  const words = queryWords(query)

  return components
    .flatMap((component) => {
      const rank = rankComponentMatch(component, words)
      return rank === undefined ? [] : [{ component, rank }]
    })
    .toSorted(
      (firstComponent, secondComponent) =>
        firstComponent.rank - secondComponent.rank,
    )
    .map((rankedComponent) => rankedComponent.component)
}

export function groupComponentsByCategory(
  components: CatalogComponent[],
): ComponentCategoryGroup[] {
  return componentCategoryOrder
    .map((category) => ({
      category,
      label: componentCategoryLabels[category],
      components: components
        .filter((component) => component.category === category)
        .toSorted((firstComponent, secondComponent) =>
          firstComponent.label.localeCompare(secondComponent.label),
        ),
    }))
    .filter((group) => group.components.length > 0)
}
