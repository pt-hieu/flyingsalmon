import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springSettle } from '@/registry/lib/motion'

import {
  progressFillClassName,
  progressIndeterminateSegmentClassName,
  progressTrackClassName,
} from './classnames'
import { ProgressState } from './types'

export interface ProgressProps extends React.ComponentProps<'div'> {
  value?: number
  max?: number
  label?: string
}

export function Progress({
  value,
  max = 100,
  label = 'Loading',
  className,
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined
  const clampedValue = Math.min(Math.max(value ?? 0, 0), max)
  const isComplete = clampedValue >= max

  const determinateState = isComplete
    ? ProgressState.Complete
    : ProgressState.Loading
  const state = isIndeterminate ? ProgressState.Indeterminate : determinateState

  return (
    <div
      {...props}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={isIndeterminate ? undefined : clampedValue}
      data-state={state}
      className={cn(progressTrackClassName, className)}
    >
      {isIndeterminate ? (
        <div className={progressIndeterminateSegmentClassName} />
      ) : (
        <motion.div
          initial={false}
          animate={{ scaleX: isComplete ? 1 : clampedValue / max }}
          transition={springSettle}
          className={progressFillClassName}
        />
      )}
    </div>
  )
}
