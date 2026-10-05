import { createFileRoute, Link } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { SliderDemo } from '@/examples/slider/demo'
import demoSource from '@/examples/slider/demo.tsx?raw'
import { SliderDisabled } from '@/examples/slider/disabled'
import disabledSource from '@/examples/slider/disabled.tsx?raw'
import { SliderInAForm } from '@/examples/slider/in-a-form'
import inAFormSource from '@/examples/slider/in-a-form.tsx?raw'
import { SliderMeaningfulSteps } from '@/examples/slider/meaningful-steps'
import meaningfulStepsSource from '@/examples/slider/meaningful-steps.tsx?raw'
import usageSource from '@/examples/slider/usage.tsx?raw'

import { TextLink } from '@/registry/ui/text-link'

export const Route = createFileRoute('/_docs/components/slider')({
  component: SliderPage,
})

function SliderPage() {
  return (
    <DocPage
      title="Slider"
      lead="A slider picks a level from a short run of steps rather than a typed number, and a description says what the current step means."
      preview={{ source: demoSource, demo: <SliderDemo /> }}
      installation="slider"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Steps that mean something"
            description="The description is your words for the current step. It sits under the track and is what a screen reader announces, so a step reads as its meaning, not its index."
            source={meaningfulStepsSource}
          >
            <SliderMeaningfulSteps />
          </Example>

          <Example
            caption="Disabled"
            description="Disabled dims the slider, its label, and its description, and takes the thumb out of the tab order. Say why in the description."
            source={disabledSource}
          >
            <SliderDisabled />
          </Example>

          <Example
            caption="In a form"
            description="Move the slider and save. The slider is controlled, name posts the value with the form, and the card shows the saved budget."
            source={inAFormSource}
          >
            <SliderInAForm />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To pick a level from a short run of steps, such as a pace or a budget band.',
          'When the steps have a meaning you can write in a sentence.',
        ],
        whenNotToUse: [
          {
            situation:
              'when the traveller knows the exact number to enter, such as a budget of $1,200. A slider makes them hunt for it.',
            alternative: {
              to: '/components/number-field',
              label: 'Number field',
            },
          },
          {
            situation:
              'for a few named options with no order, because a track implies one.',
            alternative: {
              to: '/components/toggle-group',
              label: 'Toggle group',
            },
          },
          {
            situation: 'to pick a date.',
            alternative: {
              to: '/components/date-picker',
              label: 'Date picker',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep the step count to what a reader can tell apart at a glance.',
            reason:
              'A dot marks every step, so a long run turns the track into a dotted line with no meaning.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Write a description that names the current step.',
            reason:
              'The slider has no end labels. The description is the only place that says where the thumb is.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Put the value only in the label.',
            reason:
              'The thumb reads its value text from the description, so a screen reader would announce a bare number.',
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
                  'Moves focus to the thumb. A disabled slider leaves the tab order.',
              },
              {
                keys: ['ArrowLeft', 'ArrowDown'],
                description: 'Moves one step down and stops at the minimum.',
              },
              {
                keys: ['ArrowRight', 'ArrowUp'],
                description: 'Moves one step up and stops at the maximum.',
              },
              {
                keys: ['PageDown', 'PageUp'],
                description: 'Moves ten steps down or up.',
              },
              {
                keys: ['Home', 'End'],
                description: 'Jumps to the minimum or the maximum.',
              },
            ]}
          />
          <p>
            The thumb is the <code>slider</code>. It takes its name from the
            label and its <code>aria-valuetext</code> from the description. The
            dots and the fill are hidden from assistive technology, because the
            value text already says what they show. The focus ring appears on
            keyboard focus only. <code>required</code> marks the label; a slider
            always holds a value, so there is nothing for it to block. The{' '}
            <TextLink asChild>
              <Link to="/accessibility">accessibility page</Link>
            </TextLink>{' '}
            covers the rules every component follows.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Slider"
          description="Slider is controlled: it takes a value and reports the next one. It takes no other props."
          rows={[
            {
              name: 'label',
              type: 'string',
              required: true,
              description: 'The text above the track.',
            },
            {
              name: 'value',
              type: 'number',
              required: true,
              description: 'The current step.',
            },
            {
              name: 'onValueChange',
              type: '(value: number) => void',
              required: true,
              description: 'Called with the next value as the thumb moves.',
            },
            {
              name: 'min',
              type: 'number',
              default: '0',
              description: 'The lowest value.',
            },
            {
              name: 'max',
              type: 'number',
              default: '100',
              description: 'The highest value.',
            },
            {
              name: 'step',
              type: 'number',
              default: '1',
              description: 'The distance between steps. A dot marks each one.',
            },
            {
              name: 'description',
              type: 'string',
              description:
                'What the current step means, shown under the track and announced as the value text.',
            },
            {
              name: 'required',
              type: 'boolean',
              default: 'false',
              description: 'Marks the label.',
            },
            {
              name: 'disabled',
              type: 'boolean',
              default: 'false',
              description:
                'Dims the slider and takes the thumb out of the tab order.',
            },
            {
              name: 'name',
              type: 'string',
              description: 'Posts the value under this name inside a form.',
            },
            {
              name: 'id',
              type: 'string',
              description:
                'The id of the thumb. One is generated when omitted.',
            },
            {
              name: 'className',
              type: 'string',
              description:
                'Styles the wrapper. The slider fills its container up to 28rem, so use this to narrow it further.',
            },
          ]}
        />
      }
      notes={
        <p>
          The fill&rsquo;s width transitions at <code>--motion-fast</code>, so a
          step reads as a short slide rather than a jump. The thumb follows the
          pointer and the keys directly. The wrapper grows with its container up
          to 28rem.
        </p>
      }
      related={[
        {
          to: '/components/number-field',
          label: 'Number field',
          description: 'For a number the traveller types exactly.',
        },
        {
          to: '/components/toggle-group',
          label: 'Toggle group',
          description: 'For a few named options with no order.',
        },
        {
          to: '/components/progress',
          label: 'Progress',
          description: 'A track that shows a value instead of asking for one.',
        },
        {
          to: '/fields',
          label: 'Fields',
          description: 'The label and description behaviour fields share.',
        },
      ]}
    />
  )
}
