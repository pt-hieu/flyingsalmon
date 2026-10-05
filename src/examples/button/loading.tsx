import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'

export function ButtonLoading() {
  const [saving, setSaving] = useState(false)
  const [searching, setSearching] = useState(false)

  async function saveTrip() {
    setSaving(true)
    await waitForServer()
    setSaving(false)
  }

  async function searchFlights() {
    setSearching(true)
    await waitForServer()
    setSearching(false)
  }

  return (
    <>
      <Button loading={saving} onClick={saveTrip}>
        Save trip
      </Button>
      <Button
        variant={ButtonVariant.Outline}
        icon={<Search />}
        loading={searching}
        onClick={searchFlights}
      >
        Search flights
      </Button>
    </>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1600))
}
