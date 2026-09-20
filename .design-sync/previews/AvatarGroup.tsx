import { AvatarColor, AvatarGroup, AvatarSize } from 'flyingsalmon'
import type { AvatarGroupItem } from 'flyingsalmon'

const tripMembers: AvatarGroupItem[] = [
  { id: 'ada', name: 'Ada Lovelace', color: AvatarColor.Sky },
  { id: 'grace', name: 'Grace Hopper', color: AvatarColor.Teal },
  { id: 'katherine', name: 'Katherine Johnson', color: AvatarColor.Amber },
  { id: 'alan', name: 'Alan Turing', color: AvatarColor.Purple },
  { id: 'barbara', name: 'Barbara Liskov', color: AvatarColor.Pink },
]

const conferenceAttendees: AvatarGroupItem[] = [
  ...tripMembers,
  ...Array.from({ length: 115 }, (_unused, index) => ({
    id: `attendee-${index}`,
    name: `Attendee ${index + 1}`,
    color: AvatarColor.Green,
  })),
]

export function TripMembers() {
  return <AvatarGroup items={tripMembers} aria-label="Trip members" />
}

export function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarGroup items={tripMembers} aria-label="Trip members" />
      <AvatarGroup
        items={tripMembers}
        size={AvatarSize.Small}
        aria-label="Trip members"
      />
    </div>
  )
}

export function Overflow() {
  return (
    <div className="flex flex-col gap-4">
      <AvatarGroup
        items={tripMembers}
        max={2}
        aria-label="Trip members, two shown"
      />
      <AvatarGroup
        items={tripMembers}
        max={4}
        aria-label="Trip members, four shown"
      />
      <AvatarGroup
        items={tripMembers}
        max={5}
        aria-label="Trip members, all shown"
      />
    </div>
  )
}

export function LargeRosterWithCap() {
  return (
    <AvatarGroup
      items={conferenceAttendees}
      cap={99}
      aria-label="Conference attendees"
    />
  )
}
