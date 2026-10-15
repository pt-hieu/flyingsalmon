export function scrollFullyIntoView(container: HTMLElement, item: Element) {
  const containerBounds = container.getBoundingClientRect()
  const itemBounds = item.getBoundingClientRect()

  if (itemBounds.top < containerBounds.top) {
    container.scrollTop -= containerBounds.top - itemBounds.top
  } else if (itemBounds.bottom > containerBounds.bottom) {
    container.scrollTop += itemBounds.bottom - containerBounds.bottom
  }

  if (itemBounds.left < containerBounds.left) {
    container.scrollLeft -= containerBounds.left - itemBounds.left
  } else if (itemBounds.right > containerBounds.right) {
    container.scrollLeft += itemBounds.right - containerBounds.right
  }
}
