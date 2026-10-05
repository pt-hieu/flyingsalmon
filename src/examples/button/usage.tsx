import { Button } from '@/registry/ui/button'

export function ButtonUsage({ onSave }: { onSave: () => void }) {
  return <Button onClick={onSave}>Save trip</Button>
}
