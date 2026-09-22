import { Avatar, AvatarColor, AvatarSize } from 'flyingsalmon'

export function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar name="Ada Lovelace" color={AvatarColor.Blue} />
      <Avatar
        name="Ada Lovelace"
        color={AvatarColor.Blue}
        size={AvatarSize.Small}
      />
    </div>
  )
}

export function Colors() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar name="Ada Lovelace" color={AvatarColor.Sky} />
      <Avatar name="Grace Hopper" color={AvatarColor.Pink} />
      <Avatar name="Katherine Johnson" color={AvatarColor.Teal} />
      <Avatar name="Alan Turing" color={AvatarColor.Fuchsia} />
      <Avatar name="Barbara Liskov" color={AvatarColor.Cyan} />
      <Avatar name="Margaret Hamilton" color={AvatarColor.Blue} />
      <Avatar name="Radia Perlman" />
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
