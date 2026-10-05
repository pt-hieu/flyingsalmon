import { useState } from 'react'

import { NumberField } from '@/registry/ui/number-field'

const travellers = 4

export function NumberFieldDescription() {
  const [budgetPerPerson, setBudgetPerPerson] = useState<number | null>(1800)

  const description =
    budgetPerPerson === null
      ? `Set a budget to see the total for ${travellers} travellers`
      : `$${(budgetPerPerson * travellers).toLocaleString('en-US')} for ${travellers} travellers`

  const error =
    budgetPerPerson !== null && budgetPerPerson < 100
      ? 'Enter at least $100 per person'
      : undefined

  return (
    <NumberField
      className="w-64"
      label="Budget per person"
      prefix="$"
      value={budgetPerPerson}
      onValueChange={setBudgetPerPerson}
      min={0}
      step={50}
      description={description}
      error={error}
    />
  )
}
