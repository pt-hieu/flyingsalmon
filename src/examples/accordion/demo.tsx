import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'

export function AccordionDemo() {
  return (
    <Accordion
      className="w-full max-w-sm"
      defaultValue={['bookings', 'closures']}
    >
      <AccordionItem value="bookings">
        <AccordionTrigger>Can the planner use my bookings?</AccordionTrigger>
        <AccordionContent>
          Add a flight or a hotel and the planner builds each day around it,
          keeping the check-in and the departure where they are.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="invites">
        <AccordionTrigger>How do I invite a traveller?</AccordionTrigger>
        <AccordionContent>
          Send the invite link from the trip&rsquo;s share menu. Anyone with the
          link can join and edit.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="closures">
        <AccordionTrigger>What if a place is closed?</AccordionTrigger>
        <AccordionContent>
          The planner checks opening hours for each day and swaps in a nearby
          place when one is closed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
