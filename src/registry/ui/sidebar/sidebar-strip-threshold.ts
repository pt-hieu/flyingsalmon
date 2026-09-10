/**
 * Tailwind scans class names as literals, so the media query in
 * `classnames.ts` spells this same number as `min-[700px]:`. Change one and
 * the other has to follow.
 */
export const sidebarStripThreshold = 700

export const sidebarWideViewportQuery = `(min-width: ${sidebarStripThreshold}px)`
