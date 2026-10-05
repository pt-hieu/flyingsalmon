import { Avatar, AvatarColor } from '@/registry/ui/avatar'

export function AvatarFallbacks() {
  return (
    <>
      <Avatar src="/avatar-sample-sky-300.svg" name="Brian Nguyen" />
      <Avatar
        src="/photos/missing.png"
        name="Linh Tran"
        color={AvatarColor.Blue}
      />
      <Avatar name="Hoa Thi Lan Le" color={AvatarColor.Teal} />
      <Avatar name="Minh" color={AvatarColor.Fuchsia} />
      <Avatar color={AvatarColor.Pink} />
    </>
  )
}
