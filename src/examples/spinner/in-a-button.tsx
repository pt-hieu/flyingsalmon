import { useState } from 'react'

import { Button } from '@/registry/ui/button'

export function SpinnerInAButton() {
  const [loading, setLoading] = useState(false)

  async function saveTrip() {
    setLoading(true)
    await waitForServer()
    setLoading(false)
  }

  return (
    <Button loading={loading} onClick={saveTrip}>
      Save trip
    </Button>
  )
}

function waitForServer(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1500))
}
