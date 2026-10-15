import {
  guidelinesClassName,
  guidelinesGroupClassName,
  guidelinesListClassName,
} from './classnames'
import { DocSubheading } from './doc-subheading'
import { DocTextLink } from './doc-text-link'
import { GuidelineRuleList } from './guideline-rule-list'
import type { GuidelinesContent } from './types'
import { toTextContent } from './utils'

export interface GuidelinesProps extends GuidelinesContent {}

export function Guidelines({
  whenToUse,
  whenNotToUse,
  rules,
}: GuidelinesProps) {
  return (
    <div className={guidelinesClassName}>
      <div className={guidelinesGroupClassName}>
        <DocSubheading>When to use</DocSubheading>
        <ul className={guidelinesListClassName}>
          {whenToUse.map((situation) => (
            <li key={toTextContent(situation)}>{situation}</li>
          ))}
        </ul>
      </div>

      <div className={guidelinesGroupClassName}>
        <DocSubheading>When not to use</DocSubheading>
        <ul className={guidelinesListClassName}>
          {whenNotToUse.map(({ situation, alternative }) => (
            <li key={alternative.label}>
              Use{' '}
              <DocTextLink to={alternative.to}>{alternative.label}</DocTextLink>{' '}
              {situation}
            </li>
          ))}
        </ul>
      </div>

      <div className={guidelinesGroupClassName}>
        <DocSubheading>Do and don&rsquo;t</DocSubheading>
        <GuidelineRuleList rules={rules} />
      </div>
    </div>
  )
}
