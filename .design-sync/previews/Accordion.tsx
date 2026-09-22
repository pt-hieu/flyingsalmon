import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
  Avatar,
  AvatarColor,
  AvatarSize,
  Badge,
  BadgeVariant,
} from 'flyingsalmon'

export function Faq() {
  return (
    <Accordion
      className="w-full max-w-sm"
      defaultValue={['shipping', 'warranty']}
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>How does shipping work?</AccordionTrigger>
        <AccordionContent>
          Orders leave the warehouse within two working days and arrive inside a
          week, tracked from the moment they ship.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Can I return an order?</AccordionTrigger>
        <AccordionContent>
          Anything unopened comes back within thirty days for a full refund.
          Start the return from your order history.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>What does the warranty cover?</AccordionTrigger>
        <AccordionContent>
          Two years against manufacturing defects, parts and labour included.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function Itinerary() {
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
          One carry-on each, rain shell, and an adapter for the two-pin sockets.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function RichTrigger() {
  return (
    <Accordion className="w-full max-w-sm" defaultValue={['flights']}>
      <AccordionItem value="flights">
        <AccordionTrigger>
          <span className="flex flex-col gap-1">
            <span className="flex items-center gap-2">
              Flights
              <Badge variant={BadgeVariant.Success}>Booked</Badge>
            </span>
            <span className="text-muted-foreground font-sans text-sm font-normal">
              Haneda to Itami, 12 April, two seats
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          Seats 14A and 14B, checked bags included. The airline releases
          boarding passes a day before departure.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="party">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            Travellers
            <Badge variant={BadgeVariant.Secondary}>3</Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center gap-2">
            <Avatar
              size={AvatarSize.Small}
              name="Mai Tran"
              color={AvatarColor.Teal}
            />
            <Avatar
              size={AvatarSize.Small}
              name="Ken Sato"
              color={AvatarColor.Fuchsia}
            />
            <Avatar
              size={AvatarSize.Small}
              name="Ana Lopez"
              color={AvatarColor.Pink}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function Disabled() {
  return (
    <Accordion className="w-full max-w-sm" defaultValue={['receipt']}>
      <AccordionItem value="receipt" disabled>
        <AccordionTrigger>Receipt</AccordionTrigger>
        <AccordionContent>
          Issued on 3 May and already sent to your email; it cannot be edited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="delivery">
        <AccordionTrigger>Delivery</AccordionTrigger>
        <AccordionContent>
          Left with the concierge, signed for at 14:20.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
