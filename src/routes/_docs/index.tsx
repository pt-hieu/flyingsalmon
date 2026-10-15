import { createFileRoute } from '@tanstack/react-router'

import { ComponentsOverview } from '@/components/components-overview'
import { HomeIntro } from '@/components/home-intro'
import { useSearchParamDraft } from '@/components/use-search-param-draft'

interface OverviewSearch {
  q?: string
}

export const Route = createFileRoute('/_docs/')({
  validateSearch: (search: Record<string, unknown>): OverviewSearch => ({
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
  }),
  component: OverviewPage,
})

function OverviewPage() {
  const { q: urlQuery = '' } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [query, setQuery] = useSearchParamDraft(urlQuery, (nextQuery) =>
    navigate({ search: { q: nextQuery || undefined }, replace: true }),
  )

  return (
    <>
      <HomeIntro />
      <ComponentsOverview query={query} onQueryChange={setQuery} />
    </>
  )
}
