import { createFileRoute } from '@tanstack/react-router'

import { apcaLightness, contrastRatios } from '@/components/contrast-ratios'
import {
  DocTextLink,
  FoundationPage,
  GroupHueSwatch,
  GuidelineVerdict,
  Swatch,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow, GroupHue } from '@/components/doc-page'

const title = 'Colours'

const principle =
  'An orange brand over a beige page, with white cards and fields, orange borders, and neutral grey text.'

export const Route = createFileRoute('/_docs/colors')({
  head: () => docPageHead(title, principle),
  component: ColorsPage,
})

const surfaceRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-background" />,
    name: '--background',
    detail: 'orange-50',
    job: 'The page. Everything else sits on it.',
  },
  {
    sample: <Swatch className="bg-card" />,
    name: '--card',
    detail: 'white',
    job: 'Cards, alerts, and field boxes: input, textarea, select, combobox, date picker, number field.',
  },
  {
    sample: <Swatch className="bg-popover" />,
    name: '--popover',
    detail: 'white',
    job: 'Floating surfaces: menus, select lists, the date picker panel, dialogs, drawers.',
  },
  {
    sample: <Swatch className="bg-muted" />,
    name: '--muted',
    detail: 'orange-100',
    job: 'A quiet background step: a read-only field, the number field spin button, the empty state icon tile.',
  },
  {
    sample: <Swatch className="bg-secondary" />,
    name: '--secondary',
    detail: 'orange-100',
    job: 'The secondary button and badge, an unpressed toggle group chip, the avatar group overflow count.',
  },
  {
    sample: <Swatch className="bg-accent" />,
    name: '--accent',
    detail: 'orange-200',
    job: 'Hover and highlight: a ghost button under the pointer, the highlighted menu row, a calendar day under the pointer.',
  },
]

const textRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-foreground" />,
    name: '--foreground',
    detail: 'neutral-950',
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
    name: '--muted-foreground',
    detail: 'neutral-600',
    job: 'Descriptions, placeholders, helper text, and field icons.',
  },
  {
    sample: <Swatch className="bg-secondary-foreground" />,
    name: '--secondary-foreground',
    detail: 'neutral-900',
    job: 'Text on --secondary.',
  },
  {
    sample: <Swatch className="bg-accent-foreground" />,
    name: '--accent-foreground',
    detail: 'neutral-900',
    job: 'Text on --accent.',
  },
  {
    sample: <Swatch className="bg-primary-text" />,
    name: '--primary-text',
    detail: 'orange-700',
    job: 'Orange as text: the date picker focused segment, the notice subject on hover.',
  },
]

const orangeRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-primary" />,
    name: '--primary',
    detail: 'orange-600',
    job: 'An orange fill under text: the default button, the default badge, the pressed toggle group chip.',
  },
  {
    sample: <Swatch className="bg-primary-foreground" />,
    name: '--primary-foreground',
    detail: 'white',
    job: 'Text on --primary.',
  },
  {
    sample: <Swatch className="bg-indicator" />,
    name: '--indicator',
    detail: 'orange-600',
    job: 'Every orange mark on a surface: checked fills, active bars, field focus rings, the text link underline, the progress fill.',
  },
  {
    sample: <Swatch className="bg-indicator-foreground" />,
    name: '--indicator-foreground',
    detail: 'white',
    job: 'A glyph on --indicator: the checkbox tick, the radio dot, the switch thumb, the selected calendar numeral.',
  },
]

const lineRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-border" />,
    name: '--border',
    detail: 'orange-200',
    job: 'Every surface border and divider.',
  },
  {
    sample: <Swatch className="bg-input" />,
    name: '--input',
    detail: 'orange-200',
    job: 'Field box borders at rest. They step to orange-300 on hover.',
  },
  {
    sample: <Swatch className="bg-ring" />,
    name: '--ring',
    detail: 'neutral-950',
    job: 'The default focus ring, for anything that does not ring in its own hue.',
  },
]

const statusRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-success" />,
    name: '--success',
    detail: 'green-100, text green-800',
    job: 'A success fill, with --success-foreground on it.',
  },
  {
    sample: <Swatch className="bg-warning" />,
    name: '--warning',
    detail: 'amber-400, text amber-900',
    job: 'A solid warning fill, with --warning-foreground on it.',
  },
  {
    sample: <Swatch className="bg-error" />,
    name: '--error',
    detail: 'red-100, text red-700',
    job: 'An error fill, with --error-foreground on it. The destructive button fills with this.',
  },
  {
    sample: <Swatch className="bg-destructive" />,
    name: '--destructive',
    detail: 'red-600',
    job: 'An invalid field: error text, the required asterisk, borders, focus rings, and a checked invalid checkbox or radio. Also the destructive menu item text.',
  },
]

const loadingRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-skeleton" />,
    name: '--skeleton',
    detail: 'orange-200',
    job: 'Skeleton blocks.',
  },
  {
    sample: <Swatch className="bg-progress-track" />,
    name: '--progress-track',
    detail: 'orange-200',
    job: 'The progress and stepper track.',
  },
  {
    sample: <Swatch className="bg-progress-fill" />,
    name: '--progress-fill',
    detail: 'orange-600',
    job: 'The progress and stepper fill, an alias of --indicator.',
  },
]

const chartRows: FoundationTableRow[] = [
  {
    sample: <Swatch className="bg-chart-1" />,
    name: '--chart-1',
    detail: 'orange-500',
    job: 'The first series. The brand leads.',
  },
  {
    sample: <Swatch className="bg-chart-2" />,
    name: '--chart-2',
    detail: 'sky-300',
    job: 'The second series.',
  },
  {
    sample: <Swatch className="bg-chart-3" />,
    name: '--chart-3',
    detail: 'violet-300',
    job: 'The third series.',
  },
  {
    sample: <Swatch className="bg-chart-4" />,
    name: '--chart-4',
    detail: 'teal-300',
    job: 'The fourth series.',
  },
  {
    sample: <Swatch className="bg-chart-5" />,
    name: '--chart-5',
    detail: 'pink-300',
    job: 'The fifth series.',
  },
]

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
      title={title}
      principle={principle}
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
      tables={[
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
            'Placeholders and tracks sit two steps above the page on the orange ramp.',
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
                  <GroupHueSwatch key={groupHue.name} hue={groupHue} />
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
          rule: 'Choose a colour by its job: orange for the main action, red for loss, grey for supporting text.',
          reason:
            'A colour then means the same thing on every screen, so a reader learns it once.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put white on every orange fill.',
          reason:
            'Dark text on orange reads muddy. White is the one pairing that keeps the brand vivid.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Deepen a colour one step for hover and another for press.',
          reason:
            'The control stays recognisably the same colour, and each state reads as a little more pressed.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Make a colour see-through to get a lighter tint.',
          reason:
            'A see-through colour takes on whatever is behind it, so the same tint looks different on each surface.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Let a group colour work alone.',
          reason:
            'The set leaves out every hue near the brand or a status, so a group never reads as an action or a result. Always pair the colour with a text label.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Design a dark version of a screen.',
          reason:
            'The system is light only: orange on a warm beige page is its identity, and there is no dark theme for a screen to join.',
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
              <code>--foreground</code> is{' '}
              {contrastRatios.foregroundOnBackground} on the page and{' '}
              {contrastRatios.foregroundOnWhite} on white.{' '}
              <code>--muted-foreground</code> is{' '}
              {contrastRatios.mutedForegroundOnBackground} on the page,{' '}
              {contrastRatios.mutedForegroundOnWhite} on white, 6.48:1 on{' '}
              <code>--muted</code>, and {contrastRatios.mutedForegroundOnAccent}{' '}
              on <code>--accent</code>.
            </li>
            <li>
              <code>--secondary-foreground</code> on <code>--secondary</code> is{' '}
              {contrastRatios.secondaryForegroundOnSecondary}.{' '}
              <code>--accent-foreground</code> on <code>--accent</code> is{' '}
              {contrastRatios.accentForegroundOnAccent}.
            </li>
            <li>
              <code>--primary-text</code> is{' '}
              {contrastRatios.primaryTextOnBackground} on the page and{' '}
              {contrastRatios.primaryTextOnWhite} on white.
            </li>
            <li>
              White on orange-600 is {contrastRatios.whiteOnPrimary}, below AA
              for body text. On hover an orange fill steps to orange-700, where
              white holds {contrastRatios.whiteOnPrimaryHover}. Dark text on
              orange scores worse under APCA ({apcaLightness.darkTextOnPrimary}{' '}
              against white&rsquo;s {apcaLightness.whiteOnPrimary}), so white
              stays.
            </li>
            <li>
              <code>--indicator</code> is {contrastRatios.indicatorOnBackground}{' '}
              on the page and {contrastRatios.indicatorOnWhite} on white.{' '}
              <code>--progress-fill</code> is{' '}
              {contrastRatios.progressFillOnTrack} on its track.
            </li>
            <li>
              <code>--ring</code> is {contrastRatios.ringOnAnySurface} or more
              against every surface. The outline, secondary, and ghost buttons
              and an unpressed toggle group chip ring in <code>--accent</code>,
              the colour their hover washes to, which is{' '}
              {contrastRatios.accentRingOnBackground} on the page.
            </li>
            <li>
              Status pairs: success {contrastRatios.successPair}, warning{' '}
              {contrastRatios.warningPair}, error {contrastRatios.errorPair}.
            </li>
            <li>
              Chart slots 2 to 5 sit under 3:1 on a white card, so a series is
              told apart by its label and position, never by colour alone.
            </li>
          </ul>
          <p>
            Borders carry no contrast floor because they only separate surfaces
            that already differ in background. See{' '}
            <DocTextLink to="/accessibility">Accessibility</DocTextLink> for
            where components ship below AA.
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
