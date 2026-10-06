import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { componentCatalog } from '@/components/component-catalog'
import { renderWithRouter } from '@/test/render-with-router'

import { Guidelines } from '../guidelines'
import { parseGuidelines } from '../parse-guidelines'
import { GuidelineVerdict } from '../types'

const switchGuidelines = `# Switch guidelines

Design guidelines for the flyingsalmon Switch component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with \`shadcn add @flyingsalmon/<name>\`.

## When to use

- For a setting that takes effect the moment it changes.
- To turn a trip’s sharing on or off.

## When not to use

- Use [Checkbox](https://flyingsalmon.superbrian.dev/components/checkbox) for a choice that waits for a submit.
- Use [the feedback rule](https://flyingsalmon.superbrian.dev/principles) when the result needs a home.

## Do and don't

- **Do:** Label the switch with the setting, such as "Share with travellers".
  **Why:** The label says what is on when the thumb is on the right.
- **Don't:** Ask for a save after flipping it.
  **Why:** A switch acts at once.
`

const dialogGuidelines = `# Dialog guidelines

Design guidelines for the flyingsalmon Dialog component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with \`shadcn add @flyingsalmon/<name>\`.

## When to use

- To confirm a removal, with \`DialogClose\` on Cancel.

## When not to use

- Use [Drawer](https://flyingsalmon.superbrian.dev/components/drawer) for detail that sits beside the [list](https://flyingsalmon.superbrian.dev/components/table).

## Do and don't

- **Do:** Name the action, never \`OK\`, in a *short* [draft] label.
  **Why:** The label is the last thing read.
`

const shippedGuidelinesByPath = import.meta.glob<string>(
  '/src/registry/ui/*/guidelines.md',
  { query: '?raw', import: 'default', eager: true },
)

const docRoutes = new Set(
  Object.keys(import.meta.glob('/src/routes/_docs/**/*.tsx'))
    .map((path) => path.replace('/src/routes/_docs', '').replace(/\.tsx$/, ''))
    .filter((route) => route !== '/route')
    .map((route) => route.replace(/\/index$/, '/')),
)

const shippedGuidelines = Object.entries(shippedGuidelinesByPath).map(
  ([path, markdown]) => {
    const folderName = path.split('/').at(-2)
    const catalogComponent = componentCatalog.find(
      (component) => component.to === `/components/${folderName}`,
    )
    return { folderName, title: catalogComponent?.label, markdown }
  },
)

async function renderGuidelines(markdown: string, title: string) {
  await renderWithRouter(<Guidelines {...parseGuidelines(markdown, title)} />)
}

function getListItems(sectionHeading: string) {
  const section = screen.getByRole('heading', {
    name: sectionHeading,
  }).parentElement
  if (!section) {
    throw new Error(`no section for "${sectionHeading}"`)
  }
  return within(section).getAllByRole('listitem')
}

describe('parseGuidelines', () => {
  it('reads each section of a guidelines file in order', () => {
    expect(parseGuidelines(switchGuidelines, 'Switch')).toEqual({
      whenToUse: [
        'For a setting that takes effect the moment it changes.',
        'To turn a trip’s sharing on or off.',
      ],
      whenNotToUse: [
        {
          situation: 'for a choice that waits for a submit.',
          alternative: { to: '/components/checkbox', label: 'Checkbox' },
        },
        {
          situation: 'when the result needs a home.',
          alternative: { to: '/principles', label: 'the feedback rule' },
        },
      ],
      rules: [
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Label the switch with the setting, such as "Share with travellers".',
          reason: 'The label says what is on when the thumb is on the right.',
        },
        {
          verdict: GuidelineVerdict.Dont,
          rule: 'Ask for a save after flipping it.',
          reason: 'A switch acts at once.',
        },
      ],
    })
  })

  it('renders inline code as code', async () => {
    await renderGuidelines(dialogGuidelines, 'Dialog')

    const [situation] = getListItems('When to use')
    expect(situation).toHaveTextContent(
      'To confirm a removal, with DialogClose on Cancel.',
    )
    expect(within(situation).getByText('DialogClose').tagName).toBe('CODE')
  })

  it('renders a link to a site page as an internal link', async () => {
    await renderGuidelines(dialogGuidelines, 'Dialog')

    const [alternative] = getListItems('When not to use')
    expect(alternative).toHaveTextContent(
      'Use Drawer for detail that sits beside the list.',
    )
    expect(
      within(alternative).getByRole('link', { name: 'list' }),
    ).toHaveAttribute('href', '/components/table')
  })

  it('keeps any other Markdown as literal text', async () => {
    await renderGuidelines(dialogGuidelines, 'Dialog')

    const [rule] = getListItems('Do and don’t')
    expect(rule).toHaveTextContent(
      'Name the action, never OK, in a *short* [draft] label.',
    )
  })

  it('joins a list item wrapped across indented lines', () => {
    const markdown = `# Tabs guidelines

Design guidelines for the flyingsalmon Tabs component. An alternative linked to https://flyingsalmon.superbrian.dev/components/<name> installs with \`shadcn add @flyingsalmon/<name>\`.

## When to use

- To switch between views
  of one trip.

## When not to use

- Use [Stepper](https://flyingsalmon.superbrian.dev/components/stepper)
  for stages done in order.

## Do and don't

- **Do:** Keep the labels
  short.
  **Why:** Long labels
  wrap.
`

    expect(parseGuidelines(markdown, 'Tabs')).toEqual({
      whenToUse: ['To switch between views of one trip.'],
      whenNotToUse: [
        {
          situation: 'for stages done in order.',
          alternative: { to: '/components/stepper', label: 'Stepper' },
        },
      ],
      rules: [
        {
          verdict: GuidelineVerdict.Do,
          rule: 'Keep the labels short.',
          reason: 'Long labels wrap.',
        },
      ],
    })
  })

  it.each([
    {
      problem: 'a title for another component',
      markdown: switchGuidelines.replace('# Switch', '# Checkbox'),
    },
    {
      problem: 'a missing lead line',
      markdown: switchGuidelines.replace(/Design guidelines[^\n]*\n/, ''),
    },
    {
      problem: 'a lead line for another component',
      markdown: switchGuidelines.replace(
        'flyingsalmon Switch component',
        'flyingsalmon Checkbox component',
      ),
    },
    {
      problem: 'a missing section',
      markdown: switchGuidelines.replace(/## When not to use[^#]*/, ''),
    },
    {
      problem: 'sections out of order',
      markdown: switchGuidelines
        .replace('## When to use', '## Placeholder')
        .replace('## When not to use', '## When to use')
        .replace('## Placeholder', '## When not to use'),
    },
    {
      problem: 'an empty section',
      markdown: switchGuidelines.replace(/(## When to use\n)[^#]*/, '$1\n'),
    },
    {
      problem: 'prose outside a list',
      markdown: switchGuidelines.replace(
        '## When to use\n',
        '## When to use\n\nSwitches are for settings.\n',
      ),
    },
    {
      problem: 'an alternative with no link',
      markdown: switchGuidelines.replace(
        '[Checkbox](https://flyingsalmon.superbrian.dev/components/checkbox)',
        'Checkbox',
      ),
    },
    {
      problem: 'a link off the docs site',
      markdown: switchGuidelines.replace(
        'https://flyingsalmon.superbrian.dev/components/checkbox',
        'https://example.com/checkbox',
      ),
    },
    {
      problem: 'a rule with no reason',
      markdown: switchGuidelines.replace(
        '\n  **Why:** A switch acts at once.',
        '',
      ),
    },
    {
      problem: 'a rule with no verdict',
      markdown: switchGuidelines.replace('**Do:** ', ''),
    },
    {
      problem: 'unclosed inline code',
      markdown: switchGuidelines.replace('A switch acts', 'A `switch acts'),
    },
  ])('fails loudly, naming the component, on $problem', ({ markdown }) => {
    expect(() => parseGuidelines(markdown, 'Switch')).toThrow(
      /^Switch guidelines\.md: /,
    )
  })
})

describe('shipped guidelines files', () => {
  it('ships one for every catalog component', () => {
    expect(shippedGuidelines.map(({ title }) => title)).not.toContain(undefined)
    expect(shippedGuidelines).toHaveLength(componentCatalog.length)
  })

  it.each(shippedGuidelines)(
    '$folderName parses and links only to pages the site has',
    async ({ markdown, title }) => {
      await renderGuidelines(markdown, title ?? '')

      const deadLinkPaths = screen
        .getAllByRole('link')
        .map((link) => link.getAttribute('href') ?? '')
        .filter((path) => !docRoutes.has(path))
      expect(deadLinkPaths).toEqual([])
    },
  )
})
