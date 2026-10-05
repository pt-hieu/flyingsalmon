import { Link } from '@tanstack/react-router'

import { CodeBlock, CodeLanguage, InstallCommand } from '@/components/doc-page'
import {
  docPageClassName,
  docSectionHeadingClassName,
  relatedCardClassName,
  relatedListClassName,
} from '@/components/doc-page/classnames'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

const registryConfiguration = `{
  "registries": {
    "@flyingsalmon": "https://flyingsalmon.superbrian.dev/r/{name}.json"
  }
}`

const foundationLinks = [
  {
    to: '/principles',
    label: 'Principles',
    description: 'Bold, warm, flat, and where a result belongs.',
  },
  {
    to: '/colors',
    label: 'Colours',
    description: 'An orange brand over a beige page, palette steps only.',
  },
  {
    to: '/typography',
    label: 'Typography',
    description: 'Bricolage Grotesque announces; Onest does the work.',
  },
  {
    to: '/spacing',
    label: 'Spacing',
    description: 'Tailwind’s 4px scale, one step for one job.',
  },
  {
    to: '/radius',
    label: 'Radius',
    description: 'One 12px base and the corner scale derived from it.',
  },
  {
    to: '/motion',
    label: 'Motion',
    description: 'Small, springy, and under 200ms.',
  },
  {
    to: '/accessibility',
    label: 'Accessibility',
    description: 'Visible focus, full keyboard paths, measured contrast.',
  },
  {
    to: '/fields',
    label: 'Fields',
    description: 'What every field shares: description, error, loading.',
  },
] as const

export function HomeIntro() {
  return (
    <div className={`${docPageClassName} max-w-none pb-0`}>
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

      <section
        aria-labelledby="getting-started"
        className="flex flex-col gap-6"
      >
        <h2 id="getting-started" className={docSectionHeadingClassName}>
          Getting started
        </h2>
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
      </section>

      <section aria-labelledby="foundations" className="flex flex-col gap-6">
        <h2 id="foundations" className={docSectionHeadingClassName}>
          Foundations
        </h2>
        <ul className={relatedListClassName}>
          {foundationLinks.map((foundationLink) => (
            <li key={foundationLink.to}>
              <Card interactive className={relatedCardClassName}>
                <CardHeader>
                  <CardTitle>
                    <Link to={foundationLink.to}>{foundationLink.label}</Link>
                  </CardTitle>
                  <CardDescription>
                    {foundationLink.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
