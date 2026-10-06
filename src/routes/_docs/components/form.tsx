import { Link, createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { FormDemo } from '@/examples/form/demo'
import demoSource from '@/examples/form/demo.tsx?raw'
import { FormEveryField } from '@/examples/form/every-field'
import everyFieldSource from '@/examples/form/every-field.tsx?raw'
import { FormFieldErrors } from '@/examples/form/field-errors'
import fieldErrorsSource from '@/examples/form/field-errors.tsx?raw'
import { FormLiveSubmit } from '@/examples/form/live-submit'
import liveSubmitSource from '@/examples/form/live-submit.tsx?raw'
import { FormServerError } from '@/examples/form/server-error'
import serverErrorSource from '@/examples/form/server-error.tsx?raw'
import usageSource from '@/examples/form/usage.tsx?raw'
import guidelines from '@/registry/ui/form/guidelines.md?raw'
import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/form')({
  component: FormPage,
})

function FormPage() {
  return (
    <DocPage
      title="Form"
      lead="A layout shell for a set of fields: one vertical rhythm, an actions row, and a fixed place for the submit result."
      preview={{ source: demoSource, demo: <FormDemo /> }}
      installation="form"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Live submit"
            description="Press Save trip. The button morphs into its loading state, the fields stay editable while the request runs, and the result lands in the slot below the actions."
            source={liveSubmitSource}
          >
            <FormLiveSubmit />
          </Example>

          <Example
            caption="Field errors"
            description="Each field owns its failure: the label, the border, the ring, and the message. Form neither collects them nor renders a summary."
            source={fieldErrorsSource}
          >
            <FormFieldErrors />
          </Example>

          <Example
            caption="A server error in the result slot"
            description="This demo's server is offline. A failure that belongs to the whole form goes through the same slot as a success, and the typed values stay where they are."
            source={serverErrorSource}
          >
            <FormServerError />
          </Example>

          <Example
            caption="Every field in one form"
            description="Input, combobox, date picker, number field, select, radio group, toggle group, slider, textarea, switch, and checkbox share one rhythm, and a plain submit posts them all by name."
            source={everyFieldSource}
          >
            <FormEveryField />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              {
                keys: ['Tab'],
                description:
                  'Moves through the fields and buttons in document order. Form adds nothing to it.',
              },
              {
                keys: ['Enter'],
                description:
                  'In a text field, submits through native implicit submission. In a textarea, inserts a newline.',
              },
            ]}
          />
          <p>
            Form sets <code>noValidate</code> by default, and you can override
            it. The field&rsquo;s <code>error</code> string is the one error
            channel: native constraint validation would add a second, a browser
            bubble placed by the user agent, unowned and gone on the next click.
          </p>
          <p>
            Form has no Cmd or Ctrl+Enter shortcut. A hidden keybinding with no
            visible affordance only helps people who already guess it exists,
            and Tab then Enter on the submit button already works. The result
            slot carries no live region of its own: the alert you pass announces
            itself through its role. For the states every field shares, see{' '}
            <TextLink asChild>
              <Link to="/fields">Fields</Link>
            </TextLink>
            .
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Form"
            description={
              <>
                Renders a real <code>&lt;form&gt;</code> and takes its
                attributes, so <code>onSubmit</code>, <code>action</code>,{' '}
                <code>method</code>, and <code>id</code> behave as they do on
                the element. Every field already owns its label, id linkage, and
                error message, so fields go in as plain children with no
                wrapper.
              </>
            }
            rows={[
              {
                name: 'result',
                type: 'ReactNode',
                description:
                  'Renders below the actions row, as the last child. Pass an Alert; the app picks the variant.',
              },
              {
                name: 'noValidate',
                type: 'boolean',
                default: 'true',
                description:
                  'Turns off native constraint bubbles so a field’s error is the one error channel.',
              },
            ]}
          />
          <p>
            <code>FormActions</code> takes the props of a{' '}
            <code>&lt;div&gt;</code>. It stacks its buttons full width below
            640px and lays them out in a right-aligned row above it. It is
            optional: a one-button form can put the button in directly.
            FormActions injects nothing into its children, so write{' '}
            <code>type="submit"</code> on the one button that submits and set
            its <code>loading</code> while the request runs. Button defaults to{' '}
            <code>type="button"</code>, so a Cancel beside it never posts the
            form.
          </p>
        </>
      }
      notes={
        <>
          <p>
            The rhythm is one fixed 20px step between children, on a flex
            column. It uses flex <code>gap</code> instead of sibling margins,
            because collapsing margins fight the height animations of an error
            message or the result alert. A heading dropped between two fields is
            another child and inherits the same step. The actions row sits in
            the normal flow at the same step, with no top border.
          </p>
          <p>
            Form ships no form-state binding and depends on no form-state
            library. Each field takes <code>name</code>, <code>error</code> as a
            single string, <code>disabled</code>, and its own change callback:
            native <code>onChange</code> on input and textarea,{' '}
            <code>onCheckedChange</code> on checkbox, and{' '}
            <code>onValueChange</code> on select, radio group, number field, and
            toggle group. Wire a library&rsquo;s per-field state onto those and
            it works. Reducing the library&rsquo;s error shape to the one
            string, and subscribing to its submitting flag for the
            button&rsquo;s <code>loading</code>, is app code.
          </p>
          <p>
            Form paints no background, border, or text, so it has no contrast
            obligation of its own; the fields, the buttons, and the alert each
            meet it themselves. A dialog form leaves the result slot empty: it
            closes on submit, success shows on the item that changed, and a
            server error becomes a notice whose link reopens the dialog with
            what the traveller typed.
          </p>
          <p>
            Form has no motion of its own. The error message and the result
            alert each grow their height from zero on <code>springSettle</code>,
            so the content below travels continuously, and a layout animation on
            the root would animate the same shift twice.
          </p>
        </>
      }
      related={[
        {
          to: '/components/button',
          label: 'Button',
          description: 'The submit button and its loading state.',
        },
        {
          to: '/components/alert',
          label: 'Alert',
          description: 'What you pass to the result slot.',
        },
        {
          to: '/components/dialog',
          label: 'Dialog',
          description: 'Hosts a form in a modal that closes on submit.',
        },
        {
          to: '/fields',
          label: 'Fields',
          description:
            'The label, description, error, loading, and disabled behaviour every field shares.',
        },
        {
          to: '/principles',
          label: 'Principles',
          description:
            'Where a result belongs, and why nothing auto-dismisses.',
        },
      ]}
    />
  )
}
