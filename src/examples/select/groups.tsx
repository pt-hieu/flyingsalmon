import { MapPin, Star } from 'lucide-react'

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/registry/ui/select'

export function SelectGroups() {
  return (
    <Select
      className="w-64"
      label="Destination"
      placeholder="Choose a destination"
      defaultValue="paris"
    >
      <SelectGroup>
        <SelectLabel>Popular</SelectLabel>
        <SelectItem value="tokyo" icon={<Star />}>
          Tokyo
        </SelectItem>
        <SelectItem value="paris" icon={<Star />}>
          Paris
        </SelectItem>
        <SelectItem value="reykjavik" icon={<Star />} disabled>
          Reykjavik (sold out)
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>More</SelectLabel>
        <SelectItem value="lisbon" icon={<MapPin />}>
          Lisbon
        </SelectItem>
        <SelectItem value="hanoi" icon={<MapPin />}>
          Hanoi
        </SelectItem>
      </SelectGroup>
    </Select>
  )
}
