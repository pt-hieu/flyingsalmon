import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

export function BreadcrumbUsage() {
  return (
    <Breadcrumb>
      <BreadcrumbItem link href="/trips">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kyoto in autumn</BreadcrumbItem>
    </Breadcrumb>
  )
}
