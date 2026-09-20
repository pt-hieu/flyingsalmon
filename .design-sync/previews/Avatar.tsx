import { Avatar, AvatarColor, AvatarSize } from 'flyingsalmon'

export function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar name="Ada Lovelace" color={AvatarColor.Indigo} />
      <Avatar
        name="Ada Lovelace"
        color={AvatarColor.Indigo}
        size={AvatarSize.Small}
      />
    </div>
  )
}

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar name="Ada Lovelace" color={AvatarColor.Orange} />
      <Avatar name="Grace Hopper" color={AvatarColor.Amber} />
      <Avatar name="Katherine Johnson" color={AvatarColor.Green} />
      <Avatar name="Alan Turing" color={AvatarColor.Teal} />
      <Avatar name="Barbara Liskov" color={AvatarColor.Sky} />
      <Avatar name="Margaret Hamilton" color={AvatarColor.Indigo} />
      <Avatar name="Hedy Lamarr" color={AvatarColor.Purple} />
      <Avatar name="Radia Perlman" color={AvatarColor.Pink} />
    </div>
  )
}

export function NextToName() {
  return (
    <span className="flex items-center gap-2">
      <Avatar name="Grace Hopper" alt="" color={AvatarColor.Teal} />
      <span className="text-sm font-medium">Grace Hopper</span>
    </span>
  )
}
