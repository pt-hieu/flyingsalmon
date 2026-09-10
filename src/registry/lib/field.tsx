import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'
import { useId } from 'react'

import { springSettle } from '@/registry/lib/motion'

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

export enum FieldLabelPlacement {
  Above = 'above',
  Beside = 'beside',
}

const fieldLabelBaseVariants = cva(
  'text-sm font-medium transition-colors duration-(--motion-fast)',
  {
    variants: {
      placement: {
        [FieldLabelPlacement.Above]: 'mb-2',
        [FieldLabelPlacement.Beside]: '',
      },
      error: {
        true: 'text-destructive',
        false: 'text-foreground',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
      required: {
        true: "after:text-destructive after:ml-0.5 after:[content:'*'_/_'']",
        false: '',
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
      required: false,
    },
  },
)

export interface FieldLabelVariantsOptions {
  placement: FieldLabelPlacement
  error?: boolean
  disabled?: boolean
  required?: boolean
}

export function fieldLabelVariants(options: FieldLabelVariantsOptions) {
  return fieldLabelBaseVariants(options)
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
          animate={{ height: 'auto', opacity: 1, transition: springSettle }}
          exit={{ height: 0, opacity: 0, transition: springSettle }}
          className="text-destructive overflow-hidden pt-1 text-xs"
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}
