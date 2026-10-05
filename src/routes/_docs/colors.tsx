import { Link, createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict } from '@/components/doc-page'
import { FoundationPage, Swatch } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/colors')({
  component: ColorsPage,
})

const surfaceRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-background" />,
    token: '--background',
    value: 'orange-50',
    job: 'The page. Everything else sits on it.',
  },
  {
    sample: <Swatch className="bg-card" />,
    token: '--card',
    value: 'white',
    job: 'Cards, alerts, and field boxes: input, textarea, select, combobox, date picker, number field.',
  },
  {
    sample: <Swatch className="bg-popover" />,
    token: '--popover',
    value: 'white',
    job: 'Floating surfaces: menus, the date picker popover, dialogs, drawers.',
  },
  {
    sample: <Swatch className="bg-muted" />,
    token: '--muted',
    value: 'orange-100',
    job: 'A quiet background step: a read-only field, the number field spin button, the empty state icon tile.',
  },
  {
    sample: <Swatch className="bg-secondary" />,
    token: '--secondary',
    value: 'orange-100',
    job: 'The secondary button and badge, an unpressed toggle group chip, the avatar group overflow count.',
  },
  {
    sample: <Swatch className="bg-accent" />,
    token: '--accent',
    value: 'orange-200',
    job: 'Hover and highlight: a hovered ghost button, the highlighted menu row, a calendar day under the pointer.',
  },
]

const textRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-foreground" />,
    token: '--foreground',
    value: 'neutral-950',
    job: (
      <>
        Body text, headings, values, and the tooltip fill.{' '}
        <code>--card-foreground</code> and <code>--popover-foreground</code>{' '}
        take the same step.
      </>
    ),
  },
  {
    sample: <Swatch className="bg-muted-foreground" />,
    token: '--muted-foreground',
    value: 'neutral-600',
    job: 'Descriptions, placeholders, helper text, and field icons.',
  },
  {
    sample: <Swatch className="bg-secondary-foreground" />,
    token: '--secondary-foreground',
    value: 'neutral-900',
    job: 'Text on --secondary.',
  },
  {
    sample: <Swatch className="bg-accent-foreground" />,
    token: '--accent-foreground',
    value: 'neutral-900',
    job: 'Text on --accent.',
  },
  {
    sample: <Swatch className="bg-primary-text" />,
    token: '--primary-text',
    value: 'orange-700',
    job: 'Orange as text: the date picker focused segment, the notice subject on hover.',
  },
]

const orangeRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-primary" />,
    token: '--primary',
    value: 'orange-600',
    job: 'An orange fill under text: the default button, the default badge, the pressed toggle group chip.',
  },
  {
    sample: <Swatch className="bg-primary-foreground" />,
    token: '--primary-foreground',
    value: 'white',
    job: 'Text on --primary.',
  },
  {
    sample: <Swatch className="bg-indicator" />,
    token: '--indicator',
    value: 'orange-600',
    job: 'Every orange mark on a surface: checked fills, active bars, field focus rings, the text link underline, the progress fill.',
  },
  {
    sample: <Swatch className="bg-indicator-foreground" />,
    token: '--indicator-foreground',
    value: 'white',
    job: 'A glyph on --indicator: the checkbox tick, the radio dot, the switch thumb, the selected calendar numeral.',
  },
]

const lineRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-border" />,
    token: '--border',
    value: 'orange-200',
    job: 'Every surface border and divider.',
  },
  {
    sample: <Swatch className="bg-input" />,
    token: '--input',
    value: 'orange-200',
    job: 'Field box borders at rest. They step to orange-300 on hover.',
  },
  {
    sample: <Swatch className="bg-ring" />,
    token: '--ring',
    value: 'neutral-950',
    job: 'The default focus ring, for anything that does not ring in its own hue.',
  },
]

const statusRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-success" />,
    token: '--success',
    value: 'green-100, text green-800',
    job: 'A success fill, with --success-foreground on it.',
  },
  {
    sample: <Swatch className="bg-warning" />,
    token: '--warning',
    value: 'amber-400, text amber-900',
    job: 'A solid warning fill, with --warning-foreground on it.',
  },
  {
    sample: <Swatch className="bg-error" />,
    token: '--error',
    value: 'red-100, text red-700',
    job: 'An error fill, with --error-foreground on it. The destructive button fills with this.',
  },
  {
    sample: <Swatch className="bg-destructive" />,
    token: '--destructive',
    value: 'red-600',
    job: 'An invalid field: error text, the required asterisk, borders, focus rings, and a checked invalid checkbox or radio. Also the destructive menu item text.',
  },
]

const loadingRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-skeleton" />,
    token: '--skeleton',
    value: 'orange-200',
    job: 'Skeleton blocks.',
  },
  {
    sample: <Swatch className="bg-progress-track" />,
    token: '--progress-track',
    value: 'orange-200',
    job: 'The progress and stepper track.',
  },
  {
    sample: <Swatch className="bg-progress-fill" />,
    token: '--progress-fill',
    value: 'orange-600',
    job: 'The progress and stepper fill, an alias of --indicator.',
  },
]

const chartRows: TokenRow[] = [
  {
    sample: <Swatch className="bg-chart-1" />,
    token: '--chart-1',
    value: 'orange-500',
    job: 'The first series. The brand leads.',
  },
  {
    sample: <Swatch className="bg-chart-2" />,
    token: '--chart-2',
    value: 'sky-300',
    job: 'The second series.',
  },
  {
    sample: <Swatch className="bg-chart-3" />,
    token: '--chart-3',
    value: 'violet-300',
    job: 'The third series.',
  },
  {
    sample: <Swatch className="bg-chart-4" />,
    token: '--chart-4',
    value: 'teal-300',
    job: 'The fourth series.',
  },
  {
    sample: <Swatch className="bg-chart-5" />,
    token: '--chart-5',
    value: 'pink-300',
    job: 'The fifth series.',
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

function ColorsPage() {
  return (
    <FoundationPage
      title="Colours"
      principle="An orange brand over a beige page, with white cards and fields, orange borders, and neutral grey text."
      introduction={
        <>
          <p>
            Colour comes in two layers.{' '}
            <strong>
              The palette layer is Tailwind&rsquo;s OKLCH palette:
            </strong>{' '}
            greys from <code>neutral</code> (chroma 0), the brand from{' '}
            <code>orange</code>, destructive and error from <code>red</code>,
            success from <code>green</code>, warning from <code>amber</code>.{' '}
            <strong>The functional layer</strong> gives each job a token that
            points at one palette step, as{' '}
            <code>--primary: var(--color-orange-600)</code>. Components use the
            functional tokens and never the palette steps behind them, so a
            change of step happens in one place.
          </p>
          <p>
            Every colour is a palette step. There is no colour alpha anywhere,
            so no <code>/50</code> modifiers and no <code>color-mix</code>. A
            hover or press shade steps along the ramp, as orange-200 to
            orange-300. Opacity on a whole element, for a disabled state or a
            fade, is fine because it fades the element and does not define a
            colour. The system is light only.
          </p>
        </>
      }
      tokenSections={[
        {
          title: 'Surfaces',
          description:
            'Surfaces separate by background step and solid border, never by shadow.',
          rows: surfaceRows,
        },
        {
          title: 'Text',
          description: 'Text is neutral grey on every surface.',
          rows: textRows,
        },
        {
          title: 'Orange',
          description:
            'Orange has three jobs. --primary is a fill under text, --indicator is a mark on a surface (a fill, a bar, a ring, an underline), and --primary-text is orange as text. The first two share orange-600 but name different jobs, so a mark and a fill can move apart without touching each other’s consumers.',
          rows: orangeRows,
        },
        {
          title: 'Borders and rings',
          description:
            'Borders are decorative. Rings are how focus shows, so a ring has to stand out against the page.',
          rows: lineRows,
        },
        {
          title: 'Status',
          description:
            'Each status ships as a fill and a text colour that reads on it. Error does not reuse --destructive, because a tint cannot come from a solid without alpha.',
          rows: statusRows,
        },
        {
          title: 'Loading',
          description:
            'Placeholders and tracks sit one step above the page on the orange ramp.',
          rows: loadingRows,
        },
        {
          title: 'Charts',
          description:
            'The brand leads, then four pale hues. A chart that needs a status colour takes --success directly.',
          rows: chartRows,
        },
      ]}
      sections={[
        {
          title: 'Group colours',
          content: (
            <>
              <p>
                Six hues tell items in a set apart: the stays of a trip, avatar
                fallbacks, labels. Each hue has six tokens.{' '}
                <code>--group-&lt;hue&gt;</code> is the solid fill with{' '}
                <code>-foreground</code> text, <code>-soft</code> is a tint with{' '}
                <code>-soft-foreground</code> text, and <code>-border</code>{' '}
                steps to <code>-border-hover</code>.
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
                      className={`${groupHue.borderClassName} text-foreground rounded-md border-2 px-2.5 py-1 text-sm font-medium transition-colors duration-(--motion-fast)`}
                    >
                      border
                    </span>
                  </div>
                ))}
              </div>
              <p>
                Assign hues by index in this order: cyan sits close to sky and
                fuchsia close to pink, and this order keeps each lookalike pair
                three places apart.
              </p>
            </>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Reach for the functional token (--primary, --muted-foreground), never the palette step.',
          reason:
            'A token names a job, so the colour can change in one place without hunting through components.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put white on every orange fill.',
          reason:
            'Dark text on orange reads muddy. White is the one pairing that keeps the brand vivid.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Step along the ramp for hover and press, as orange-200 to orange-300.',
          reason: 'A stepped colour stays a palette colour and needs no alpha.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Use colour alpha: no /50 modifiers, no color-mix, no rgba.',
          reason:
            'Alpha makes a colour depend on what is behind it, so the same token looks different on each surface.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Let a group colour work alone.',
          reason:
            'The set leaves out every hue near the brand or a status, so a group never reads as an action or a result. Always pair the colour with a text label.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Add a dark theme or a dark: variant.',
          reason:
            'The system is light only, so a dark variant would be styling nothing renders.',
        },
      ]}
      notes={
        <>
          <p>
            Ratios are measured by converting each OKLCH colour to sRGB and
            applying the WCAG relative luminance formula.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <code>--foreground</code> is 17.20:1 on the page and 18.25:1 on
              white. <code>--muted-foreground</code> is 7.01:1 on the page,
              7.44:1 on white, 6.48:1 on <code>--muted</code>, and 5.48:1 on{' '}
              <code>--accent</code>.
            </li>
            <li>
              <code>--secondary-foreground</code> on <code>--secondary</code> is
              14.14:1. <code>--accent-foreground</code> on <code>--accent</code>{' '}
              is 11.96:1.
            </li>
            <li>
              <code>--primary-text</code> is 4.93:1 on the page and 5.23:1 on
              white.
            </li>
            <li>
              White on orange-600 is 3.59:1, below AA for body text. On hover an
              orange fill steps to orange-700, where white holds 5.23:1. Dark
              text on orange scores worse under APCA (Lc 49 against
              white&rsquo;s Lc 68), so white stays.
            </li>
            <li>
              <code>--indicator</code> is 3.38:1 on the page and 3.59:1 on
              white. <code>--progress-fill</code> is 2.65:1 on its track.
            </li>
            <li>
              <code>--ring</code> is 13.46:1 or more against every surface. The
              outline, secondary, and ghost buttons and an unpressed toggle
              group chip ring in <code>--accent</code>, the colour their hover
              washes to, which is 1.28:1 on the page.
            </li>
            <li>Status pairs: success 6.23:1, warning 5.17:1, error 5.36:1.</li>
            <li>
              Chart slots 2 to 5 sit under 3:1 on a white card, so a series is
              told apart by its label and position, never by colour alone.
            </li>
          </ul>
          <p>
            Borders carry no contrast floor because they only separate surfaces
            that already differ in background. See{' '}
            <TextLink asChild>
              <Link to="/accessibility">Accessibility</Link>
            </TextLink>{' '}
            for where components ship below AA.
          </p>
        </>
      }
      related={[
        {
          to: '/principles',
          label: 'Principles',
          description: 'Why the system is flat, light, and palette only.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'The contrast method and the cases below AA.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The primary fill, white text, and the focus ring.',
        },
      ]}
    />
  )
}
