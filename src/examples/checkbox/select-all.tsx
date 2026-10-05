import { useState } from 'react'

import { Checkbox } from '@/registry/ui/checkbox'

const places = ['Alfama', 'Belém', 'Sintra'] as const

export function CheckboxSelectAll() {
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>(['Belém'])

  const allSelected = selectedPlaces.length === places.length
  const noneSelected = selectedPlaces.length === 0
  let allPlacesState: boolean | 'indeterminate' = 'indeterminate'
  if (allSelected) allPlacesState = true
  else if (noneSelected) allPlacesState = false

  function togglePlace(place: string, isChecked: boolean) {
    setSelectedPlaces((previouslySelected) =>
      isChecked
        ? [...previouslySelected, place]
        : previouslySelected.filter((selected) => selected !== place),
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="All places"
        checked={allPlacesState}
        onCheckedChange={() =>
          setSelectedPlaces(allSelected ? [] : [...places])
        }
      />
      <div className="flex flex-col gap-3 pl-7">
        {places.map((place) => (
          <Checkbox
            key={place}
            label={place}
            checked={selectedPlaces.includes(place)}
            onCheckedChange={(isChecked) =>
              togglePlace(place, isChecked === true)
            }
          />
        ))}
      </div>
    </div>
  )
}
