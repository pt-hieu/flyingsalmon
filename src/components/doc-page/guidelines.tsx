import { Link } from '@tanstack/react-router'

import { Badge } from '@/registry/ui/badge'
import { TextLink } from '@/registry/ui/text-link'

import {
  guidelineRuleClassName,
  guidelineRuleListClassName,
  guidelineRuleStatementClassName,
  guidelineRuleTextClassName,
  guidelinesClassName,
  guidelinesGroupClassName,
  guidelinesHeadingClassName,
  guidelinesListClassName,
  guidelineVerdictBadgeClassName,
} from './classnames'
import type { GuidelinesContent } from './types'
import { verdictBadgeByVerdict } from './verdict-badge-by-verdict'

export interface GuidelinesProps extends GuidelinesContent {}

export function Guidelines({
  whenToUse,
  whenNotToUse,
  rules,
}: GuidelinesProps) {
  return (
    <div className={guidelinesClassName}>
      <div className={guidelinesGroupClassName}>
        <h3 className={guidelinesHeadingClassName}>When to use</h3>
        <ul className={guidelinesListClassName}>
          {whenToUse.map((situation, index) => (
            <li key={index}>{situation}</li>
          ))}
        </ul>
      </div>

      <div className={guidelinesGroupClassName}>
        <h3 className={guidelinesHeadingClassName}>When not to use</h3>
        <ul className={guidelinesListClassName}>
          {whenNotToUse.map(({ situation, alternative }) => (
            <li key={alternative.label}>
              Use{' '}
              <TextLink asChild>
                <Link to={alternative.to}>{alternative.label}</Link>
              </TextLink>{' '}
              {situation}
            </li>
          ))}
        </ul>
      </div>

      <div className={guidelinesGroupClassName}>
        <h3 className={guidelinesHeadingClassName}>Do and don&rsquo;t</h3>
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
                  <span className={guidelineRuleStatementClassName}>
                    {rule}
                  </span>
                  <span>{reason}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
