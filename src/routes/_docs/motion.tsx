import { createFileRoute } from '@tanstack/react-router'

import { GuidelineVerdict } from '@/components/doc-page'
import { FoundationPage } from '@/components/foundation-page'
import type { TokenRow } from '@/components/foundation-page'

export const Route = createFileRoute('/_docs/motion')({
  component: MotionPage,
})

function durationSample(widthClassName: string) {
  return (
    <span
      aria-hidden
      className={`${widthClassName} bg-indicator block h-3 rounded-sm`}
    />
  )
}

function labelSample(label: string) {
  return <span className="text-foreground text-xs font-medium">{label}</span>
}

const durationRows: TokenRow[] = [
  {
    sample: durationSample('w-10'),
    token: '--motion-fast',
    value: '100ms',
    job: 'State feedback in colour and opacity: hover, press, focus, a check appearing.',
  },
  {
    sample: durationSample('w-15'),
    token: '--motion-base',
    value: '150ms',
    job: 'Morphs, enters, and exits.',
  },
]

const springRows: TokenRow[] = [
  {
    sample: labelSample('Playful'),
    token: 'springBounce',
    value: 'visual duration 150ms, bounce 0.3',
    job: 'Morphs and enters that stay inside the element’s own box: a scale, a translate, a thumb travelling, a check drawing in.',
  },
  {
    sample: labelSample('Calm'),
    token: 'springSettle',
    value: 'visual duration 150ms, bounce 0',
    job: 'Every exit, and every enter that moves its neighbours: an alert or a field error growing in, the progress fill.',
  },
]

const kindRows: TokenRow[] = [
  {
    sample: labelSample('CSS'),
    token: 'State feedback',
    value: 'CSS transitions, 100ms',
    job: 'Hover, press, focus, check. Colour and opacity only.',
  },
  {
    sample: labelSample('motion'),
    token: 'Morph',
    value: 'motion, springBounce',
    job: 'A component reshapes itself: a button taking a spinner, a switch thumb travelling.',
  },
  {
    sample: labelSample('motion'),
    token: 'Enter and exit',
    value: 'motion, springBounce in, springSettle out',
    job: 'A surface or element arriving or leaving. Anything that displaces its neighbours enters on springSettle.',
  },
  {
    sample: labelSample('CSS'),
    token: 'Continuous',
    value: 'CSS keyframes, theme animate-* utilities',
    job: 'A loop that never stops: spinner, skeleton, indeterminate progress.',
  },
]

const continuousRows: TokenRow[] = [
  {
    sample: labelSample('Loop'),
    token: 'animate-spinner',
    value: '800ms, linear',
    job: 'The spinner rotates once per cycle.',
  },
  {
    sample: labelSample('Loop'),
    token: 'animate-skeleton-pulse',
    value: '2s, ease-in-out',
    job: 'The skeleton fades between full and half opacity.',
  },
  {
    sample: labelSample('Loop'),
    token: 'animate-switch-thumb-pulse',
    value: '800ms, ease-in-out',
    job: 'A loading switch pulses its thumb at the spinner’s tempo.',
  },
  {
    sample: labelSample('Loop'),
    token: 'animate-progress-indeterminate',
    value: '2s, ease-in-out',
    job: 'The indeterminate progress segment travels the track at the skeleton’s tempo.',
  },
]

const exceptionRows: TokenRow[] = [
  {
    sample: labelSample('Loop'),
    token: 'animate-sticker-boil',
    value: '450ms step loop, three frames',
    job: 'The sticker’s hand-drawn lines jitter like a cartoon: each frame shows for 150ms, then the next takes over. It runs for as long as the sticker is on the page.',
  },
  {
    sample: labelSample('Scroll'),
    token: 'animate-sticker-pop',
    value: 'scroll timeline, from entry 10% to cover 35%',
    job: 'The sticker grows from small and tilted, overshoots slightly, and settles, at the speed the reader scrolls. It reverses on the way back.',
  },
]

function MotionPage() {
  return (
    <FoundationPage
      title="Motion"
      principle="Motion is small, springy, and quick: it confirms what you did and never makes you wait."
      introduction={
        <p>
          Every animated change looks finished in under 200ms, and movement uses
          a spring so it feels like a thing with weight. The vocabulary below is
          short on purpose. A component names a duration and a spring from it
          instead of inventing numbers, so everything in the system moves at one
          tempo.
        </p>
      }
      tokenSections={[
        {
          title: 'Durations',
          description:
            'Published as CSS variables so every animation engine shares the same numbers.',
          rows: durationRows,
        },
        {
          title: 'Springs',
          description:
            'Two presets from the motion library, exported by the motion item.',
          rows: springRows,
        },
        {
          title: 'Kinds and engines',
          description:
            'Four kinds of animation, each with one engine. State feedback, morphs, and enters and exits stay under 200ms.',
          rows: kindRows,
        },
        {
          title: 'Continuous loops',
          description:
            'Loops are exempt from the 200ms limit because they never finish. Slower than these reads as broken and faster reads as alarming.',
          rows: continuousRows,
        },
        {
          title: 'Documented exceptions',
          description:
            'The sticker is the one decoration in the system, and its two motions are allowed to run longer than 200ms.',
          rows: exceptionRows,
        },
      ]}
      sections={[
        {
          title: 'Properties and layout',
          content: (
            <p>
              Animate <code>transform</code>, <code>opacity</code>, and colour.
              Layout animation is fine through motion&rsquo;s{' '}
              <code>layout</code> prop, which turns a size change into a
              transform. A component that animates layout on its own state wraps
              itself in a <code>LayoutGroup</code> so it does not re-measure
              when an unrelated sibling changes.
            </p>
          ),
        },
      ]}
      rules={[
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Let movement that stays inside an element’s own box bounce a little, such as a check mark or a switch thumb.',
          reason:
            'A little overshoot inside its own bounds reads as playful and disturbs nothing around it.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Settle without a bounce for exits and for anything whose size pushes its neighbours.',
          reason:
            'A bounce on a height change makes the content below overshoot and snap back, which looks like a glitch. A leaving element should not wobble.',
        },
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Change colour and opacity with a short fade.',
          reason:
            'A colour has nowhere to overshoot to, so a quick fade is all the feedback it needs.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Bounce a loop that never stops, such as a spinner or a loading pulse.',
          reason:
            'A bounce is for movement that comes to rest. A loop keeps one steady rhythm so it reads as waiting, not as an event.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Let a progress fill overshoot its value.',
          reason: 'A fill that overshoots misreports how much work is done.',
        },
      ]}
      notes={
        <>
          <p>
            <code>motionDurations</code>, <code>springBounce</code>, and{' '}
            <code>springSettle</code> live in the <code>motion</code> registry
            item at <code>lib/motion.ts</code>, and components that animate with
            motion depend on it. The theme item carries the duration variables
            and every <code>animate-*</code> keyframe, so a consumer who adds a
            component gets its animation with the theme.
          </p>
          <p>
            Dialog, drawer, popover, and overlay enters and exits are CSS
            keyframes on a spring-shaped easing curve: 250ms in and 350ms out,
            tuned to read as the spring presets do. The visible movement is over
            inside 200ms; the remaining time is the curve settling by amounts
            too small to see. They are the floating layer, driven by
            Radix&rsquo;s presence state.
          </p>
          <p>
            <code>sticker-pop</code> runs on a scroll timeline, so it has no
            duration to bound, and motion&rsquo;s springs cannot follow a scroll
            position. A browser without scroll-driven animations runs it with a
            zero duration and holds the sticker at rest. The <code>popIn</code>{' '}
            prop turns it off.
          </p>
        </>
      }
      related={[
        {
          to: '/principles',
          label: 'Principles',
          description: 'The mood that small, springy motion serves.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'A morph through its loading state.',
        },
        {
          to: '/components/sticker',
          label: 'Sticker',
          description: 'The one place motion runs long, on purpose.',
        },
      ]}
    />
  )
}
