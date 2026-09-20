import { History, MapPin } from 'lucide-react'

import {
  Alert,
  AlertVariant,
  Combobox,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxMode,
  ComboboxSeparator,
  ComboboxSize,
} from 'flyingsalmon'

const PLACES = [
  { value: 'fsq-1', label: 'Reykjavík', description: 'Iceland' },
  { value: 'fsq-2', label: 'Reims', description: 'France' },
  { value: 'fsq-4', label: 'Hanoi', description: 'Vietnam' },
  { value: 'fsq-5', label: 'Hakone', description: 'Japan' },
]

export function Sizes() {
  return (
    <div className="flex w-72 flex-col gap-6">
      <Combobox
        mode={ComboboxMode.Single}
        label="Departure city"
        placeholder="Search a city"
        value={null}
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
      <Combobox
        mode={ComboboxMode.Single}
        size={ComboboxSize.Small}
        label="Departure city"
        placeholder="Search a city"
        value={null}
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
    </div>
  )
}

export function Groups() {
  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Departure city"
      placeholder="Search a city"
      value={null}
      onValueChange={() => {}}
      defaultOpen
    >
      <ComboboxGroup>
        <ComboboxLabel>Recent</ComboboxLabel>
        <ComboboxItem value="fsq-4" description="Vietnam" icon={<History />}>
          Hanoi
        </ComboboxItem>
        <ComboboxItem value="fsq-5" description="Japan" icon={<History />}>
          Hakone
        </ComboboxItem>
      </ComboboxGroup>
      <ComboboxSeparator />
      <ComboboxGroup>
        <ComboboxLabel>Everywhere else</ComboboxLabel>
        <ComboboxItem value="fsq-2" description="France" icon={<MapPin />}>
          Reims
        </ComboboxItem>
        <ComboboxItem
          value="fsq-1"
          description="Iceland"
          icon={<MapPin />}
          disabled
        >
          Reykjavík — no flights this season
        </ComboboxItem>
      </ComboboxGroup>
    </Combobox>
  )
}

export function FreeText() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Combobox
        mode={ComboboxMode.Single}
        allowFreeText
        label="Destination"
        placeholder="Anywhere you like"
        value="Hoi An"
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem
            key={place.value}
            value={place.value}
            description={place.description}
          >
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
      <Alert variant={AlertVariant.Info} animateOpen={false}>
        Hoi An is not on our list, so we will search for it as typed.
      </Alert>
    </div>
  )
}

export function Chips() {
  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      label="What do you want to do?"
      placeholder="Add an interest"
      value={['museums', 'hiking']}
      onValueChange={() => {}}
    >
      <ComboboxItem value="food">Food and drink</ComboboxItem>
      <ComboboxItem value="museums">Museums</ComboboxItem>
      <ComboboxItem value="hiking">Hiking</ComboboxItem>
      <ComboboxItem value="nightlife">Nightlife</ComboboxItem>
    </Combobox>
  )
}

export function ErrorAndDisabled() {
  return (
    <div className="flex w-72 flex-col gap-6">
      <Combobox
        mode={ComboboxMode.Single}
        label="Departure city"
        placeholder="Search a city"
        error="Pick a city we fly from"
        value={null}
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
      <Combobox
        mode={ComboboxMode.Single}
        disabled
        label="Return city"
        placeholder="Same as departure"
        value={null}
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
    </div>
  )
}
