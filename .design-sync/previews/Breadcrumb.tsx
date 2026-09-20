import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisMenuItem,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from 'flyingsalmon'

export function Trail() {
  return (
    <Breadcrumb>
      <BreadcrumbItem link href="#">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem link href="#">
        Japan
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kyoto</BreadcrumbItem>
    </Breadcrumb>
  )
}

export function Collapsed() {
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
            <a href="#">Kyoto</a>
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

export function LongTitle() {
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
        <BreadcrumbItem
          active
          title="Fushimi Inari and the thousand torii gates"
        >
          Fushimi Inari and the thousand torii gates
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  )
}
