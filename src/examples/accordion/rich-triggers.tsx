import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { Badge, BadgeVariant } from '@/registry/ui/badge'

export function AccordionRichTriggers() {
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
      <AccordionItem value="documents">
        <AccordionTrigger>
          What documents do I need at the border, and how far ahead should I
          apply for them?
        </AccordionTrigger>
        <AccordionContent>
          A passport valid for six more months, and a visa applied for at least
          three weeks before you fly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="travellers">
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
              name="Brian Nguyen"
              color={AvatarColor.Sky}
            />
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
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
