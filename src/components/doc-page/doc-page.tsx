import {
  docPageClassName,
  docPageHeaderClassName,
  docPageLeadClassName,
  docPageTitleClassName,
  exampleListClassName,
} from './classnames'
import { CodeBlock } from './code-block'
import { DocSection } from './doc-section'
import { ExampleFrame } from './example-frame'
import { Guidelines } from './guidelines'
import { InstallCommand } from './install-command'
import { Notes } from './notes'
import { parseGuidelines } from './parse-guidelines'
import { Related } from './related'
import type { ExampleSource, RelatedPage } from './types'
import { toConsumerSource } from './utils'

export interface DocPageProps {
  title: string
  lead: React.ReactNode
  preview?: ExampleSource
  installation?: string
  usage?: string
  examples?: React.ReactNode
  guidelines?: string
  accessibility?: React.ReactNode
  api?: React.ReactNode
  notes?: React.ReactNode
  related?: RelatedPage[]
}

export function DocPage({
  title,
  lead,
  preview,
  installation,
  usage,
  examples,
  guidelines,
  accessibility,
  api,
  notes,
  related,
}: DocPageProps) {
  const guidelinesContent = guidelines
    ? parseGuidelines(guidelines, title)
    : undefined

  return (
    <article className={docPageClassName}>
      <header className={docPageHeaderClassName}>
        <h1 className={docPageTitleClassName}>{title}</h1>
        <p className={docPageLeadClassName}>{lead}</p>
      </header>

      {preview ? (
        <section aria-label="Preview">
          <ExampleFrame
            source={preview.source}
            demo={preview.demo}
            label={`${title} preview`}
          />
        </section>
      ) : null}

      {installation ? (
        <DocSection title="Installation">
          <InstallCommand name={installation} />
        </DocSection>
      ) : null}

      {usage ? (
        <DocSection title="Usage">
          <CodeBlock code={toConsumerSource(usage)} label="Usage code" />
        </DocSection>
      ) : null}

      {examples ? (
        <DocSection title="Examples">
          <div className={exampleListClassName}>{examples}</div>
        </DocSection>
      ) : null}

      {guidelinesContent ? (
        <DocSection title="Guidelines">
          <Guidelines {...guidelinesContent} />
        </DocSection>
      ) : null}

      {accessibility ? (
        <DocSection title="Accessibility">{accessibility}</DocSection>
      ) : null}

      {api ? <DocSection title="API">{api}</DocSection> : null}

      {notes ? <Notes>{notes}</Notes> : null}

      {related ? (
        <DocSection title="Related">
          <Related pages={related} />
        </DocSection>
      ) : null}
    </article>
  )
}
