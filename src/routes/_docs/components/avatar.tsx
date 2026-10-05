import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import { AvatarClickable } from '@/examples/avatar/clickable'
import clickableSource from '@/examples/avatar/clickable.tsx?raw'
import { AvatarColors } from '@/examples/avatar/colors'
import colorsSource from '@/examples/avatar/colors.tsx?raw'
import { AvatarDemo } from '@/examples/avatar/demo'
import demoSource from '@/examples/avatar/demo.tsx?raw'
import { AvatarFallbacks } from '@/examples/avatar/fallbacks'
import fallbacksSource from '@/examples/avatar/fallbacks.tsx?raw'
import { AvatarNameBesideAvatar } from '@/examples/avatar/name-beside-avatar'
import nameBesideAvatarSource from '@/examples/avatar/name-beside-avatar.tsx?raw'
import { AvatarSizes } from '@/examples/avatar/sizes'
import sizesSource from '@/examples/avatar/sizes.tsx?raw'
import usageSource from '@/examples/avatar/usage.tsx?raw'

export const Route = createFileRoute('/_docs/components/avatar')({
  component: AvatarPage,
})

function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      lead="An avatar is the identity mark for one person: a photo when there is one, initials when there is not."
      preview={{ source: demoSource, demo: <AvatarDemo /> }}
      installation="avatar"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Sizes"
            description="Default sits in a toolbar or a menu; small fits a dense row such as a comment list or a table cell."
            source={sizesSource}
          >
            <AvatarSizes />
          </Example>

          <Example
            caption="Fallback chain"
            description="From left: a photo, a photo that failed to load, initials from a long name, initials from a one-word name, and a plain circle when there is no name. The avatar keeps its box while an image loads, so a row never shifts."
            source={fallbacksSource}
          >
            <AvatarFallbacks />
          </Example>

          <Example
            caption="Colours"
            description="Pick the colour from a stable key such as a traveller's id, so the same person keeps the same colour everywhere. With no colour the circle is neutral."
            source={colorsSource}
          >
            <AvatarColors />
          </Example>

          <Example
            caption="Name beside the avatar"
            description='Pass alt="" when the name is already written next to the avatar. The avatar leaves the accessibility tree and a screen reader reads the name once.'
            source={nameBesideAvatarSource}
          >
            <AvatarNameBesideAvatar />
          </Example>

          <Example
            caption="Inside a button"
            description="An avatar never takes focus, so a click target wraps it. The button owns the focus ring and the keyboard path."
            source={clickableSource}
          >
            <AvatarClickable />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To mark one person: the signed-in traveller in the sidebar, an author on a comment, an assignee on a row.',
          'Beside the person’s name, or alone when the name appears elsewhere on the screen.',
        ],
        whenNotToUse: [
          {
            situation:
              'to show several people as one cluster, because it overlaps the faces and folds the rest into a count.',
            alternative: {
              to: '/components/avatar-group',
              label: 'Avatar group',
            },
          },
          {
            situation:
              'for a status or a count, because an avatar is a person and never reads as a state.',
            alternative: { to: '/components/badge', label: 'Badge' },
          },
          {
            situation:
              'when a click must do something, by wrapping the avatar rather than using it bare.',
            alternative: { to: '/components/button', label: 'Button' },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: (
              <>
                Pass <code>name</code> even when you pass a photo.
              </>
            ),
            reason:
              'The name feeds the alt text and the initials fallback, so a failed image still identifies the person.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Derive the colour from a stable key such as a user id.',
            reason:
              'A person whose colour changes between pages reads as a different person.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Make the avatar itself clickable.',
            reason:
              'It has no focus ring and no tab stop. Wrap it in a button or a link so the wrapper owns both.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Use an orange or a status colour for a person.',
            reason:
              'Orange is the brand and the status hues report state, so the six group colours leave them out and an avatar never reads as an action or a warning.',
          },
        ],
      }}
      accessibility={
        <>
          <p>
            The avatar takes no focus and sits in no tab order. A photo uses{' '}
            <code>alt</code> as its alt text; the initials fallback carries{' '}
            <code>role=&quot;img&quot;</code> with the same label, so a screen
            reader names the person either way. <code>alt</code> defaults to{' '}
            <code>name</code>. Pass <code>alt=&quot;&quot;</code> when the name
            is written beside the avatar, and the avatar then drops out of the
            accessibility tree.
          </p>
          <p>
            Contrast on the six colours and the neutral circle passes WCAG AA.
          </p>
        </>
      }
      api={
        <PropsTable
          component="Avatar"
          description={
            <>
              Also takes every <code>&lt;span&gt;</code> attribute except{' '}
              <code>color</code>.
            </>
          }
          rows={[
            {
              name: 'src',
              type: 'string',
              description:
                'The image URL. The image shows once it loads; until then, and if it fails, the avatar shows the fallback.',
            },
            {
              name: 'name',
              type: 'string',
              description:
                'The person’s name. Feeds the default alt text and the initials: the first letters of the first and last words, one letter for a one-word name.',
            },
            {
              name: 'alt',
              type: 'string',
              default: 'name',
              description:
                'The accessible name. Pass an empty string when the name sits beside the avatar as text.',
            },
            {
              name: 'color',
              type: 'AvatarColor',
              description:
                'Sky, Pink, Teal, Fuchsia, Cyan, or Blue. Colours the fallback circle only; with no colour the circle is neutral.',
            },
            {
              name: 'size',
              type: 'AvatarSize',
              default: 'AvatarSize.Default',
              description: 'Default or Small.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            Default is 32px with 12px initials; small is 24px with 10px
            initials. The image does not fade in: it swaps in at once, because
            an identity mark that fades reads as a change of person. The avatar
            has no motion.
          </p>
          <p>
            Initials on a group colour are neutral-950, and the neutral circle
            takes the page foreground on neutral-200. Every pair passes WCAG AA.
            White initials fail on the step-400 hues and are not used.
          </p>
        </>
      }
      related={[
        {
          to: '/components/avatar-group',
          label: 'Avatar group',
          description:
            'Overlaps several avatars and folds the rest into a count.',
        },
        {
          to: '/components/button',
          label: 'Button',
          description: 'The wrapper that makes an avatar clickable.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'The marker for a status or a count.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'How the registry measures contrast and keyboard paths.',
        },
        {
          to: '/colors',
          label: 'Colours',
          description: 'The six group colours an avatar draws from.',
        },
      ]}
    />
  )
}
