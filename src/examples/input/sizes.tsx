import { Input, InputSize } from '@/registry/ui/input'

export function InputSizes() {
  return (
    <>
      <Input
        className="w-64"
        label="Traveller name"
        defaultValue="Brian Nguyen"
      />
      <Input
        className="w-64"
        size={InputSize.Small}
        label="Traveller name"
        defaultValue="Brian Nguyen"
      />
    </>
  )
}
