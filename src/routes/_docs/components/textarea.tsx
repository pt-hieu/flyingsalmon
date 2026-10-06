import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { TextareaAutosize } from '@/examples/textarea/autosize'
import autosizeSource from '@/examples/textarea/autosize.tsx?raw'
import { TextareaDemo } from '@/examples/textarea/demo'
import demoSource from '@/examples/textarea/demo.tsx?raw'
import { TextareaDescription } from '@/examples/textarea/description'
import descriptionSource from '@/examples/textarea/description.tsx?raw'
import { TextareaDisabled } from '@/examples/textarea/disabled'
import disabledSource from '@/examples/textarea/disabled.tsx?raw'
import { TextareaError } from '@/examples/textarea/error'
import errorSource from '@/examples/textarea/error.tsx?raw'
import { TextareaLoading } from '@/examples/textarea/loading'
import loadingSource from '@/examples/textarea/loading.tsx?raw'
import { TextareaReadOnly } from '@/examples/textarea/read-only'
import readOnlySource from '@/examples/textarea/read-only.tsx?raw'
import usageSource from '@/examples/textarea/usage.tsx?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/textarea')({
  component: TextareaPage,
})

function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      lead="A multiline text field that owns its label, its error message, and its busyness, and grows with what the traveller types."
      preview={{ source: demoSource, demo: <TextareaDemo /> }}
      installation="textarea"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Autosize"
            description="The field grows to maxRows and then scrolls. Type past the fourth line to see the cap."
            source={autosizeSource}
          >
            <TextareaAutosize />
          </Example>

          <Example
            caption="Description"
            description="Helper text sits under the field and joins its accessible description."
            source={descriptionSource}
          >
            <TextareaDescription />
          </Example>

          <Example
            caption="Error"
            description="The description stays where it is and the message grows in below it."
            source={errorSource}
          >
            <TextareaError />
          </Example>

          <Example
            caption="Loading"
            description="Tab out to save. The spinner pins to the top-right corner while the save runs, the field stays editable, and a failed save becomes the field's own error."
            source={loadingSource}
          >
            <TextareaLoading />
          </Example>

          <Example
            caption="Disabled"
            description="The field and its label dim together and take no pointer events."
            source={disabledSource}
          >
            <TextareaDisabled />
          </Example>

          <Example
            caption="Read-only"
            description="The text stays readable and copyable on a muted background, and the field stays focusable."
            source={readOnlySource}
          >
            <TextareaReadOnly />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'For text that runs past one line: trip notes, a day-by-day itinerary, a message to the group.',
          'When the length is up to the traveller and you want the field to grow instead of scrolling inside a fixed box.',
        ],
        whenNotToUse: [
          {
            situation:
              'for one line of text such as a trip name or an email address.',
            alternative: { to: '/components/input', label: 'Input' },
          },
          {
            situation:
              'when the traveller picks from options you control rather than writing freely.',
            alternative: { to: '/components/combobox', label: 'Combobox' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Make the empty field as tall as the answer you expect: two or three rows for a sentence, more for notes.',
            reason:
              'The empty height tells the traveller how much to write. A one-row field invites a one-word answer.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Write the placeholder as a full example answer, such as "We land late, so keep the first evening free."',
            reason:
              'A real sentence shows the kind and length of answer you want, and reads as an invitation rather than a blank to fill.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Word an error as what to write: "Tell us why you are leaving the plan, even in a few words."',
            reason:
              'The traveller fixes a free-text field by writing, so the message hands them the start of the answer.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Offer a submit shortcut without a visible hint beside the submit button.',
            reason:
              'Enter always makes a new line here, so a shortcut is invisible unless the screen names it. A hidden key only helps people who already guess it exists.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Lock the field while an autosave runs.',
            reason:
              'A spinner in the corner shows the save and the traveller keeps typing; the next save picks up the new text.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Give the field a drag handle or a fixed height.',
            reason:
              'The height follows the content up to a cap and then the field scrolls, so a manual size would fight it.',
          },
        ],
      }}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Moves focus out of the field. It never inserts a tab character.',
              },
              {
                keys: ['Shift+Tab'],
                description: 'Moves focus to the previous control.',
              },
              {
                keys: ['Enter'],
                description: 'Inserts a newline. It does not submit the form.',
              },
            ]}
          />
          <p>
            Textarea generates the field <code>id</code> and wires the label to
            it, so clicking the label focuses the field. An error sets{' '}
            <code>aria-invalid</code>, and <code>aria-describedby</code> lists
            any ids you passed, then the error message, then the description. A
            loading field sets <code>aria-busy</code> and hides its spinner from
            screen readers, so the wait is announced once. <code>required</code>{' '}
            marks the label and reaches the <code>&lt;textarea&gt;</code>; the
            validation itself stays with your app. The field handles no submit
            shortcut: a key such as Cmd+Enter belongs to your form. The states
            every field shares are described on{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <PropsTable
          component="Textarea"
          description={
            <>
              Also takes every <code>&lt;textarea&gt;</code> attribute except{' '}
              <code>rows</code>. <code>className</code> styles the wrapper.
            </>
          }
          rows={[
            {
              name: 'label',
              type: 'string',
              description:
                'The visible label. Renders above the field and is wired to it.',
            },
            {
              name: 'minRows',
              type: 'number',
              default: '3',
              description: 'The height of the empty field, in rows.',
            },
            {
              name: 'maxRows',
              type: 'number',
              default: '8',
              description:
                'The most rows the field grows to. Past it, the field scrolls.',
            },
            {
              name: 'description',
              type: 'string',
              description: 'Helper text under the field.',
            },
            {
              name: 'error',
              type: 'string',
              description:
                'The failure message. Turns the border, the ring, and the label destructive.',
            },
            {
              name: 'loading',
              type: 'boolean',
              default: 'false',
              description:
                'Pins a spinner to the top-right corner. The field stays editable. Set it, not disabled, while an autosave runs.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the field and its label and removes both from the tab order.',
            },
            {
              name: 'readOnly',
              type: 'boolean',
              default: 'false',
              description:
                'Keeps the text readable on a muted background. The field stays focusable.',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Marks the label and sets the native attribute.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            There is no size prop. One scale matches the default{' '}
            <code>Input</code> so fields line up, and the height comes from the
            content. Growth is instant, because a spring on every keystroke
            would fight the caret.
          </p>
          <p>
            The spinner overlays the top-right corner inside the padding. A
            textarea has no end slot, since text flows across every line, so the
            field reserves that column while it loads and no line runs under the
            spinner. With an error alongside, both show and the spinner turns
            destructive.
          </p>
          <p>
            A read-only field keeps its focus ring: a keyboard user must always
            see where focus landed, and the muted background says the field is
            not editable.
          </p>
          <p>
            Hover border, focus ring, and the destructive colour change are CSS
            transitions at <code>--motion-fast</code>. The error message is the
            one enter and exit: height and opacity on <code>springSettle</code>{' '}
            both ways. The spinner runs its own 800ms turn.
          </p>
        </>
      }
      related={[
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, description, error, loading, and disabled behaviour every field shares.',
        },
        {
          to: '/components/input',
          label: 'Input',
          description: 'The single-line counterpart.',
        },
        {
          to: '/components/form',
          label: 'Form',
          description: 'Lays fields out with an actions row and a result slot.',
        },
      ]}
    />
  )
}
