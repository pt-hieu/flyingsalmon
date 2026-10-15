import { createFileRoute } from '@tanstack/react-router'

import {
  DocTextLink,
  FoundationPage,
  GuidelineVerdict,
  TokenSample,
  docPageHead,
} from '@/components/doc-page'
import type { FoundationTableRow } from '@/components/doc-page'

const title = 'Principles'

const principle =
  'Bold, warm, and social: a flat, light, orange system that tells you what happened where you are already looking.'

export const Route = createFileRoute('/_docs/principles')({
  head: () => docPageHead(title, principle),
  component: PrinciplesPage,
})

function numberSample(position: string) {
  return <span className="font-heading text-2xl font-bold">{position}</span>
}

const resultHomeRows: FoundationTableRow[] = [
  {
    sample: numberSample('1'),
    name: 'The affected item',
    detail: 'Card, table row, list',
    job: 'Success is the item appearing or updating: a new trip at the top of the list needs no words. Failure is a failed state on the item with its message and a retry.',
  },
  {
    sample: numberSample('2'),
    name: 'The acting surface',
    detail: 'Form result slot, Alert',
    job: 'The result slot below the form’s actions row, for client-side validation across fields and for page forms whose server is the validator, such as sign in or payment.',
  },
  {
    sample: numberSample('3'),
    name: 'The notice',
    detail: 'Notice',
    job: 'A shell-owned, persistent surface for a result with no visible home: after navigation, after a dialog form has closed, or for an action with nothing to show, such as a copied link.',
  },
]

const bannedRows: FoundationTableRow[] = [
  {
    sample: numberSample('×'),
    name: 'Auto-dismisses',
    detail: 'A timer',
    job: 'A result that leaves on a clock can leave before the reader looks. Feedback stays until it has been seen.',
  },
  {
    sample: numberSample('×'),
    name: 'Stacks',
    detail: 'Several at once',
    job: 'A pile of results is a queue to be cleared, not a message. One result at a time, replaced by the next.',
  },
  {
    sample: numberSample('×'),
    name: 'Has no owner',
    detail: 'Floating, unattached',
    job: 'A result nothing in the app is responsible for cannot be updated, dismissed, or retried by anyone.',
  },
  {
    sample: numberSample('×'),
    name: 'Has no link back',
    detail: 'No subject',
    job: 'A message that cannot take you to the thing it is about leaves you guessing what it means.',
  },
]

const surfaceSamples = [
  {
    label: 'Solid border',
    className: 'border-border bg-card size-8 rounded-lg border',
  },
  {
    label: 'Background step',
    className: 'bg-muted size-8 rounded-lg',
  },
  {
    label: 'Border feedback',
    className:
      'border-input hover:border-indicator bg-card size-8 rounded-lg border-2 transition-colors duration-(--motion-fast)',
  },
]

function PrinciplesPage() {
  return (
    <FoundationPage
      title={title}
      principle={principle}
      introduction={
        <p>
          flyingsalmon is an opinionated design system: an app built from it
          feels like making plans with friends, not like filing a form. Four
          principles decide everything else: feedback appears where the user is
          looking, surfaces are flat, every colour comes from the palette, and
          every space is a step on one scale. Each one is a choice the
          components make for you so an app built from them agrees without
          anyone coordinating.
        </p>
      }
      tablesTitle="Where a result belongs"
      tables={[
        {
          title: 'The three homes, in order',
          description: (
            <>
              <strong>
                Feedback appears where the user&rsquo;s attention already is and
                stays until they have seen it.
              </strong>{' '}
              Use the first home that fits. The registry enforces this only on
              its own components: none has an auto-dismiss prop, the notice
              holds one item, and alerts and field errors announce themselves.
              Where an app puts its feedback is the app&rsquo;s choice, so this
              ranking is guidance.
            </>
          ),
          headings: ['Order', 'Home', 'Component', 'Use it for'],
          rows: resultHomeRows,
        },
        {
          title: 'What is banned, and why',
          description:
            'Feedback that has any of these properties is banned, whatever it is called. A bottom-right toast has all four. A notice has none of them, so a notice is allowed and a toast is not.',
          headings: ['Mark', 'Property', 'Looks like', 'Why it fails'],
          rows: bannedRows,
        },
      ]}
      sections={[
        {
          title: 'Dialog forms',
          content: (
            <>
              <p>
                A dialog form closes on submit and leaves no result inside it.{' '}
                <strong>Success shows on the item that changed.</strong> A new
                trip in the list cannot be missed.
              </p>
              <p>
                <strong>
                  A server error becomes a notice whose link reopens the dialog
                  with what the user typed.
                </strong>{' '}
                The dialog is gone, so the notice is the one home that stays
                until it is seen, and nothing typed is lost. The dialog closes
                on submit, so nobody waits on it. Validation the app can do on
                the client stays in the dialog, under the field.
              </p>
              <p>
                A dropdown menu action follows the same order. Its result shows
                on the affected item, and only when no item is visible does a
                notice carry it. A notice about an item that is on screen is a
                bug, because the item&rsquo;s own state is the right home.
              </p>
            </>
          ),
        },
        {
          title: 'Who shows what',
          content: (
            <p>
              The acting component shows its own busyness: a button morphs
              through a loading state and a field shows its own error. The app
              owns success and failure of the action as a whole. Position is
              never the objection to a result. The objection is that it is
              missed.
            </p>
          ),
        },
        {
          title: 'Flat surfaces',
          content: (
            <>
              <p>
                There are no shadows and no elevation tokens. Surfaces separate
                by solid border and background step, and interaction feedback
                lives in the border. Depth that comes from blur reads as
                generic. A hard edge reads as drawn, which suits the warm and
                hand-made mood.
              </p>
              <div className="border-border bg-card flex flex-wrap items-center gap-6 rounded-lg border p-6">
                {surfaceSamples.map((surface) => (
                  <div
                    key={surface.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <TokenSample className={surface.className} />
                    <span className="text-foreground">{surface.label}</span>
                  </div>
                ))}
              </div>
            </>
          ),
        },
        {
          title: 'Palette only',
          content: (
            <p>
              Every colour is a step from the Tailwind OKLCH palette, behind a
              functional token such as <code>--primary</code>. There is no
              colour alpha, so a colour reads the same on every surface. Light
              mode only. The <DocTextLink to="/colors">colour page</DocTextLink>{' '}
              lists every token.
            </p>
          ),
        },
        {
          title: 'Spacing',
          content: (
            <p>
              Every padding, gap, margin, and size is a step on Tailwind&rsquo;s
              4px scale. Card, dialog, and timeline expose their spacing as a
              variable instead of a density prop, so one override moves every
              inset in the surface together.
            </p>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Show a successful save as the item appearing or updating.',
          reason:
            'The changed item is where the user is already looking, and it needs no words to be understood.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Put a form’s result in the slot below its actions row.',
          reason:
            'The button the user just pressed never moves, and the result sits beside it on short and long forms alike.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Show a notice about an item that is on screen.',
          reason:
            'The item’s own state is a stronger signal, and a second message about the same thing competes with it.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Move content the user did not cause to move when a server result arrives.',
          reason:
            'A field error growing under the field the user just left is movement they caused. A result arriving unprompted must not shove the page about.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Add a shadow to separate a surface.',
          reason:
            'Use a solid border or a background step. Shadows blur the flat, drawn look the system is built on.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Reintroduce a toast under another name.',
          reason:
            'A floating message that dismisses itself, stacks, or has no link to its subject fails the same way a toast does.',
        },
      ]}
      notes={
        <>
          <p>
            The notice is a shell-owned provider that holds one notice at a
            time, fixed at the top centre of the page. It stays until dismissed
            or replaced. A live region mounted before the content announces it,
            polite for success and assertive for an error. Focus never moves to
            it, and it dismisses by its button only, so Escape stays with
            dialogs. Every notice carries a link back to its subject.
          </p>
          <p>
            The form result slot carries no live region of its own: the alert an
            app places in it announces itself through its role. On a validation
            failure focus goes to the first invalid field, and the form does no
            scrolling or focus management beyond that.
          </p>
          <p>
            Movement the user caused by acting on a surface is allowed: a field
            error growing under the field they just left, or a validation
            summary appearing on the click they just made. Absolute positioning
            is not a way around the displacement rule. It is a notice, and it
            takes on the notice&rsquo;s contract.
          </p>
        </>
      }
      related={[
        {
          to: '/components/notice',
          label: 'Notice',
          description: 'The last home for a result.',
        },
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'The dialog form flow, from submit to notice.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'The result slot below the actions row.',
        },
      ]}
    />
  )
}
