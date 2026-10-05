import { createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict, KeyboardTable } from '@/components/doc-page'
import { FoundationPage } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'

export const Route = createFileRoute('/_docs/accessibility')({
  component: AccessibilityPage,
})

function ratioSample(ratio: string) {
  return <span className="text-foreground font-medium">{ratio}</span>
}

const textRows: TokenRow[] = [
  {
    sample: ratioSample('17.20:1'),
    token: '--foreground on --background',
    value: 'Body text and headings on the page (18.25:1 on white)',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample('7.01:1'),
    token: '--muted-foreground on --background',
    value: 'Descriptions, placeholders, helper text (7.44:1 on white)',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample('5.48:1'),
    token: '--muted-foreground on --accent',
    value: 'Muted text on a hovered row',
    job: 'Clears AA.',
  },
  {
    sample: ratioSample('14.14:1'),
    token: '--secondary-foreground on --secondary',
    value: 'Secondary button and badge text',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample('11.96:1'),
    token: '--accent-foreground on --accent',
    value: 'Highlighted menu rows, hovered ghost buttons',
    job: 'Clears AA and AAA.',
  },
  {
    sample: ratioSample('4.93:1'),
    token: '--primary-text on --background',
    value: 'Orange as text (5.23:1 on white)',
    job: 'Clears AA.',
  },
  {
    sample: ratioSample('5.17:1 to 6.23:1'),
    token: 'Status fills and their text',
    value: 'Success, warning, error',
    job: 'Each pair clears AA.',
  },
]

const belowAaRows: TokenRow[] = [
  {
    sample: ratioSample('3.59:1'),
    token: '--primary-foreground on --primary',
    value: 'White on orange-600',
    job: 'Every orange fill carries white: the default button, the badge, the pressed chip, and the selected calendar numeral. Dark text on orange reads muddy, and white scores higher under APCA (Lc 68 against Lc 49). Hover steps to orange-700, where white holds 5.23:1.',
  },
  {
    sample: ratioSample('2.65:1'),
    token: '--progress-fill on --progress-track',
    value: 'Progress and stepper fill',
    job: 'The fill is under the 3:1 bar for non-text against its track, and clears it at 3.38:1 against the page. The track is 1.28:1 on the page, so an empty bar stays visible without a border.',
  },
  {
    sample: ratioSample('2.65:1 and 2.11:1'),
    token: '--indicator on orange-200 and its hover step',
    value:
      'An indicator mark on a highlighted row, a hovered calendar day, or the range band',
    job: 'Orange-600 lands on the same orange-200 the highlight uses. The mark is a small accent next to text that holds full contrast.',
  },
  {
    sample: ratioSample('1.28:1'),
    token: '--accent ring on --background (1.36:1 on white)',
    value:
      'Focus and press ring of outline, secondary, and ghost buttons and an unpressed toggle group chip',
    job: 'These ring in the colour their hover washes to, so the ring and the hover read as one family. The label inside stays at full text contrast.',
  },
  {
    sample: ratioSample('1.47:1 to 2.89:1'),
    token: '--chart-1 to --chart-5 on white',
    value: 'Chart series',
    job: 'The pale hues are told apart by their label and position, never by their edge against the card. Near-black text on slots two to five holds 9.20:1 or more.',
  },
  {
    sample: ratioSample('1.48:1'),
    token: '--slider-fill on the slider well',
    value: 'Slider fill',
    job: 'The fill repeats what the thumb and the description already say. The thumb border clears 3:1 at 3.13:1 on the well, and the description names the current step.',
  },
]

function AccessibilityPage() {
  return (
    <FoundationPage
      title="Accessibility"
      principle="Everything is reachable from the keyboard, focus is always visible, and contrast is measured and recorded."
      introduction={
        <p>
          Two requirements are fixed. Every component has a visible focus state
          and a full keyboard path. Contrast is a strong default: WCAG AA, with
          a few named exceptions below, each with its reason. A component ships
          below AA only in a case listed on this page.
        </p>
      }
      tokensTitle="Contrast"
      tokenSections={[
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
                      'Close the top floating surface: a menu, popover, dialog, or drawer. A notice never takes Escape, because that key belongs to dialogs.',
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
            Focus ring ratios: <code>--indicator</code> is 3.38:1 on the page
            and 3.59:1 on white. <code>--ring</code> is 13.46:1 or more on every
            surface. The destructive ring is 4.57:1 on a white field.
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
