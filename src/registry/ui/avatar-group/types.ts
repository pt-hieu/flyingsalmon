import type { AvatarProps } from '@/registry/ui/avatar'

export type AvatarGroupItem = Pick<
  AvatarProps,
  'name' | 'src' | 'color' | 'alt'
> & {
  id?: string
}
