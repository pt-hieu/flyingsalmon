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

  it('renders the dot in an empty marker and not in a marker with children', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker>
            <img src="/plane.svg" alt="Flight" />
          </TimelineMarker>
          <TimelineContent>
            <TimelineTitle>Flight to Hue</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    )

    const [emptyMarkerItem, iconMarkerItem] = screen.getAllByRole('listitem')

    expect(
      emptyMarkerItem.querySelector('[data-slot="timeline-marker-dot"]'),
    ).not.toBeNull()
    expect(
      iconMarkerItem.querySelector('[data-slot="timeline-marker-dot"]'),
    ).toBeNull()
    expect(screen.getByAltText('Flight')).toBeInTheDocument()
  })

  it('renders the dot when a conditional marker child resolves to nothing', () => {
    const showFlightIcon = false

    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker>
            {showFlightIcon && <span>Flight</span>}
          </TimelineMarker>
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>,
    )

    expect(
      screen
        .getByRole('listitem')
        .querySelector('[data-slot="timeline-marker-dot"]'),
    ).not.toBeNull()
  })

  it('draws no connector after the last item', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
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

    const connectorCountPerItem = screen
      .getAllByRole('listitem')
      .map(
        (item) =>
          item.querySelectorAll('[data-slot="timeline-connector"]').length,
      )

    expect(connectorCountPerItem).toEqual([1, 1, 0])
  })

  it('draws no connector after the last item when a conditional item is left out', () => {
    const showReturnLeg = false

    render(
      <Timeline>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hanoi</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineMarker />
          <TimelineContent>
            <TimelineTitle>Hoi An</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        {showReturnLeg && (
          <TimelineItem>
            <TimelineMarker />
            <TimelineContent>
              <TimelineTitle>Back to Hanoi</TimelineTitle>
            </TimelineContent>
          </TimelineItem>
        )}
      </Timeline>,
    )

    const connectorCountPerItem = screen
      .getAllByRole('listitem')
      .map(
        (item) =>
          item.querySelectorAll('[data-slot="timeline-connector"]').length,
      )

    expect(connectorCountPerItem).toEqual([1, 0])
  })
})
