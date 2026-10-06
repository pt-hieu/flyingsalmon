import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { TextLinkDemo } from '@/examples/text-link/demo'
import demoSource from '@/examples/text-link/demo.tsx?raw'
import { TextLinkExternalLink } from '@/examples/text-link/external-link'
import externalLinkSource from '@/examples/text-link/external-link.tsx?raw'
import { TextLinkInsideMutedText } from '@/examples/text-link/inside-muted-text'
import insideMutedTextSource from '@/examples/text-link/inside-muted-text.tsx?raw'
import { TextLinkOnACard } from '@/examples/text-link/on-a-card'
import onACardSource from '@/examples/text-link/on-a-card.tsx?raw'
import { TextLinkRouterLink } from '@/examples/text-link/router-link'
import routerLinkSource from '@/examples/text-link/router-link.tsx?raw'
import usageSource from '@/examples/text-link/usage.tsx?raw'
import guidelines from '@/registry/ui/text-link/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/text-link')({
  component: TextLinkPage,
})

function TextLinkPage() {
  return (
    <DocPage
      title="Text link"
      lead="An anchor for a sentence or a line of UI copy that takes its size and weight from the text around it and keeps its underline."
      preview={{ source: demoSource, demo: <TextLinkDemo /> }}
      installation="text-link"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Inside muted text"
            description="In an alert, a field description, or any muted block, the link keeps the foreground colour while its surroundings stay muted, so it reads one step stronger than the copy around it."
            source={insideMutedTextSource}
          >
            <TextLinkInsideMutedText />
          </Example>

          <Example
            caption="External link"
            description="Whether a link opens a new tab is your app's policy, so you pass target and rel yourself and place the icon as a child. The icon scales with the sentence."
            source={externalLinkSource}
          >
            <TextLinkExternalLink />
          </Example>

          <Example
            caption="Router link"
            description="asChild hands the styling to the element you pass, so your router renders the anchor and client-side navigation keeps working."
            source={routerLinkSource}
          >
            <TextLinkRouterLink />
          </Example>

          <Example
            caption="On a card"
            description="Tab to the link. The focus ring's gap paints the page colour, so on a card pass focus-visible:ring-offset-card and the gap matches the surface."
            source={onACardSource}
          >
            <TextLinkOnACard />
          </Example>
        </>
      }
      guidelines={guidelines}
      accessibility={
        <>
          <KeyboardTable
            rows={[
              { keys: ['Tab'], description: 'Moves focus to the link.' },
              { keys: ['Enter'], description: 'Follows the link.' },
            ]}
          />
          <p>
            It is a native anchor, so it keeps the browser&rsquo;s behaviour for
            context menus and new tabs. The underline never leaves, so the link
            is never told apart by colour alone. Tab to a link that wraps across
            lines and the focus ring closes around each line fragment
            separately.
          </p>
        </>
      }
      api={
        <PropsTable
          component="TextLink"
          description={
            <>
              Also takes every <code>&lt;a&gt;</code> attribute. There is no{' '}
              <code>external</code> prop, no <code>size</code>, and no{' '}
              <code>variant</code>.
            </>
          }
          rows={[
            {
              name: 'href',
              type: 'string',
              description:
                'Where the link goes. Required unless asChild passes an element that supplies its own: an anchor that navigates nowhere is an action, and an action is a button.',
            },
            {
              name: 'asChild',
              type: 'boolean',
              default: 'false',
              description:
                'Renders its single child, such as your router’s link, with the text link styling.',
            },
          ]}
        />
      }
      notes={
        <>
          <p>
            The link is <code>display: inline</code>. The text is{' '}
            <code>--foreground</code> in every state. The underline sits at{' '}
            <code>underline-offset-4</code> and is 1px <code>--indicator</code>{' '}
            at rest and 1.5px orange-700 on hover and press, thickening downward
            from the offset so the line box never moves. At rest it measures
            3.38:1 on the page and 3.59:1 on white, clearing the 3:1 bar for
            non-text marks. Thickness carries the change where colour alone
            reads faint, because a 1px dark stroke on a light ground loses to
            antialiasing.
          </p>
          <p>
            Rest, hover, press, and focus are the whole set. There is no visited
            state: browsers restrict <code>:visited</code> to colour, and
            &ldquo;visited&rdquo; means nothing for a router link. Only the
            underline moves, its colour and thickness together at{' '}
            <code>--motion-fast</code>, and it never draws in because it is
            never absent.
          </p>
          <p>
            The focus ring stands 2px off the text, and that gap paints{' '}
            <code>--background</code>. <code>box-decoration-clone</code> closes
            the ring around each line fragment of a wrapped link. A child{' '}
            <code>svg</code> sits inline at <code>1em</code>, so an icon grows
            and shrinks with the sentence instead of holding a fixed size. The
            component is named <code>TextLink</code> rather than{' '}
            <code>Link</code> because the router case nests the two.
          </p>
        </>
      }
      related={[
        {
          to: '/components/button',
          label: 'Button',
          description: 'The control for an action, where a link navigates.',
        },
        {
          to: '/components/breadcrumb',
          label: 'Breadcrumb',
          description: 'Links back up the hierarchy.',
        },
        {
          to: '/components/alert',
          label: 'Alert',
          description: 'A common home for a link in muted copy.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'Focus and contrast across the registry.',
        },
      ]}
    />
  )
}
