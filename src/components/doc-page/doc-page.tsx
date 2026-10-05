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
import { Related } from './related'
import type { ExampleSource, GuidelinesContent, RelatedPage } from './types'
import { toConsumerSource } from './utils'

export interface DocPageProps {
  title: string
  lead: React.ReactNode
  preview?: ExampleSource
  installation?: string
  usage?: string
  examples?: React.ReactNode
  guidelines?: GuidelinesContent
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

      {guidelines ? (
        <DocSection title="Guidelines">
          <Guidelines {...guidelines} />
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
