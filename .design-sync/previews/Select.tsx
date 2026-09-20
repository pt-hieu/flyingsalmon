import { MapPin, Star } from 'lucide-react'

import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectSize,
} from 'flyingsalmon'

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select className="w-64" label="Currency" placeholder="Choose a currency">
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
      <Select
        className="w-64"
        size={SelectSize.Small}
        label="Currency"
        placeholder="Choose a currency"
      >
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
    </div>
  )
}

export function Destinations() {
  return (
    <Select
      className="w-64"
      label="Destination"
      placeholder="Choose a destination"
      defaultValue="paris"
      defaultOpen
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
          Reykjavík (sold out)
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

export function Error() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        className="w-64"
        label="Currency"
        placeholder="Choose a currency"
        error="Choose a supported currency"
      >
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
      <Select
        className="w-64"
        size={SelectSize.Small}
        label="Currency"
        placeholder="Choose a currency"
        error="Choose a supported currency"
      >
        <SelectItem value="usd">US Dollar</SelectItem>
        <SelectItem value="eur">Euro</SelectItem>
        <SelectItem value="vnd">Vietnamese Dong</SelectItem>
      </Select>
    </div>
  )
}

export function Loading() {
  return (
    <Select
      className="w-64"
      label="Priority"
      placeholder="Choose a priority"
      loading
    >
      <SelectItem value="low">Low</SelectItem>
      <SelectItem value="medium">Medium</SelectItem>
      <SelectItem value="high">High</SelectItem>
      <SelectItem value="urgent">Urgent</SelectItem>
    </Select>
  )
}
