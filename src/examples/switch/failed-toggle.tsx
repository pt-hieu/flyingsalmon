import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Switch } from '@/registry/ui/switch'

export function SwitchFailedToggle() {
  const [sharing, setSharing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [failed, setFailed] = useState(false)

  async function saveSharing(nextSharing: boolean) {
    setSaving(true)
    setFailed(false)

    const saved = await waitForServer()

    if (saved) setSharing(nextSharing)
    else setFailed(true)

    setSaving(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Switch
        label="Share the trip link"
        checked={sharing}
        loading={saving}
        onCheckedChange={saveSharing}
      />
      {failed ? (
        <div className="flex items-center gap-2">
          <p className="text-destructive text-sm">
            Could not turn sharing on. The switch is still off.
          </p>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Small}
            onClick={() => saveSharing(true)}
          >
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function waitForServer() {
  return new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(false), 1200),
  )
}
