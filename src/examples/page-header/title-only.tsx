import { PageHeader, PageHeaderTitle } from '@/registry/ui/page-header'

export function PageHeaderTitleOnly() {
  return (
    <div className="w-full">
      <PageHeader>
        <PageHeaderTitle>Itinerary</PageHeaderTitle>
      </PageHeader>
    </div>
  )
}
