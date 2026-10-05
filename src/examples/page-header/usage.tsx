import { Button } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

export function PageHeaderUsage() {
  return (
    <PageHeader>
      <PageHeaderTitle>Kyoto in autumn</PageHeaderTitle>
      <PageHeaderActions>
        <Button>Book stays</Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
