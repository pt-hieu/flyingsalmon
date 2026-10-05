import { Avatar, AvatarSize } from '@/registry/ui/avatar'
import { Button, ButtonVariant } from '@/registry/ui/button'

export function AvatarClickable() {
  return (
    <Button
      variant={ButtonVariant.Ghost}
      icon={
        <Avatar
          src="/avatar-sample-sky-300.svg"
          name="Brian Nguyen"
          alt=""
          size={AvatarSize.Small}
        />
      }
    >
      Brian Nguyen
    </Button>
  )
}
