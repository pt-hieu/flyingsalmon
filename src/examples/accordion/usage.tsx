import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'

export function AccordionUsage() {
  return (
    <Accordion>
      <AccordionItem value="itinerary">
        <AccordionTrigger>Itinerary</AccordionTrigger>
        <AccordionContent>
          Four days in Kyoto, then two in Osaka.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="budget">
        <AccordionTrigger>Budget</AccordionTrigger>
        <AccordionContent>Flights and lodging are paid.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
