import { useState } from 'react'

import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldLoading() {
  const [budgetPerPerson, setBudgetPerPerson] = useState<number | null>(1500)
  const [tripCount, setTripCount] = useState<number>()
  const [pricing, setPricing] = useState(false)

  async function priceBudget(nextBudget: number | null) {
    setBudgetPerPerson(nextBudget)

    if (nextBudget === null) return

    setPricing(true)
    setTripCount(await countTripsWithin(nextBudget))
    setPricing(false)
  }

  return (
    <NumberField
      className="w-64"
      label="Budget per person"
      prefix="$"
      value={budgetPerPerson}
      onValueChange={priceBudget}
      min={0}
      step={50}
      loading={pricing}
      description={
        tripCount === undefined
          ? undefined
          : `${tripCount} trips fit this budget`
      }
    />
  )
}

async function countTripsWithin(budget: number) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return Math.floor(budget / 120)
}
