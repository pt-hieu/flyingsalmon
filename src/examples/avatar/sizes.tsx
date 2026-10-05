import { Avatar, AvatarSize } from '@/registry/ui/avatar'

export function AvatarSizes() {
  return (
    <>
      <Avatar src="/avatar-sample-sky-300.svg" name="Brian Nguyen" />
      <Avatar
        src="/avatar-sample-sky-300.svg"
        name="Brian Nguyen"
        size={AvatarSize.Small}
      />
      <Avatar name="Brian Nguyen" />
      <Avatar name="Brian Nguyen" size={AvatarSize.Small} />
    </>
  )
}
