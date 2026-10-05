import { useState } from 'react'

import { Switch } from '@/registry/ui/switch'

export function SwitchUsage() {
  const [offlineMaps, setOfflineMaps] = useState(false)

  return (
    <Switch
      label="Offline maps"
      checked={offlineMaps}
      onCheckedChange={setOfflineMaps}
    />
  )
}
