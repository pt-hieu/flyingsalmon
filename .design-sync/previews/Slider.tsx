import { Button, ButtonVariant, Slider } from 'flyingsalmon'
import { useState } from 'react'

const paceLevels = [
  'Slow mornings, one plan a day',
  'Two plans a day, long lunches',
  'Packed days, early starts',
]

const budgetLevels = [
  'Easy on the wallet, about $400 per person for 5 days',
  'Easy on the wallet, about $600 per person for 5 days',
  'Comfortable, about $800 per person for 5 days',
  'Comfortable, about $1,000 per person for 5 days',
  'Comfortable, about $1,200 per person for 5 days',
  'Treat ourselves, about $1,500 per person for 5 days',
  'Treat ourselves, about $2,000 per person for 5 days',
]

export function Stepped() {
  const [paceLevel, setPaceLevel] = useState(1)

  return (
    <Slider
      className="w-full"
      label="Pace"
      min={0}
      max={paceLevels.length - 1}
      value={paceLevel}
      description={paceLevels[paceLevel]}
      onValueChange={setPaceLevel}
    />
  )
}

export function WithAction() {
  const [budgetLevel, setBudgetLevel] = useState(3)

  return (
    <Slider
      className="w-full"
      label="Budget"
      min={0}
      max={budgetLevels.length - 1}
      required
      value={budgetLevel}
      description={budgetLevels[budgetLevel]}
      onValueChange={setBudgetLevel}
      action={<Button variant={ButtonVariant.Ghost}>I have a number</Button>}
    />
  )
}

export function Disabled() {
  return (
    <Slider
      className="w-full"
      label="Pace"
      min={0}
      max={paceLevels.length - 1}
      value={1}
      description={paceLevels[1]}
      disabled
      onValueChange={() => {}}
    />
  )
}
