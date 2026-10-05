import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisMenuItem,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'

export function BreadcrumbCollapsed() {
  return (
    <Breadcrumb>
      <BreadcrumbItem link href="#">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="#">Japan</a>
          </BreadcrumbEllipsisMenuItem>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="#">Kansai</a>
          </BreadcrumbEllipsisMenuItem>
          <BreadcrumbEllipsisMenuItem asChild>
            <a href="#">Kyoto in autumn</a>
          </BreadcrumbEllipsisMenuItem>
        </BreadcrumbEllipsis>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem link href="#">
        Day 3
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kinkaku-ji</BreadcrumbItem>
    </Breadcrumb>
  )
}
