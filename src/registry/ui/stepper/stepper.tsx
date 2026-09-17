import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { springBounce, springSettle } from '@/registry/lib/motion'

import {
  stepperClassName,
  stepperSegmentClassName,
  stepperSegmentFillClassName,
} from './classnames'
import { StepperSegmentState } from './types'
import { stepperSegments } from './utils'

export interface StepperProps extends React.ComponentProps<'div'> {
  count: number
  current: number
  label?: string
}

export function Stepper({
  count,
  current,
  label = 'Progress',
  className,
  ...props
}: StepperProps) {
  const segments = stepperSegments({ count, current })

  return (
    <div
      {...props}
      role="list"
      aria-label={label}
      className={cn(stepperClassName, className)}
    >
      {segments.map(({ segmentNumber, state }) => {
        const isFilled = state !== StepperSegmentState.Upcoming

        return (
          <div
            key={segmentNumber}
            role="listitem"
            aria-label={`${segmentNumber} of ${count}`}
            aria-current={
              state === StepperSegmentState.Current ? 'step' : undefined
            }
            data-state={state}
            className={stepperSegmentClassName}
          >
            <motion.div
              initial={false}
              animate={{ scaleX: isFilled ? 1 : 0 }}
              transition={isFilled ? springBounce : springSettle}
              className={stepperSegmentFillClassName}
            />
          </div>
        )
      })}
    </div>
  )
}
