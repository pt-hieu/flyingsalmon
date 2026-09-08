import { cn } from '@/lib/utils'

import { formClassName } from './classnames'

export interface FormProps extends React.ComponentProps<'form'> {
  result?: React.ReactNode
}

export function Form({
  result,
  className,
  noValidate = true,
  children,
  ...props
}: FormProps) {
  return (
    <form
      noValidate={noValidate}
      className={cn(formClassName, className)}
      {...props}
    >
      {children}
      {result}
    </form>
  )
}
