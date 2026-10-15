import {
  docPageClassName,
  docPageHeaderClassName,
  docPageLeadClassName,
  docPageTitleClassName,
  docSectionBodyClassName,
} from './classnames'
import { DocSection } from './doc-section'
import { FoundationTable } from './foundation-table'
import { GuidelineRuleList } from './guideline-rule-list'
import { Notes } from './notes'
import { Related } from './related'
import type {
  FoundationSection,
  FoundationTableSection,
  GuidelineRule,
  RelatedPage,
} from './types'

export interface FoundationPageProps {
  title: string
  principle: string
  introduction?: React.ReactNode
  tablesTitle?: string
  tables: FoundationTableSection[]
  sections?: FoundationSection[]
  rules?: GuidelineRule[]
  notes?: React.ReactNode
  related: RelatedPage[]
}

export function FoundationPage({
  title,
  principle,
  introduction,
  tablesTitle = 'Tokens',
  tables,
  sections = [],
  rules,
  notes,
  related,
}: FoundationPageProps) {
  return (
    <article className={docPageClassName}>
      <header className={docPageHeaderClassName}>
        <h1 className={docPageTitleClassName}>{title}</h1>
        <p className={docPageLeadClassName}>{principle}</p>
      </header>

      {introduction ? (
        <div className={docSectionBodyClassName}>{introduction}</div>
      ) : null}

      {tables.length > 0 ? (
        <DocSection title={tablesTitle}>
          {tables.map((table) => (
            <FoundationTable key={table.title} {...table} />
          ))}
        </DocSection>
      ) : null}

      {sections.map((section) => (
        <DocSection key={section.title} title={section.title}>
          {section.content}
        </DocSection>
      ))}

      {rules ? (
        <DocSection title="Usage rules">
          <GuidelineRuleList rules={rules} />
        </DocSection>
      ) : null}

      {notes ? <Notes>{notes}</Notes> : null}

      <DocSection title="Related">
        <Related pages={related} />
      </DocSection>
    </article>
  )
}
