import { Lock } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/registry/ui/card'
import { IconTooltip } from '@/registry/ui/icon-tooltip'

export function IconTooltipOnACard() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Kyoto
          <IconTooltip
            content="Locked, so the AI won’t change it"
            className="text-muted-foreground focus-visible:ring-offset-card [&>svg]:size-4"
          >
            <Lock aria-hidden />
          </IconTooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Three days, two temples, one very long train ride.
      </CardContent>
    </Card>
  )
}
