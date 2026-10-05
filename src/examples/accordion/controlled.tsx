import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

const days = [
  {
    value: 'day-one',
    title: 'Day one, Kyoto',
    detail: 'Fushimi Inari at dawn, then Nishiki Market for lunch.',
  },
  {
    value: 'day-two',
    title: 'Day two, Arashiyama',
    detail: 'The bamboo grove early, monkeys after, a river walk at dusk.',
  },
  {
    value: 'day-three',
    title: 'Day three, Osaka',
    detail: 'Train at nine, Dotonbori in the evening.',
  },
]

export function AccordionControlled() {
  const [openDays, setOpenDays] = useState<string[]>(['day-one'])

  const allExpanded = openDays.length === days.length

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-sm">
          {openDays.length} of {days.length} open
        </span>
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Small}
          onClick={() =>
            setOpenDays(allExpanded ? [] : days.map((day) => day.value))
          }
        >
          {allExpanded ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <Accordion value={openDays} onValueChange={setOpenDays}>
        {days.map((day) => (
          <AccordionItem key={day.value} value={day.value}>
            <AccordionTrigger>{day.title}</AccordionTrigger>
            <AccordionContent>{day.detail}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
