const defaultScrollRegionLabel = 'Scrollable table'

export function scrollRegionProps(
  overflows: boolean,
  label: string | undefined,
) {
  if (!overflows) return {}

  return {
    role: 'region',
    tabIndex: 0,
    'aria-label': label ?? defaultScrollRegionLabel,
  }
}
