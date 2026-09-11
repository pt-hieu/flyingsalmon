import { describe, expect, it } from 'vitest'

import {
  motionDurations,
  springBounce,
  springSettle,
} from '@/registry/lib/motion'

const stateFeedbackCeilingInSeconds = 0.2

describe('motion presets', () => {
  it.each(Object.entries(motionDurations))(
    'keeps the %s duration under 200ms',
    (_name, durationInSeconds) => {
      expect(durationInSeconds).toBeLessThan(stateFeedbackCeilingInSeconds)
    },
  )

  it.each([
    ['bounce', springBounce],
    ['settle', springSettle],
  ])('settles the %s spring under 200ms', (_name, spring) => {
    expect(spring).toHaveProperty('type', 'spring')
    expect(spring.visualDuration).toBeLessThan(stateFeedbackCeilingInSeconds)
  })
})
