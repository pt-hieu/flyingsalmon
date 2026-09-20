import { Dialog, type DialogProps } from '@/registry/ui/dialog'

export interface DrawerProps extends Omit<DialogProps, 'size'> {}

export function Drawer(props: DrawerProps) {
  return <Dialog {...props} />
}
