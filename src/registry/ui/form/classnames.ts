import { cn } from '@/lib/utils'

export const formClassName = 'flex flex-col gap-5'

export const formActionsClassName = cn(
  'flex flex-col-reverse gap-2',
  'sm:flex-row sm:justify-end',
  '[&>*]:w-full sm:[&>*]:w-auto',
)
