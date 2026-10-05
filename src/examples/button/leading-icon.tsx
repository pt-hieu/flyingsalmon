import { CalendarPlus, Share2, Trash2 } from 'lucide-react'

import { Button, ButtonVariant } from '@/registry/ui/button'

export function ButtonLeadingIcon() {
  return (
    <>
      <Button icon={<CalendarPlus />}>Add a day</Button>
      <Button variant={ButtonVariant.Outline} icon={<Share2 />}>
        Share
      </Button>
      <Button variant={ButtonVariant.Destructive} icon={<Trash2 />}>
        Delete trip
      </Button>
    </>
  )
}
