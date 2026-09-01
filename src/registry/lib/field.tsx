import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'

import { springBounce, springSettle } from '@/registry/lib/motion'

export interface UseFieldIdsOptions {
  id?: string
  error?: string
  describedBy?: string
}

export function useFieldIds({
  id,
  error,
  describedBy: callerDescribedBy,
}: UseFieldIdsOptions) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const errorMessageId = `${fieldId}-error`

  const describedBy =
    [callerDescribedBy, error ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined

  return { fieldId, errorMessageId, describedBy }
}

export interface FieldErrorMessageProps {
  id: string
  children?: string
}

export function FieldErrorMessage({ id, children }: FieldErrorMessageProps) {
  return (
    <AnimatePresence initial={false}>
      {children ? (
        <motion.p
          key="error"
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: springBounce }}
          exit={{ height: 0, opacity: 0, transition: springSettle }}
          className="text-destructive overflow-hidden pt-1 text-xs"
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}
