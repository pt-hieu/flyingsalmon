import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'

import { AlertVariant } from './types'

export const alertStatusByVariant = {
  [AlertVariant.Info]: { role: 'status', StatusIcon: Info },
  [AlertVariant.Success]: { role: 'status', StatusIcon: CircleCheck },
  [AlertVariant.Warning]: { role: 'status', StatusIcon: TriangleAlert },
  [AlertVariant.Error]: { role: 'alert', StatusIcon: CircleAlert },
} as const satisfies Record<
  AlertVariant,
  { role: string; StatusIcon: React.ElementType }
>
