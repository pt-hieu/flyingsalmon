import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem link href="#">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem link href="#">
        Kyoto in autumn
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Itinerary</BreadcrumbItem>
    </Breadcrumb>
  )
}
