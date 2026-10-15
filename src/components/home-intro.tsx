import {
  CodeBlock,
  CodeLanguage,
  DocSection,
  InstallCommand,
  Related,
  docPageClassName,
} from '@/components/doc-page'
import { foundationPages } from '@/components/foundation-pages'
import { cn } from '@/lib/utils'

const registryConfiguration = `{
  "registries": {
    "@flyingsalmon": "https://flyingsalmon.superbrian.dev/r/{name}.json"
  }
}`

export function HomeIntro() {
  return (
    <div className={cn(docPageClassName, 'max-w-none pb-0')}>
      <header className="flex flex-col gap-4">
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-balance">
          flyingsalmon
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          An opinionated design system: bold, warm, and social, with flat
          surfaces, light only, orange throughout, and springy motion that stays
          out of the way. Every component installs into your own project with
          the shadcn CLI, so you own the code.
        </p>
      </header>

      <DocSection title="Getting started">
        <ol className="flex max-w-2xl flex-col gap-8">
          <li className="flex flex-col gap-3">
            <p className="text-muted-foreground">
              <strong className="text-foreground">
                1. Register the namespace.
              </strong>{' '}
              In a project with Tailwind CSS v4 and <code>shadcn init</code>{' '}
              already run, add the registry to <code>components.json</code>.
            </p>
            <CodeBlock
              code={registryConfiguration}
              language={CodeLanguage.Tsx}
              label="components.json registry entry"
            />
          </li>
          <li className="flex flex-col gap-3">
            <p className="text-muted-foreground">
              <strong className="text-foreground">
                2. Install the theme first.
              </strong>{' '}
              Every component reads its colour, radius, and motion tokens from
              it.
            </p>
            <InstallCommand name="theme" />
          </li>
          <li className="flex flex-col gap-3">
            <p className="text-muted-foreground">
              <strong className="text-foreground">
                3. Add components by name.
              </strong>{' '}
              Each component page shows its own command.
            </p>
            <CodeBlock
              code="npx shadcn@latest add @flyingsalmon/button @flyingsalmon/card"
              language={CodeLanguage.Bash}
              label="Add components command"
            />
          </li>
        </ol>
      </DocSection>

      <DocSection title="Foundations">
        <Related pages={foundationPages} />
      </DocSection>
    </div>
  )
}
