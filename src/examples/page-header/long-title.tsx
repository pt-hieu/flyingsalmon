import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'

export function PageHeaderLongTitle() {
  return (
    <div className="w-full">
      <PageHeader>
        <PageHeaderTitle>
          Ten days from Ho Chi Minh City through Tokyo, Kyoto, and Osaka with
          Brian Nguyen and the whole family
        </PageHeaderTitle>
        <PageHeaderActions>
          <Button variant={ButtonVariant.Outline}>Replan</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  )
}
