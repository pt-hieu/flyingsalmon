import { sidebarWideViewportQuery } from './sidebar-strip-threshold'

export function subscribeToWideViewport(onChange: () => void) {
  const query = window.matchMedia(sidebarWideViewportQuery)
  query.addEventListener('change', onChange)

  return () => query.removeEventListener('change', onChange)
}

export function readWideViewport() {
  return window.matchMedia(sidebarWideViewportQuery).matches
}

export function unknownViewportOnServer() {
  return null
}
