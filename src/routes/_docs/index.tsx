import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { ComponentsOverview } from '@/components/components-overview'
import { HomeIntro } from '@/components/home-intro'

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
  const [query, setQuery] = useState(urlQuery)
  const pendingNavigationCount = useRef(0)

  useEffect(() => {
    if (pendingNavigationCount.current === 0) setQuery(urlQuery)
  }, [urlQuery])

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)

    pendingNavigationCount.current += 1
    void navigate({
      search: { q: nextQuery || undefined },
      replace: true,
    }).finally(() => {
      pendingNavigationCount.current -= 1
    })
  }

  return (
    <>
      <HomeIntro />
      <ComponentsOverview query={query} onQueryChange={handleQueryChange} />
    </>
  )
}
