import { Link } from '@tanstack/react-router'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

export function BreadcrumbRouterLinks() {
  return (
    <Breadcrumb>
      <BreadcrumbItem link asChild>
        <Link to="/">Trips</Link>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kyoto in autumn</BreadcrumbItem>
    </Breadcrumb>
  )
}
