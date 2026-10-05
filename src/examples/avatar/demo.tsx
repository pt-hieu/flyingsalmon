import { Avatar, AvatarColor } from '@/registry/ui/avatar'

export function AvatarDemo() {
  return (
    <>
      <Avatar src="/avatar-sample-sky-300.svg" name="Brian Nguyen" />
      <Avatar name="Linh Tran" color={AvatarColor.Teal} />
      <Avatar name="Minh Pham" color={AvatarColor.Fuchsia} />
    </>
  )
}
