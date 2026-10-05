import {
  docPageClassName,
  docPageHeaderClassName,
  docPageLeadClassName,
  docPageTitleClassName,
  tableCodeCellClassName,
  tableGroupClassName,
  tableTextCellClassName,
  tableTitleClassName,
} from '@/components/doc-page/classnames'
import { DocSection } from '@/components/doc-page/doc-section'
import { GuidelineRuleList } from '@/components/doc-page/guideline-rule-list'
import { Notes } from '@/components/doc-page/notes'
import { Related } from '@/components/doc-page/related'
import type { GuidelineRule, RelatedPage } from '@/components/doc-page/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export interface TokenRow {
  sample: React.ReactNode
  token: string
  value: string
  job: React.ReactNode
}

export interface TokenGroup {
  title: string
  description?: React.ReactNode
  headings?: [string, string, string, string]
  rows: TokenRow[]
}

export interface FoundationPageProps {
  title: string
  principle: React.ReactNode
  introduction?: React.ReactNode
  tokensTitle?: string
  tokenSections: TokenGroup[]
  sections?: { title: string; content: React.ReactNode }[]
  rules?: GuidelineRule[]
  notes?: React.ReactNode
  related: RelatedPage[]
}

export function FoundationPage({
  title,
  principle,
  introduction,
  tokensTitle = 'Tokens',
  tokenSections,
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
        <div className="text-muted-foreground [&_strong]:text-foreground flex flex-col gap-4 [&_strong]:font-semibold">
          {introduction}
        </div>
      ) : null}

      {tokenSections.length > 0 ? (
        <DocSection title={tokensTitle}>
          {tokenSections.map((tokenSection) => (
            <TokenTable key={tokenSection.title} {...tokenSection} />
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

function TokenTable({
  title,
  description,
  headings = ['Sample', 'Token', 'Value', 'Job'],
  rows,
}: TokenGroup) {
  return (
    <div className={tableGroupClassName}>
      <h3 className={tableTitleClassName}>{title}</h3>

      {description ? <p>{description}</p> : null}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>{headings[0]}</TableHeadCell>
            <TableHeadCell>{headings[1]}</TableHeadCell>
            <TableHeadCell>{headings[2]}</TableHeadCell>
            <TableHeadCell>{headings[3]}</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.token}>
              <TableCell>{row.sample}</TableCell>
              <TableCell className={tableCodeCellClassName}>
                {row.token}
              </TableCell>
              <TableCell className={tableCodeCellClassName}>
                {row.value}
              </TableCell>
              <TableCell className={tableTextCellClassName}>
                {row.job}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function Swatch({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`${className} border-border block size-8 rounded-md border`}
    />
  )
}
