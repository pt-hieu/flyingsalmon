import type { StickerLayer } from './types'

export function withContentKeys<Item>(
  items: readonly Item[],
  contentOf: (item: Item) => string,
) {
  const occurrencesByContent = new Map<string, number>()

  return items.map((item) => {
    const content = contentOf(item)
    const occurrence = occurrencesByContent.get(content) ?? 0
    occurrencesByContent.set(content, occurrence + 1)

    return { key: `${occurrence} ${content}`, item }
  })
}

export function layerContent({ role, paint, d: pathData }: StickerLayer) {
  return `${role} ${paint} ${pathData}`
}

export function frameContent(layers: readonly StickerLayer[]) {
  return layers.map(layerContent).join(' ')
}
