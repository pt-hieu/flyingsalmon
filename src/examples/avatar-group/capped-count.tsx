import { AvatarColor } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'

const schoolTrip = Array.from({ length: 254 }, (_unused, index) => ({
  id: `student-${index}`,
  name: `Student ${index + 1}`,
  color: AvatarColor.Cyan,
}))

const smallTrip = schoolTrip.slice(0, 7)

export function AvatarGroupCappedCount() {
  return (
    <>
      <AvatarGroup
        items={schoolTrip}
        cap={99}
        aria-label="Da Lat school trip"
      />
      <AvatarGroup items={smallTrip} cap={99} aria-label="Da Lat study group" />
    </>
  )
}
