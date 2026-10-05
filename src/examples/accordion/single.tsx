import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '@/registry/ui/accordion'

export function AccordionSingle() {
  return (
    <Accordion
      className="w-full max-w-sm"
      type={AccordionType.Single}
      defaultValue="itinerary"
    >
      <AccordionItem value="itinerary">
        <AccordionTrigger>Itinerary</AccordionTrigger>
        <AccordionContent>
          Four days in Kyoto, then two in Osaka, with the train booked between
          them.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="budget">
        <AccordionTrigger>Budget</AccordionTrigger>
        <AccordionContent>
          Flights and lodging are paid. Meals and local transport are estimated
          per day.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="packing">
        <AccordionTrigger>Packing list</AccordionTrigger>
        <AccordionContent>
          One carry-on each, a rain shell, and an adapter for the two-pin
          sockets.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
