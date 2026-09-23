import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/colors')({
  component: ColorsPage,
})

interface ColorToken {
  name: string
  step: string
  swatchClassName: string
  usage: React.ReactNode
}

const surfaceTokens: ColorToken[] = [
  {
    name: '--background',
    step: 'orange-50',
    swatchClassName: 'bg-background',
    usage: 'The page. Everything else sits on it.',
  },
  {
    name: '--card',
    step: 'white',
    swatchClassName: 'bg-card',
    usage:
      'Cards, alerts, and field boxes: input, textarea, select, combobox, date-picker, number-field.',
  },
  {
    name: '--popover',
    step: 'white',
    swatchClassName: 'bg-popover',
    usage:
      'Floating surfaces: menus, the date-picker popover, dialogs, drawers.',
  },
  {
    name: '--muted',
    step: 'orange-100',
    swatchClassName: 'bg-muted',
    usage:
      'A quiet background step: a read-only field, the number-field spin button, the empty-state icon tile.',
  },
  {
    name: '--secondary',
    step: 'orange-100',
    swatchClassName: 'bg-secondary',
    usage:
      'The secondary button and badge, an unpressed toggle-group chip, the avatar-group overflow count.',
  },
  {
    name: '--accent',
    step: 'orange-200',
    swatchClassName: 'bg-accent',
    usage:
      'Hover and highlight: a hovered ghost button, the highlighted menu row, an idle calendar day under the pointer.',
  },
]

const textTokens: ColorToken[] = [
  {
    name: '--foreground',
    step: 'neutral-950',
    swatchClassName: 'bg-foreground',
    usage: (
      <>
        Body text, headings, values, and the tooltip fill. 17.20:1 on the page,
        18.25:1 on white.
        <code> --card-foreground</code> and <code>--popover-foreground</code>{' '}
        take the same step.
      </>
    ),
  },
  {
    name: '--muted-foreground',
    step: 'neutral-600',
    swatchClassName: 'bg-muted-foreground',
    usage:
      'Descriptions, placeholders, helper text, and field icons. 7.01:1 on the page, 7.44:1 on white, 6.48:1 on --muted, 5.48:1 on --accent.',
  },
  {
    name: '--secondary-foreground',
    step: 'neutral-900',
    swatchClassName: 'bg-secondary-foreground',
    usage: 'Text on --secondary. 14.14:1.',
  },
  {
    name: '--accent-foreground',
    step: 'neutral-900',
    swatchClassName: 'bg-accent-foreground',
    usage: 'Text on --accent. 11.96:1.',
  },
  {
    name: '--primary-text',
    step: 'orange-700',
    swatchClassName: 'bg-primary-text',
    usage:
      'Orange as text: the date-picker focused segment, the notice subject on hover. 4.93:1 on the page, 5.23:1 on white.',
  },
]

const orangeTokens: ColorToken[] = [
  {
    name: '--primary',
    step: 'orange-600',
    swatchClassName: 'bg-primary',
    usage:
      'An orange fill under text: the default button, the default badge, the pressed toggle-group chip.',
  },
  {
    name: '--primary-foreground',
    step: 'white',
    swatchClassName: 'bg-primary-foreground',
    usage: 'Text on --primary. 3.59:1, an accepted case below AA.',
  },
  {
    name: '--indicator',
    step: 'orange-600',
    swatchClassName: 'bg-indicator',
    usage:
      'Every orange mark on a surface: checked fills, active bars, the field and form-control focus rings, the text-link underline, the progress fill. 3.38:1 on the page, 3.59:1 on white.',
  },
  {
    name: '--indicator-foreground',
    step: 'white',
    swatchClassName: 'bg-indicator-foreground',
    usage:
      'A glyph on --indicator: the checkbox tick, the radio dot, the switch thumb, the selected calendar numeral.',
  },
]

const lineTokens: ColorToken[] = [
  {
    name: '--border',
    step: 'orange-200',
    swatchClassName: 'bg-border',
    usage:
      'Every surface border and divider. It separates surfaces that already differ in background, so it carries no contrast floor.',
  },
  {
    name: '--input',
    step: 'orange-200',
    swatchClassName: 'bg-input',
    usage: 'Field box borders at rest. They step to orange-300 on hover.',
  },
  {
    name: '--ring',
    step: 'neutral-950',
    swatchClassName: 'bg-ring',
    usage:
      'The default focus ring, for anything that does not ring in its own hue. 13.46:1 or more against every surface.',
  },
]

const statusTokens: ColorToken[] = [
  {
    name: '--success',
    step: 'green-100 / green-800',
    swatchClassName: 'bg-success',
    usage: 'A success fill with --success-foreground on it. 6.23:1.',
  },
  {
    name: '--warning',
    step: 'amber-400 / amber-900',
    swatchClassName: 'bg-warning',
    usage: 'A solid warning fill with --warning-foreground on it. 5.17:1.',
  },
  {
    name: '--error',
    step: 'red-100 / red-700',
    swatchClassName: 'bg-error',
    usage: 'An error fill with --error-foreground on it. 5.36:1.',
  },
  {
    name: '--destructive',
    step: 'red-600',
    swatchClassName: 'bg-destructive',
    usage:
      'Invalid fields: error text, the required asterisk, borders, focus rings, and a checked invalid checkbox or radio. Also the destructive menu item text and the destructive button ring; the destructive button itself fills --error.',
  },
]

const loadingTokens: ColorToken[] = [
  {
    name: '--skeleton',
    step: 'orange-200',
    swatchClassName: 'bg-skeleton',
    usage: 'Skeleton blocks.',
  },
  {
    name: '--progress-track',
    step: 'orange-200',
    swatchClassName: 'bg-progress-track',
    usage: 'The progress and stepper track.',
  },
  {
    name: '--progress-fill',
    step: 'orange-600',
    swatchClassName: 'bg-progress-fill',
    usage:
      'The progress and stepper fill, an alias of --indicator. 2.65:1 on its track, an accepted case.',
  },
]

interface GroupHue {
  name: string
  solidClassName: string
  softClassName: string
  borderClassName: string
}

const groupHues: GroupHue[] = [
  {
    name: 'sky',
    solidClassName: 'bg-group-sky text-group-sky-foreground',
    softClassName: 'bg-group-sky-soft text-group-sky-soft-foreground',
    borderClassName:
      'border-group-sky-border hover:border-group-sky-border-hover',
  },
  {
    name: 'pink',
    solidClassName: 'bg-group-pink text-group-pink-foreground',
    softClassName: 'bg-group-pink-soft text-group-pink-soft-foreground',
    borderClassName:
      'border-group-pink-border hover:border-group-pink-border-hover',
  },
  {
    name: 'teal',
    solidClassName: 'bg-group-teal text-group-teal-foreground',
    softClassName: 'bg-group-teal-soft text-group-teal-soft-foreground',
    borderClassName:
      'border-group-teal-border hover:border-group-teal-border-hover',
  },
  {
    name: 'fuchsia',
    solidClassName: 'bg-group-fuchsia text-group-fuchsia-foreground',
    softClassName: 'bg-group-fuchsia-soft text-group-fuchsia-soft-foreground',
    borderClassName:
      'border-group-fuchsia-border hover:border-group-fuchsia-border-hover',
  },
  {
    name: 'cyan',
    solidClassName: 'bg-group-cyan text-group-cyan-foreground',
    softClassName: 'bg-group-cyan-soft text-group-cyan-soft-foreground',
    borderClassName:
      'border-group-cyan-border hover:border-group-cyan-border-hover',
  },
  {
    name: 'blue',
    solidClassName: 'bg-group-blue text-group-blue-foreground',
    softClassName: 'bg-group-blue-soft text-group-blue-soft-foreground',
    borderClassName:
      'border-group-blue-border hover:border-group-blue-border-hover',
  },
]

const chartTokens: ColorToken[] = [
  {
    name: '--chart-1',
    step: 'orange-500',
    swatchClassName: 'bg-chart-1',
    usage: 'The first series. The brand leads.',
  },
  {
    name: '--chart-2',
    step: 'sky-300',
    swatchClassName: 'bg-chart-2',
    usage: 'The second series.',
  },
  {
    name: '--chart-3',
    step: 'violet-300',
    swatchClassName: 'bg-chart-3',
    usage: 'The third series.',
  },
  {
    name: '--chart-4',
    step: 'teal-300',
    swatchClassName: 'bg-chart-4',
    usage: 'The fourth series.',
  },
  {
    name: '--chart-5',
    step: 'pink-300',
    swatchClassName: 'bg-chart-5',
    usage: 'The fifth series.',
  },
]

function ColorsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Colors
        </h1>
        <p className="text-muted-foreground text-lg">
          An orange brand over a beige page, with white cards and fields, orange
          borders, and neutral-gray text. Components use the functional tokens
          on this page, never the palette steps behind them.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Two layers</h2>
        <p className="text-muted-foreground">
          The palette layer is Tailwind&rsquo;s OKLCH palette: grays from{' '}
          <code>neutral</code> (chroma 0), the brand from <code>orange</code>,
          destructive and error from <code>red</code>, success from{' '}
          <code>green</code>, warning from <code>amber</code>. The functional
          layer aliases one palette step per token, as{' '}
          <code>--primary: var(--color-orange-600)</code>, never a literal
          value. Each row below names the token, the step it aliases, and where
          it is used.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Every color is a palette step.
          </strong>{' '}
          There is no color alpha anywhere: no <code>/50</code> modifiers, no
          alpha channels, no <code>color-mix</code>. A hover or press shade
          steps the ramp, as orange-200 to orange-300. Element opacity for
          disabled states and motion fades is allowed, because it fades an
          element rather than defining a color. Light mode only.
        </p>
      </section>

      <TokenSection
        title="Surfaces"
        description="Surfaces separate by background steps and solid borders, never shadows (ADR 0003)."
        tokens={surfaceTokens}
      />

      <TokenSection
        title="Text"
        description="Text is neutral gray on every surface. Every pair here clears WCAG AA."
        tokens={textTokens}
      />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Orange has three jobs
        </h2>
        <p className="text-muted-foreground">
          <code>--primary</code> is an orange fill under text.{' '}
          <code>--indicator</code> is an orange mark on a surface: a fill, a
          bar, a ring, or an underline. <code>--primary-text</code> is orange as
          text. The first two share orange-600 but name different jobs, so a
          mark and a fill can move apart without touching each other&rsquo;s
          consumers.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            Every orange fill carries white.
          </strong>{' '}
          White on orange-600 measures 3.59:1, under AA for body text. Brian
          accepted that because neutral-950 on an orange fill reads muddy: APCA
          puts it at Lc 49 against white&rsquo;s Lc 68. Hover on an orange fill
          steps to orange-700, where white holds 5.23:1.
        </p>
        <TokenList tokens={orangeTokens} />
      </section>

      <TokenSection
        title="Borders and rings"
        description="Borders are decorative and carry no floor. Rings are how focus shows, so they clear 3:1 against the page unless a case is recorded in ADR 0004."
        tokens={lineTokens}
      >
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A component may ring in its own hue.
          </strong>{' '}
          The field family, checkbox, radio-group, switch, the default button,
          and a pressed toggle-group chip ring in <code>--indicator</code>. The
          outline, secondary, and ghost buttons and an unpressed toggle-group
          chip ring in <code>--accent</code>, the color their hover washes to;
          that ring is 1.28:1 on the page, an accepted case. An invalid field
          rings in <code>--destructive</code>.
        </p>
      </TokenSection>

      <TokenSection
        title="Status"
        description="Status colors ship as a fill and a text color that clears AA on it. Error does not reuse --destructive: a tint cannot come from a solid without alpha."
        tokens={statusTokens}
      />

      <TokenSection
        title="Loading"
        description="Loading placeholders and tracks sit one step above the page on the orange ramp."
        tokens={loadingTokens}
      />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Group colors</h2>
        <p className="text-muted-foreground">
          Six hues tell items in a set apart: a trip&rsquo;s stays, avatar
          fallbacks, labels. Each hue has six aliases:{' '}
          <code>--group-&lt;hue&gt;</code> is the solid fill with{' '}
          <code>-foreground</code> text, <code>-soft</code> is a tint with{' '}
          <code>-soft-foreground</code> text, and <code>-border</code> steps to{' '}
          <code>-border-hover</code>. Text clears AA on every fill.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A group color never works alone.
          </strong>{' '}
          The set leaves out every hue near the brand or a status, so a group
          never reads as an action or a result. Cyan sits close to sky and
          fuchsia close to pink, so assign by index in this order, which keeps
          each lookalike pair three apart, and always pair the color with a text
          label.
        </p>
        <div className="border-border bg-card grid gap-3 rounded-lg border p-6 sm:grid-cols-2">
          {groupHues.map((groupHue) => (
            <div key={groupHue.name} className="flex items-center gap-2">
              <span
                className={`${groupHue.solidClassName} rounded-md px-2.5 py-1 text-sm font-medium`}
              >
                {groupHue.name}
              </span>
              <span
                className={`${groupHue.softClassName} rounded-md px-2.5 py-1 text-sm font-medium`}
              >
                soft
              </span>
              <span
                className={`${groupHue.borderClassName} rounded-md border-2 px-2.5 py-1 text-sm font-medium transition-colors duration-(--motion-fast)`}
              >
                border
              </span>
            </div>
          ))}
        </div>
      </section>

      <TokenSection
        title="Charts"
        description="The brand leads, then four pale hues. Against a white card slots 2–5 sit under the 3:1 non-text floor, an accepted case, so a series is told apart by its label and position. A chart that needs a status color takes --success directly."
        tokens={chartTokens}
      />
    </article>
  )
}

function TokenSection({
  title,
  description,
  tokens,
  children,
}: {
  title: string
  description: string
  tokens: ColorToken[]
  children?: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      {children}
      <TokenList tokens={tokens} />
    </section>
  )
}

function TokenList({ tokens }: { tokens: ColorToken[] }) {
  return (
    <ul className="border-border bg-card divide-border divide-y rounded-lg border">
      {tokens.map((token) => (
        <li key={token.name} className="flex items-start gap-4 p-4">
          <span
            className={`${token.swatchClassName} border-border size-10 shrink-0 rounded-md border`}
          />
          <div className="min-w-0 space-y-1">
            <p className="text-sm">
              <code className="font-medium">{token.name}</code>
              <span className="text-muted-foreground"> · {token.step}</span>
            </p>
            <p className="text-muted-foreground text-sm">{token.usage}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
