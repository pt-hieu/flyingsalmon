import { BadgeVariant } from '@/registry/ui/badge'

import { GuidelineVerdict } from './types'

export const verdictBadgeByVerdict = {
  [GuidelineVerdict.Do]: { label: 'Do', variant: BadgeVariant.Success },
  [GuidelineVerdict.Dont]: { label: 'Don’t', variant: BadgeVariant.Error },
}
