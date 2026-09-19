export interface BreadcrumbProps extends React.ComponentProps<'nav'> {}

export function Breadcrumb({
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: BreadcrumbProps) {
  return <nav aria-label={ariaLabel} {...props} />
}
