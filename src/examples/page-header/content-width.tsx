import { PlaneTakeoff } from 'lucide-react'

import { Button } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

export function PageHeaderContentWidth() {
  return (
    <div className="w-full [--page-header-max-width:--spacing(160)]">
      <PageHeader>
        <PageHeaderTitle>Trips</PageHeaderTitle>
        <PageHeaderActions>
          <Button icon={<PlaneTakeoff />}>Plan a new trip</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  )
}
