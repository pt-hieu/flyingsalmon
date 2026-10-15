import { isValidElement } from 'react'

const consumerImportPrefixes = [
  { registryPrefix: '@/registry/ui/', consumerPrefix: '@/components/ui/' },
  { registryPrefix: '@/registry/lib/', consumerPrefix: '@/lib/' },
]

export function toConsumerSource(source: string) {
  const consumerSource = consumerImportPrefixes.reduce(
    (rewrittenSource, { registryPrefix, consumerPrefix }) =>
      rewrittenSource.replaceAll(`'${registryPrefix}`, `'${consumerPrefix}`),
    source,
  )

  return consumerSource.trimEnd()
}

export function toAnchorId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function toTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)

  if (Array.isArray(node)) return node.map(toTextContent).join('')

  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    return toTextContent(node.props.children)
  }

  return ''
}
