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
