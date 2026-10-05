import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

const placeName = 'Fushimi Inari and the thousand torii gates'

export function BreadcrumbLongPageTitle() {
  return (
    <div className="w-full max-w-xs">
      <Breadcrumb>
        <BreadcrumbItem link href="#">
          Trips
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem link href="#">
          Day 3
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem active title={placeName}>
          {placeName}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}
