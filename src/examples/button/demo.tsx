import { Plus, UserPlus } from 'lucide-react'

import { Button, ButtonVariant } from '@/registry/ui/button'

export function ButtonDemo() {
  return (
    <>
      <Button icon={<Plus />}>Plan a trip</Button>
      <Button variant={ButtonVariant.Outline} icon={<UserPlus />}>
        Invite travellers
      </Button>
    </>
  )
}
