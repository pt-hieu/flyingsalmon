import { useState } from 'react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import { Checkbox } from '@/registry/ui/checkbox'
import { Combobox, ComboboxItem, ComboboxMode } from '@/registry/ui/combobox'
import { DatePicker, DatePickerMode } from '@/registry/ui/date-picker'
import { Form, FormActions } from '@/registry/ui/form'
import { Input } from '@/registry/ui/input'
import { NumberField } from '@/registry/ui/number-field'
import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'
import { Select, SelectItem } from '@/registry/ui/select'
import { Slider } from '@/registry/ui/slider'
import { Switch } from '@/registry/ui/switch'
import { Textarea } from '@/registry/ui/textarea'
import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupMode,
} from '@/registry/ui/toggle-group'

export function FormEveryField() {
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [pace, setPace] = useState(3)

  return (
    <Form
      className="w-full max-w-md"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input label="Trip name" name="tripName" />
      <Combobox
        mode={ComboboxMode.Single}
        name="placeId"
        label="Destination"
        placeholder="Search a place"
        value={placeId}
        onValueChange={setPlaceId}
      >
        <ComboboxItem value="place-lisbon">Lisbon</ComboboxItem>
        <ComboboxItem value="place-hanoi">Hanoi</ComboboxItem>
      </Combobox>
      <DatePicker
        mode={DatePickerMode.Range}
        label="Dates"
        startName="start"
        endName="end"
      />
      <NumberField
        label="Travellers"
        name="travellers"
        defaultValue={2}
        min={1}
      />
      <Select
        label="Travel style"
        name="travelStyle"
        placeholder="Choose a style"
      >
        <SelectItem value="slow">Slow and local</SelectItem>
        <SelectItem value="packed">Packed itinerary</SelectItem>
      </Select>
      <RadioGroup label="Stays" name="stays" defaultValue="hotel">
        <RadioGroupItem value="hotel" label="Hotels" />
        <RadioGroupItem value="rental" label="Rentals" />
      </RadioGroup>
      <ToggleGroup
        mode={ToggleGroupMode.Multiple}
        label="Interests"
        name="interests"
        defaultValue={['food']}
      >
        <ToggleGroupItem value="food">Food</ToggleGroupItem>
        <ToggleGroupItem value="museums">Museums</ToggleGroupItem>
        <ToggleGroupItem value="hiking">Hiking</ToggleGroupItem>
      </ToggleGroup>
      <Slider
        label="Pace, from relaxed to packed"
        name="pace"
        value={pace}
        onValueChange={setPace}
        min={1}
        max={5}
      />
      <Textarea label="Trip notes" name="tripNotes" minRows={2} />
      <Switch label="Share with the group" name="shared" />
      <Checkbox label="Send me price alerts" name="priceAlerts" />
      <FormActions>
        <Button variant={ButtonVariant.Outline}>Cancel</Button>
        <Button type="submit">Save trip</Button>
      </FormActions>
    </Form>
  )
}
