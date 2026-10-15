import { useEffect, useRef, useState } from 'react'

import {
  Combobox,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxMode,
} from '@/registry/ui/combobox'

interface Place {
  id: string
  name: string
  country: string
}

export function ComboboxRemoteResults() {
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)
  const debounceTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const latestQuery = useRef('')

  useEffect(() => () => clearTimeout(debounceTimeout.current), [])

  function searchPlaces(nextQuery: string) {
    setQuery(nextQuery)
    latestQuery.current = nextQuery
    clearTimeout(debounceTimeout.current)

    if (nextQuery.trim().length === 0) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    debounceTimeout.current = setTimeout(async () => {
      try {
        const places = await fetchPlaces(nextQuery)

        if (latestQuery.current === nextQuery) setResults(places)
      } finally {
        if (latestQuery.current === nextQuery) setLoading(false)
      }
    }, 300)
  }

  const searchedWithNoResults =
    !loading && query.trim().length > 0 && results.length === 0

  return (
    <div className="flex w-72 flex-col gap-1">
      <Combobox
        mode={ComboboxMode.Single}
        label="Where are you going?"
        placeholder="Search a place"
        value={placeId}
        onValueChange={setPlaceId}
        inputValue={query}
        onInputValueChange={searchPlaces}
        loading={loading}
      >
        {results.map((place) => (
          <ComboboxItem
            key={place.id}
            value={place.id}
            description={place.country}
          >
            {place.name}
          </ComboboxItem>
        ))}

        {searchedWithNoResults ? (
          <ComboboxEmpty>No place matches that</ComboboxEmpty>
        ) : null}
      </Combobox>
    </div>
  )
}

const knownPlaces: Place[] = [
  { id: 'place-reykjavik', name: 'Reykjavík', country: 'Iceland' },
  { id: 'place-reims', name: 'Reims', country: 'France' },
  { id: 'place-rennes', name: 'Rennes', country: 'France' },
  { id: 'place-hanoi', name: 'Hanoi', country: 'Vietnam' },
  { id: 'place-hakone', name: 'Hakone', country: 'Japan' },
  { id: 'place-halifax', name: 'Halifax', country: 'Canada' },
]

function fetchPlaces(query: string): Promise<Place[]> {
  const normalisedQuery = query.trim().toLowerCase()

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          knownPlaces.filter((place) =>
            place.name.toLowerCase().startsWith(normalisedQuery),
          ),
        ),
      500,
    ),
  )
}
