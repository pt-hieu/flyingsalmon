import { Button, ButtonVariant } from '@/registry/ui/button'

export function ButtonDisabled() {
  return (
    <>
      <Button disabled>Book trip</Button>
      <Button variant={ButtonVariant.Outline} disabled>
        Share
      </Button>
      <Button variant={ButtonVariant.Destructive} disabled>
        Delete trip
      </Button>
    </>
  )
}
