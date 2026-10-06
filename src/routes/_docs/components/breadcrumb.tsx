import { createFileRoute } from '@tanstack/react-router'

import {
  DocPage,
  Example,
  KeyboardTable,
  PropsTable,
} from '@/components/doc-page'
import { BreadcrumbCollapsed } from '@/examples/breadcrumb/collapsed'
import collapsedSource from '@/examples/breadcrumb/collapsed.tsx?raw'
import { BreadcrumbDemo } from '@/examples/breadcrumb/demo'
import demoSource from '@/examples/breadcrumb/demo.tsx?raw'
import { BreadcrumbLongPageTitle } from '@/examples/breadcrumb/long-page-title'
import longPageTitleSource from '@/examples/breadcrumb/long-page-title.tsx?raw'
import { BreadcrumbRouterLinks } from '@/examples/breadcrumb/router-links'
import routerLinksSource from '@/examples/breadcrumb/router-links.tsx?raw'
import usageSource from '@/examples/breadcrumb/usage.tsx?raw'
import guidelines from '@/registry/ui/breadcrumb/guidelines.md?raw'

export const Route = createFileRoute('/_docs/components/breadcrumb')({
  component: BreadcrumbPage,
})

function BreadcrumbPage() {
  return (
    <DocPage
      title="Breadcrumb"
      lead="A single-line trail of the current page's ancestors, each a link back up, ending in the current page as plain text."
      preview={{ source: demoSource, demo: <BreadcrumbDemo /> }}
      installation="breadcrumb"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Collapsing a long trail"
            description="From four levels, keep the root, the parent, and the current page, and put everything between the root and the parent behind the ellipsis. Open the menu: the hidden levels run from the highest ancestor down."
            source={collapsedSource}
          >
            <BreadcrumbCollapsed />
          </Example>

          <Example
            caption="A long page title"
            description="The current page truncates and its title attribute carries the full text. The links never truncate, so the ancestors stay readable."
            source={longPageTitleSource}
          >
            <BreadcrumbLongPageTitle />
          </Example>

          <Example
            caption="Router links"
            description="A link item takes asChild and renders your router's link with the breadcrumb's styling, so the trail navigates without a page reload."
            source={routerLinksSource}
          >
            <BreadcrumbRouterLinks />
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
                  'Moves through the ancestor links and the ellipsis trigger. The current page takes no focus.',
              },
              {
                keys: ['Enter', 'Space', 'ArrowDown'],
                description:
                  'On the ellipsis trigger, opens the menu of hidden levels.',
              },
              {
                keys: ['ArrowDown', 'ArrowUp'],
                description:
                  'Moves through the hidden levels in the open menu.',
              },
              {
                keys: ['Escape'],
                description:
                  'Closes the menu and returns focus to the ellipsis trigger.',
              },
            ]}
          />
          <p>
            The root is a <code>nav</code> named &ldquo;Breadcrumb&rdquo; that
            holds an ordered list; <code>aria-label</code> overrides the name.
            Separators are presentational and hidden, so a screen reader hears
            the levels and nothing between them. The current page carries{' '}
            <code>aria-current=&quot;page&quot;</code> and no link role, so
            nothing in the trail announces as a link that goes nowhere. The
            ellipsis trigger is named &ldquo;Show hidden levels&rdquo;, and its{' '}
            <code>aria-label</code> overrides that.
          </p>
        </>
      }
      api={
        <>
          <PropsTable
            component="Breadcrumb"
            description={
              <>
                Renders the <code>nav</code> and the <code>ol</code> inside it.
                Other props go to the <code>ol</code>.
              </>
            }
            rows={[
              {
                name: 'aria-label',
                type: 'string',
                default: '"Breadcrumb"',
                description: 'The name of the nav landmark.',
              },
            ]}
          />
          <PropsTable
            component="BreadcrumbItem"
            description={
              <>
                One item, three shapes. <code>link</code> and{' '}
                <code>active</code> are mutually exclusive and the types enforce
                it. With neither, the item is a bare list item.
              </>
            }
            rows={[
              {
                name: 'link',
                type: 'true',
                description:
                  'Makes the item an ancestor and renders an anchor. Takes every anchor attribute, such as href.',
              },
              {
                name: 'asChild',
                type: 'boolean',
                default: 'false',
                description:
                  'With link, renders your router link with the breadcrumb styling on it.',
              },
              {
                name: 'active',
                type: 'true',
                description:
                  'Makes the item the current page: plain text with aria-current="page".',
              },
            ]}
          />
          <PropsTable
            component="BreadcrumbEllipsis"
            description={
              <>
                Owns the dropdown menu, its trigger, and its content. Place it
                in a <code>BreadcrumbItem</code> with neither <code>link</code>{' '}
                nor <code>active</code>. The trail measures nothing, so you
                decide which levels move into it.
              </>
            }
            rows={[
              {
                name: 'children',
                type: 'ReactNode',
                required: true,
                description:
                  'The hidden levels as BreadcrumbEllipsisMenuItem elements, highest ancestor first.',
              },
              {
                name: 'aria-label',
                type: 'string',
                default: '"Show hidden levels"',
                description: 'The name of the trigger button.',
              },
            ]}
          />
          <p>
            <code>BreadcrumbEllipsisMenuItem</code> takes the dropdown menu item
            props, including <code>asChild</code> for a link.{' '}
            <code>BreadcrumbSeparator</code> takes only list item props and
            holds a fixed chevron. The trail inserts no separators: place one
            between each pair of items yourself, so a conditional or collapsed
            level never leaves a stray chevron.
          </p>
        </>
      }
      notes={
        <>
          <p>
            There are no variants and no sizes. The trail sits above the page
            title at <code>text-sm</code>.
          </p>
          <p>
            The current page caps at 20 characters and shrinks below that cap
            when the row runs out of room; override the cap with{' '}
            <code>className</code>. The list clips nothing, so a trail wider
            than its container overflows in view, which is the signal to
            collapse a level and the reason a focus ring is never cut off.
          </p>
          <p>
            Links and the ellipsis trigger sit on{' '}
            <code>--muted-foreground</code> and step to{' '}
            <code>--foreground</code> on hover and while pressed, with no
            underline: position in the trail and the chevrons already say these
            are links, and orange stays reserved for the brand and indicators.
            The current page is <code>--foreground</code> at normal weight.
            There is no disabled state. The colour change on{' '}
            <code>--motion-fast</code> is the only motion; the chevrons do not
            move and the ellipsis menu opens on the dropdown menu&rsquo;s own
            keyframes.
          </p>
          <p>
            Every focus ring stands 5px off the text inside the row&rsquo;s 6px
            gap, clear of the chevrons on either side. Links and chevrons
            measure 7.01:1 on the page background; hover and the current page
            are <code>--foreground</code>.
          </p>
        </>
      }
      related={[
        {
          to: '/components/sidebar',
          label: 'Sidebar',
          description: 'Moves between the sections of the app.',
        },
        {
          to: '/components/page-header',
          label: 'Page header',
          description: 'The title the trail sits above.',
        },
        {
          to: '/components/dropdown-menu',
          label: 'Dropdown menu',
          description: 'The menu behind the ellipsis.',
        },
        {
          to: '/accessibility',
          label: 'Accessibility',
          description: 'Focus, keyboard, and contrast across the registry.',
        },
      ]}
    />
  )
}
