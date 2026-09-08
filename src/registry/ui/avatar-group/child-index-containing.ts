export function childIndexContaining(parent: Element, node: Node | null) {
  if (!node) return null

  const childIndex = Array.from(parent.children).findIndex((child) =>
    child.contains(node),
  )

  return childIndex === -1 ? null : childIndex
}
