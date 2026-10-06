import { createElement, Fragment } from 'react'

import { DocTextLink } from './doc-text-link'
import { GuidelineVerdict } from './types'
import type {
  AlternativeComponent,
  DocRoute,
  GuidelineRule,
  GuidelinesContent,
} from './types'

const siteOrigin = 'https://flyingsalmon.superbrian.dev'

const leadLine = (componentName: string) =>
  `Design guidelines for the flyingsalmon ${componentName} component. An alternative linked to ${siteOrigin}/components/<name> installs with \`shadcn add @flyingsalmon/<name>\`.`

const sectionHeadings = ['When to use', 'When not to use', "Do and don't"]

const verdictByPrefix = [
  { prefix: '**Do:** ', verdict: GuidelineVerdict.Do },
  { prefix: "**Don't:** ", verdict: GuidelineVerdict.Dont },
]

const reasonSeparator = ' **Why:** '

const alternativePattern = /^Use \[([^\]]+)\]\(([^)\s]+)\) (.+)$/
const codeSpanPattern = /(`[^`]+`)/

type Fail = (problem: string) => never

export function parseGuidelines(
  markdown: string,
  componentName: string,
): GuidelinesContent {
  const fail: Fail = (problem) => {
    throw new Error(`${componentName} guidelines.md: ${problem}`)
  }

  const [title, lead, ...lines] = markdown
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line !== '')
  const expectedTitle = `# ${componentName} guidelines`
  if (title !== expectedTitle) {
    fail(`expected the first line to be "${expectedTitle}"`)
  }

  const expectedLead = leadLine(componentName)
  if (lead !== expectedLead) {
    fail(`expected the line after the title to be "${expectedLead}"`)
  }

  const [whenToUse, whenNotToUse, rules] = readSections(lines, fail)

  return {
    whenToUse: whenToUse.map((item) => parseInline(item, fail)),
    whenNotToUse: whenNotToUse.map((item) => parseAlternative(item, fail)),
    rules: rules.map((item) => parseRule(item, fail)),
  }
}

function readSections(lines: string[], fail: Fail) {
  const sections: string[][] = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const heading = line.slice(3)
      if (heading !== sectionHeadings[sections.length]) {
        const expectedHeadings = sectionHeadings
          .map((sectionHeading) => '"## ' + sectionHeading + '"')
          .join(', ')
        fail(
          `expected the sections ${expectedHeadings} in that order, found "${line}"`,
        )
      }
      sections.push([])
      continue
    }

    const items = sections.at(-1)
    if (!items) {
      fail(`expected "## ${sectionHeadings[0]}" before "${line}"`)
    }

    if (line.startsWith('- ')) {
      items.push(line.slice(2))
    } else if (line.startsWith('  ') && items.length > 0) {
      items[items.length - 1] += ` ${line.trim()}`
    } else {
      fail(`expected a list item, found "${line}"`)
    }
  }

  sectionHeadings.forEach((heading, index) => {
    if (!sections[index]?.length) {
      fail(`"## ${heading}" needs at least one list item`)
    }
  })

  return sections
}

function parseAlternative(item: string, fail: Fail): AlternativeComponent {
  const match = alternativePattern.exec(item)
  if (!match) {
    fail(
      `expected "Use [Component](${siteOrigin}/components/<name>) <situation>", found "${item}"`,
    )
  }

  const [, label, href, situation] = match

  return {
    situation: parseInline(situation, fail),
    alternative: { to: toDocRoute(href, fail), label },
  }
}

function parseRule(item: string, fail: Fail): GuidelineRule {
  const verdictPrefix = verdictByPrefix.find(({ prefix }) =>
    item.startsWith(prefix),
  )
  const separatorIndex = item.indexOf(reasonSeparator)
  if (!verdictPrefix || separatorIndex === -1) {
    fail(
      `expected "**Do:** <rule>" or "**Don't:** <rule>" followed by "**Why:** <reason>", found "${item}"`,
    )
  }

  return {
    verdict: verdictPrefix.verdict,
    rule: parseInline(
      item.slice(verdictPrefix.prefix.length, separatorIndex),
      fail,
    ),
    reason: parseInline(
      item.slice(separatorIndex + reasonSeparator.length),
      fail,
    ),
  }
}

function parseInline(text: string, fail: Fail): React.ReactNode {
  const parts: React.ReactNode[] = []

  text.split(codeSpanPattern).forEach((segment, index) => {
    if (index % 2 === 1) {
      parts.push(<code>{segment.slice(1, -1)}</code>)
      return
    }

    if (segment.includes('`')) {
      fail(`unclosed inline code in "${text}"`)
    }
    parts.push(...parseLinks(segment, fail))
  })

  const nonEmptyParts = parts.filter((part) => part !== '')
  if (nonEmptyParts.length === 1 && typeof nonEmptyParts[0] === 'string') {
    return nonEmptyParts[0]
  }

  return createElement(Fragment, null, ...nonEmptyParts)
}

function parseLinks(text: string, fail: Fail) {
  const parts: React.ReactNode[] = []
  let remaining = text
  let labelStart = remaining.indexOf('[')

  while (labelStart !== -1) {
    const hrefStart = remaining.indexOf('](', labelStart)
    const hrefEnd = hrefStart === -1 ? -1 : remaining.indexOf(')', hrefStart)
    if (hrefEnd === -1) {
      break
    }

    const label = remaining.slice(labelStart + 1, hrefStart)
    const href = remaining.slice(hrefStart + 2, hrefEnd)
    parts.push(remaining.slice(0, labelStart))
    parts.push(<DocTextLink to={toDocRoute(href, fail)}>{label}</DocTextLink>)

    remaining = remaining.slice(hrefEnd + 1)
    labelStart = remaining.indexOf('[')
  }
  parts.push(remaining)

  return parts
}

function toDocRoute(href: string, fail: Fail) {
  if (!href.startsWith(`${siteOrigin}/`)) {
    fail(`expected a link to a page on ${siteOrigin}, found "${href}"`)
  }

  return href.slice(siteOrigin.length) as DocRoute
}
