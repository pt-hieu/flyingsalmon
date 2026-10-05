import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Progress } from '@/registry/ui/progress'

export function ProgressDeterminate() {
  const [value, setValue] = useState(20)

  return (
    <div className="w-full max-w-xs space-y-3">
      <Progress value={value} label="Building your trip" />
      <div className="flex items-center gap-2">
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Secondary}
          onClick={() => setValue((current) => Math.min(current + 20, 100))}
        >
          Advance
        </Button>
        <Button
          size={ButtonSize.Small}
          variant={ButtonVariant.Ghost}
          onClick={() => setValue(0)}
        >
          Reset
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          {value}%
        </span>
      </div>
    </div>
  )
}
