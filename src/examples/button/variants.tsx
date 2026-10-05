import { Button, ButtonVariant } from '@/registry/ui/button'

export function ButtonVariants() {
  return (
    <>
      <Button>Book trip</Button>
      <Button variant={ButtonVariant.Outline}>Share</Button>
      <Button variant={ButtonVariant.Secondary}>Duplicate</Button>
      <Button variant={ButtonVariant.Ghost}>Edit</Button>
      <Button variant={ButtonVariant.Destructive}>Delete trip</Button>
    </>
  )
}
