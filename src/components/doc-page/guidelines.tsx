import {
  guidelinesClassName,
  guidelinesGroupClassName,
  guidelinesHeadingClassName,
  guidelinesListClassName,
} from './classnames'
import { DocTextLink } from './doc-text-link'
import { GuidelineRuleList } from './guideline-rule-list'
import type { GuidelinesContent } from './types'

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
              <DocTextLink to={alternative.to}>{alternative.label}</DocTextLink>{' '}
              {situation}
            </li>
          ))}
        </ul>
      </div>

      <div className={guidelinesGroupClassName}>
        <h3 className={guidelinesHeadingClassName}>Do and don&rsquo;t</h3>
        <GuidelineRuleList rules={rules} />
      </div>
    </div>
  )
}
