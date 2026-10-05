import { Badge } from '@/registry/ui/badge'

import {
  guidelineRuleClassName,
  guidelineRuleListClassName,
  guidelineRuleStatementClassName,
  guidelineRuleTextClassName,
  guidelineVerdictBadgeClassName,
} from './classnames'
import type { GuidelineRule } from './types'
import { verdictBadgeByVerdict } from './verdict-badge-by-verdict'

export interface GuidelineRuleListProps {
  rules: GuidelineRule[]
}

export function GuidelineRuleList({ rules }: GuidelineRuleListProps) {
  return (
    <ul className={guidelineRuleListClassName}>
      {rules.map(({ verdict, rule, reason }, index) => {
        const verdictBadge = verdictBadgeByVerdict[verdict]

        return (
          <li key={index} className={guidelineRuleClassName}>
            <Badge
              variant={verdictBadge.variant}
              className={guidelineVerdictBadgeClassName}
            >
              {verdictBadge.label}
            </Badge>
            <div className={guidelineRuleTextClassName}>
              <span className={guidelineRuleStatementClassName}>{rule}</span>
              <span>{reason}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
