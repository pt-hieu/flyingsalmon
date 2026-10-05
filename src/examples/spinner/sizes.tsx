import { Spinner, SpinnerSize } from '@/registry/ui/spinner'

export function SpinnerSizes() {
  return (
    <>
      <Spinner />
      <Spinner size={SpinnerSize.Small} />
    </>
  )
}
