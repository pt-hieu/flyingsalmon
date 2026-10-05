import { Button, ButtonSize } from '@/registry/ui/button'

export function ButtonSizes() {
  return (
    <>
      <Button>Book trip</Button>
      <Button size={ButtonSize.Small}>Book trip</Button>
    </>
  )
}
