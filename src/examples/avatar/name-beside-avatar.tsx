import { Avatar, AvatarColor } from '@/registry/ui/avatar'

export function AvatarNameBesideAvatar() {
  return (
    <span className="flex items-center gap-2">
      <Avatar name="Linh Tran" alt="" color={AvatarColor.Cyan} />
      <span className="text-sm font-medium">Linh Tran</span>
    </span>
  )
}
