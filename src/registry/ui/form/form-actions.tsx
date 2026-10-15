import { cn } from '@/lib/utils'
import { actionsRow } from '@/registry/lib/actions-row'

export interface FormActionsProps extends React.ComponentProps<'div'> {}

export function FormActions({ className, ...props }: FormActionsProps) {
  return <div className={cn(actionsRow, className)} {...props} />
}
