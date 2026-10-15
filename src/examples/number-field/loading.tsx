import { useRef, useState } from 'react'

import { NumberField } from '@/registry/ui/number-field'

export function NumberFieldLoading() {
  const [budgetPerPerson, setBudgetPerPerson] = useState<number | null>(1500)
  const [tripCount, setTripCount] = useState<number>()
  const [pricing, setPricing] = useState(false)
  const latestPricing = useRef(0)

  async function priceBudget(nextBudget: number | null) {
    latestPricing.current += 1
    const pricingNumber = latestPricing.current

    setBudgetPerPerson(nextBudget)

    if (nextBudget === null) {
      setPricing(false)
      return
    }

    setPricing(true)

    try {
      const nextTripCount = await countTripsWithin(nextBudget)

      if (pricingNumber === latestPricing.current) setTripCount(nextTripCount)
    } finally {
      if (pricingNumber === latestPricing.current) setPricing(false)
    }
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
