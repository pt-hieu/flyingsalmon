import { createFileRoute } from '@tanstack/react-router'

import { apcaLightness, contrastRatios } from '@/components/contrast-ratios'
import {
  FoundationPage,
  GuidelineVerdict,
  KeyboardTable,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow } from '@/components/doc-page'

const title = 'Accessibility'

const principle =
  'Everything is reachable from the keyboard, focus is always visible, and contrast is measured and recorded.'

export const Route = createFileRoute('/_docs/accessibility')({
  head: () => docPageHead(title, principle),
  component: AccessibilityPage,
})

function ratioSample(ratio: string) {
  return <span className="text-foreground font-medium">{ratio}</span>
}

const textRows: FoundationTableRow[] = [
  {
    sample: ratioSample(contrastRatios.foregroundOnBackground),
    name: '--foreground on --background',
    detail: `Body text and headings on the page (${contrastRatios.foregroundOnWhite} on white)`,
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample(contrastRatios.mutedForegroundOnBackground),
    name: '--muted-foreground on --background',
    detail: `Descriptions, placeholders, helper text (${contrastRatios.mutedForegroundOnWhite} on white)`,
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample(contrastRatios.mutedForegroundOnAccent),
    name: '--muted-foreground on --accent',
    detail: 'Muted text on a row under the pointer',
    job: 'Clears AA.',
  },
  {
    sample: ratioSample(contrastRatios.secondaryForegroundOnSecondary),
    name: '--secondary-foreground on --secondary',
    detail: 'Secondary button and badge text',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample(contrastRatios.accentForegroundOnAccent),
    name: '--accent-foreground on --accent',
    detail: 'Highlighted menu rows, ghost buttons under the pointer',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample(contrastRatios.primaryTextOnBackground),
    name: '--primary-text on --background',
    detail: `Orange as text (${contrastRatios.primaryTextOnWhite} on white)`,
    job: 'Clears AA.',
  },
  {
    sample: ratioSample(
      `${contrastRatios.warningPair} to ${contrastRatios.successPair}`,
    ),
    name: 'Status fills and their text',
    detail: 'Success, warning, error',
    job: 'Each pair clears AA.',
  },
]

const belowAaRows: FoundationTableRow[] = [
  {
    sample: ratioSample(contrastRatios.whiteOnPrimary),
    name: '--primary-foreground on --primary',
    detail: 'White on orange-600',
    job: `Every orange fill carries white: the default button, the badge, the pressed chip, and the selected calendar numeral. Dark text on orange reads muddy, and white scores higher under APCA (${apcaLightness.whiteOnPrimary} against ${apcaLightness.darkTextOnPrimary}). Hover steps to orange-700, where white holds ${contrastRatios.whiteOnPrimaryHover}.`,
  },
  {
    sample: ratioSample(contrastRatios.progressFillOnTrack),
    name: '--progress-fill on --progress-track',
    detail: 'Progress and stepper fill',
    job: `The fill is under the 3:1 bar for non-text against its track, and clears it at ${contrastRatios.indicatorOnBackground} against the page. The track is 1.28:1 on the page, so an empty bar stays visible without a border.`,
  },
  {
    sample: ratioSample('2.65:1 and 2.11:1'),
    name: '--indicator on orange-200 and its hover step',
    detail:
      'An indicator mark on a highlighted row, a calendar day under the pointer, or the range band',
    job: 'Orange-600 lands on the same orange-200 the highlight uses. The mark is a small accent next to text that holds full contrast.',
  },
  {
    sample: ratioSample(contrastRatios.accentRingOnBackground),
    name: '--accent ring on --background (1.36:1 on white)',
    detail:
      'Focus and press ring of outline, secondary, and ghost buttons and an unpressed toggle group chip',
    job: 'These ring in the colour their hover washes to, so the ring and the hover read as one family. The label inside stays at full text contrast.',
  },
  {
    sample: ratioSample('1.47:1 to 2.89:1'),
    name: '--chart-1 to --chart-5 on white',
    detail: 'Chart series',
    job: 'The pale hues are told apart by their label and position, never by their edge against the card. Near-black text on slots two to five holds 9.20:1 or more.',
  },
  {
    sample: ratioSample('1.48:1'),
    name: '--slider-fill on the slider well',
    detail: 'Slider fill',
    job: 'The fill repeats what the thumb and the description already say. The thumb border clears 3:1 at 3.13:1 on the well, and the description names the current step.',
  },
]

function AccessibilityPage() {
  return (
    <FoundationPage
      title={title}
      principle={principle}
      introduction={
        <p>
          Two requirements are fixed. Every component has a visible focus state
          and a full keyboard path. Contrast is a strong default: WCAG AA, with
          a few named exceptions below, each with its reason. A component ships
          below AA only in a case listed on this page.
        </p>
      }
      tablesTitle="Contrast"
      tables={[
        {
          title: 'Text pairs',
          description:
            'Text needs 4.5:1 against its background. These are the system’s pairs.',
          headings: ['Ratio', 'Pair', 'Where', 'Verdict'],
          rows: textRows,
        },
        {
          title: 'Where a component ships below AA',
          description:
            'These pairs are below the bar and are kept deliberately. The reason is part of the record.',
          headings: ['Ratio', 'Pair', 'Where', 'Why it stays'],
          rows: belowAaRows,
        },
      ]}
      sections={[
        {
          title: 'Keyboard',
          content: (
            <>
              <p>
                Every control is reachable by Tab and operable without a
                pointer. Components follow the pattern their role has on the
                platform, so the keys you expect work. The common keys:
              </p>
              <KeyboardTable
                rows={[
                  {
                    keys: ['Tab', 'Shift+Tab'],
                    description:
                      'Move focus to the next or previous control. A field and an interactive adornment inside it are two stops, field first.',
                  },
                  {
                    keys: ['Enter', 'Space'],
                    description:
                      'Activate a button, toggle a checkbox or switch, open a select or menu.',
                  },
                  {
                    keys: ['ArrowUp', 'ArrowDown'],
                    description:
                      'Move through the options of a menu, select, combobox list, radio group, or tabs.',
                  },
                  {
                    keys: ['Escape'],
                    description:
                      'Close the top floating surface: a menu, select list, date picker panel, dialog, or drawer. A notice never takes Escape, because that key belongs to dialogs.',
                  },
                ]}
              />
              <p>
                Each component page lists the keys it adds, including the ones
                that do nothing.
              </p>
            </>
          ),
        },
        {
          title: 'Focus',
          content: (
            <>
              <p>
                Focus is always visible, and it shows on keyboard focus (
                <code>:focus-visible</code>) so a mouse click does not leave a
                ring behind. Fields and form controls ring in{' '}
                <code>--indicator</code>. Anything else rings in{' '}
                <code>--ring</code>, near-black, which stands out against every
                surface. An invalid field rings in <code>--destructive</code>.
              </p>
              <p>
                A dialog traps focus while it is open and returns it to the
                trigger when it closes. A notice never takes focus, so it cannot
                interrupt what you are typing.
              </p>
            </>
          ),
        },
        {
          title: 'Not by colour alone',
          content: (
            <p>
              A state is never carried by colour only. A switch shows on and off
              by position and track. An invalid field shows its message in
              words. A group colour always comes with a text label.
            </p>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Check every new text pair at 4.5:1 and every graphic that carries meaning at 3:1.',
          reason:
            'Those are the WCAG AA bars for text and for non-text elements.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Give every icon-only control a name a screen reader can say.',
          reason:
            'The icon is all a sighted user gets, and a screen reader has nothing else to read.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Pair colour with words or a shape wherever colour carries meaning.',
          reason:
            'A reader who cannot tell the hues apart still gets the message.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Remove or hide a focus ring.',
          reason:
            'A keyboard user then cannot tell where they are. Restyle the ring if it clashes, but keep it visible.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Make a component usable by pointer only.',
          reason:
            'Every action needs a path that works with Tab, Enter, Space, and the arrow keys.',
        },
      ]}
      notes={
        <>
          <p>
            Ratios are measured by converting each OKLCH colour to sRGB and
            computing WCAG relative luminance.
          </p>
          <p>
            Borders and dividers carry no contrast floor. They separate surfaces
            that already differ in background, so they are decorative under
            WCAG. Rings are different: focus has to be seen, so a ring clears
            3:1 against the page unless it appears in the table of exceptions
            above.
          </p>
          <p>
            Focus ring ratios: <code>--indicator</code> is{' '}
            {contrastRatios.indicatorOnBackground} on the page and{' '}
            {contrastRatios.indicatorOnWhite} on white. <code>--ring</code> is{' '}
            {contrastRatios.ringOnAnySurface} or more on every surface. The
            destructive ring is 4.57:1 on a white field.
          </p>
          <p>
            The system does not implement <code>prefers-reduced-motion</code>.
            Motion is small and short, and continuous loops are limited to
            spinners and skeletons.
          </p>
        </>
      }
      related={[
        {
          to: '/colors',
          label: 'Colours',
          description: 'Every token and the step behind it.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description: 'Why feedback persists until it is seen.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description: 'The durations and loops the system uses.',
        },
      ]}
    />
  )
}
