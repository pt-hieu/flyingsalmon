import { useState } from 'react'

import { Switch } from '@/registry/ui/switch'

export function SwitchConfirmFirst() {
  const [offlineMaps, setOfflineMaps] = useState(false)
  const [saving, setSaving] = useState(false)

  async function saveOfflineMaps(nextOfflineMaps: boolean) {
    setSaving(true)

    try {
      await waitForServer()
      setOfflineMaps(nextOfflineMaps)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Switch
      label="Offline maps for Lisbon"
      checked={offlineMaps}
      loading={saving}
      onCheckedChange={saveOfflineMaps}
    />
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1200))
}
