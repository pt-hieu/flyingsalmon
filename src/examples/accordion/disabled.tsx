import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'

export function AccordionDisabled() {
  return (
    <Accordion className="w-full max-w-sm" defaultValue={['receipt']}>
      <AccordionItem value="receipt" disabled>
        <AccordionTrigger>Booking confirmation</AccordionTrigger>
        <AccordionContent>
          Issued on 3 May and already emailed to Brian Nguyen. It cannot be
          edited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="transfer">
        <AccordionTrigger>Airport transfer</AccordionTrigger>
        <AccordionContent>
          A driver meets the group at arrivals and holds a sign with the trip
          name.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
