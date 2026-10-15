import type { MotionProps, Transition } from 'motion/react'

export const motionDurations = {
  fast: 0.1,
  base: 0.15,
} as const

export const springBounce: Transition = {
  type: 'spring',
  visualDuration: motionDurations.base,
  bounce: 0.3,
}

export const springSettle: Transition = {
  type: 'spring',
  visualDuration: motionDurations.base,
  bounce: 0,
}

export const collapsePresence = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1, transition: springSettle },
  exit: { height: 0, opacity: 0, transition: springSettle },
} satisfies Pick<MotionProps, 'initial' | 'animate' | 'exit'>

export const continuousDurations = {
  spinnerRotation: 0.8,
  skeletonPulse: 2,
  switchThumbPulse: 0.8,
  progressIndeterminate: 2,
} as const
