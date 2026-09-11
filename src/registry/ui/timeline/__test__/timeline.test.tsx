import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineOrientation,
  TimelineTitle,
} from '@/registry/ui/timeline'

describe('Timeline', () => {
  it('renders an ordered list with one list item per child', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
            <TimelineDescription>Two nights</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hue</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hoi An</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('exposes its orientation as a data attribute', () => {
    render(
      <Timeline orientation={TimelineOrientation.Horizontal}>
        <TimelineItem>
          <TimelineMarker />
        </TimelineItem>
      </Timeline>,
    )

    expect(screen.getByRole('list')).toHaveAttribute(
      'data-orientation',
      'horizontal',
    )
  })

  it('defaults its orientation to vertical', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
        </TimelineItem>
      </Timeline>,
    )

    expect(screen.getByRole('list')).toHaveAttribute(
      'data-orientation',
      'vertical',
    )
  })
})
