import { Select, SelectItem } from '@/registry/ui/select'

export function SelectDemo() {
  return (
    <Select
      className="w-64"
      label="Travel style"
      placeholder="Choose a style"
      defaultValue="slow"
    >
      <SelectItem value="slow">Slow and local</SelectItem>
      <SelectItem value="packed">Packed itinerary</SelectItem>
      <SelectItem value="adventure">Adventure first</SelectItem>
    </Select>
  )
}
