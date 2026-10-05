import { Share2 } from 'lucide-react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

export function PageHeaderWrapping() {
  return (
    <div className="w-full space-y-10">
      <TripPageHeader />
      <div className="max-w-sm">
        <TripPageHeader />
      </div>
    </div>
  )
}

function TripPageHeader() {
  return (
    <PageHeader>
      <PageHeaderTitle>Kyoto in autumn</PageHeaderTitle>
      <PageHeaderActions>
        <Button icon={<Share2 />} variant={ButtonVariant.Outline}>
          Share
        </Button>
        <Button variant={ButtonVariant.Outline}>Replan</Button>
        <Button>Book stays</Button>
      </PageHeaderActions>
    </PageHeader>
  )
}
