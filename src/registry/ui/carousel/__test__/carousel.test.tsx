import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/registry/ui/carousel'

const tripDays = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

const dayCardStarts = {
  'Day 1': 0,
  'Day 2': 280,
  'Day 3': 560,
  'Day 4': 840,
  'Day 5': 1120,
  'Day 6': 1400,
  'Day 7': 1680,
}

/**
 * jsdom lays nothing out, so every horizontal measurement the carousel reads is
 * the test's to state. Item starts are keyed by the item's accessible name.
 */
function reportItemStarts(startByChildName: Record<string, number>) {
  Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
    configurable: true,
    get(this: HTMLElement) {
      const name = this.getAttribute('aria-label') ?? this.textContent ?? ''

      return startByChildName[name] ?? 0
    },
  })
}

function scrollerOf(carousel: HTMLElement) {
  return carousel.querySelector<HTMLElement>(
    '[data-slot="carousel-content"]',
  ) as HTMLElement
}

interface ScrollerBox {
  scrollLeft: number
  clientWidth: number
  scrollWidth: number
}

function reportScrollerBox(box: Partial<ScrollerBox>): ScrollerBox {
  const reported: ScrollerBox = {
    scrollLeft: 0,
    clientWidth: 0,
    scrollWidth: 0,
    ...box,
  }

  for (const property of Object.keys(reported) as (keyof ScrollerBox)[]) {
    Object.defineProperty(HTMLElement.prototype, property, {
      configurable: true,
      get: () => reported[property],
    })
  }

  return reported
}

/**
 * jsdom performs no scrolling, so the scroller's own `scrollTo` is the boundary
 * the carousel's movement is observed at.
 */
function recordScrollTargets() {
  const scrollTo = vi.fn()

  Object.defineProperty(Element.prototype, 'scrollTo', {
    configurable: true,
    writable: true,
    value: scrollTo,
  })

  return scrollTo
}

function forgetReportedMeasurements() {
  delete (Element.prototype as unknown as Record<string, unknown>).scrollTo

  for (const property of [
    'offsetLeft',
    'scrollLeft',
    'clientWidth',
    'scrollWidth',
  ]) {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
      property
    ]
  }
}

function CurrentDayReadout() {
  const { current, count } = useCarousel()

  return <p>{`Showing day ${current + 1} of ${count}`}</p>
}

function DayBoard({
  days = tripDays,
  ...props
}: Partial<React.ComponentProps<typeof Carousel>> & { days?: string[] }) {
  return (
    <Carousel aria-label="Trip days" {...props}>
      <CarouselContent>
        {days.map((day) => (
          <CarouselItem key={day} aria-label={day}>
            {day}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
      <CurrentDayReadout />
    </Carousel>
  )
}

describe('Carousel', () => {
  let scrollTo: ReturnType<typeof recordScrollTargets>

  beforeEach(() => {
    scrollTo = recordScrollTargets()
  })

  afterEach(forgetReportedMeasurements)

  it('names itself a carousel, names every item, and takes one tab stop before its controls', async () => {
    const user = userEvent.setup()
    reportScrollerBox({ clientWidth: 900, scrollWidth: 1890 })
    render(<DayBoard />)

    const carousel = screen.getByRole('region', { name: 'Trip days' })
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')

    for (const day of tripDays) {
      expect(screen.getByRole('group', { name: day })).toBeInTheDocument()
    }

    await user.tab()
    const scroller = document.activeElement as HTMLElement
    expect(carousel).toContainElement(scroller)
    expect(scroller).not.toBe(screen.getByRole('group', { name: 'Day 1' }))

    await user.tab()
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus()
  })

  it('moves by item, to either end, and by page from the keyboard', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ scrollLeft: 560, clientWidth: 900, scrollWidth: 1930 })
    render(<DayBoard />)

    await user.tab()
    const scroller = document.activeElement as HTMLElement
    fireEvent(scroller, new Event('scrollend'))

    const targetByKey = {
      '{ArrowRight}': 840,
      '{ArrowLeft}': 280,
      '{Home}': 0,
      '{End}': 1680,
      '{PageDown}': 1460,
      '{PageUp}': -340,
    }

    for (const [key, left] of Object.entries(targetByKey)) {
      scrollTo.mockClear()
      await user.keyboard(key)

      expect(scrollTo).toHaveBeenCalledWith({ left, behavior: 'smooth' })
    }
  })

  it('stays on the end item when arrowing past it', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard />)

    await user.tab()
    await user.keyboard('{ArrowLeft}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })

    scrollerBox.scrollLeft = 1680
    fireEvent(document.activeElement as HTMLElement, new Event('scrollend'))
    await user.keyboard('{ArrowRight}')

    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 1680,
      behavior: 'smooth',
    })
  })

  it('settles current on the item nearest the scroll position and reports the change once', () => {
    const onCurrentChange = vi.fn()
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard onCurrentChange={onCurrentChange} />)

    const scroller = scrollerOf(
      screen.getByRole('region', { name: 'Trip days' }),
    )

    fireEvent(scroller, new Event('scrollend'))
    expect(screen.getByText('Showing day 1 of 7')).toBeInTheDocument()
    expect(onCurrentChange).not.toHaveBeenCalled()

    scrollerBox.scrollLeft = 1130
    fireEvent(scroller, new Event('scrollend'))
    expect(screen.getByText('Showing day 5 of 7')).toBeInTheDocument()
    expect(onCurrentChange).toHaveBeenCalledExactlyOnceWith(4)

    fireEvent(scroller, new Event('scrollend'))
    expect(onCurrentChange).toHaveBeenCalledExactlyOnceWith(4)
  })

  it('disables previous on the first item and next on the last page', () => {
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard />)

    const previous = screen.getByRole('button', { name: 'Previous' })
    const next = screen.getByRole('button', { name: 'Next' })

    expect(previous).toBeDisabled()
    expect(next).toBeEnabled()

    scrollerBox.scrollLeft = 1030
    fireEvent(
      scrollerOf(screen.getByRole('region', { name: 'Trip days' })),
      new Event('scrollend'),
    )

    expect(previous).toBeEnabled()
    expect(next).toBeDisabled()
  })

  it('gives every item a dot that marks the current one and scrolls to its item', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard />)

    for (const day of tripDays) {
      expect(screen.getByRole('button', { name: day })).toBeInTheDocument()
    }

    expect(screen.getByRole('button', { name: 'Day 1' })).toHaveAttribute(
      'aria-current',
      'true',
    )

    scrollerBox.scrollLeft = 1130
    fireEvent(
      scrollerOf(screen.getByRole('region', { name: 'Trip days' })),
      new Event('scrollend'),
    )

    expect(screen.getByRole('button', { name: 'Day 5' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Day 1' })).not.toHaveAttribute(
      'aria-current',
    )

    await user.click(screen.getByRole('button', { name: 'Day 3' }))
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 560, behavior: 'smooth' })
  })

  it('renders no dots above ten items', () => {
    const elevenDays = Array.from(
      { length: 11 },
      (_, index) => `Day ${index + 1}`,
    )
    render(<DayBoard days={elevenDays} />)

    expect(screen.queryByRole('button', { name: 'Day 1' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument()
    expect(screen.getByText('Showing day 1 of 11')).toBeInTheDocument()
  })

  it('neither counts nor indexes a child that is not an item', () => {
    reportItemStarts({
      'Day 1': 0,
      'Day 2': 280,
      Transfer: 560,
      'Day 3': 690,
      'Day 4': 970,
      'Day 5': 1250,
      'Day 6': 1530,
      'Day 7': 1810,
    })
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 2080,
    })

    render(
      <Carousel aria-label="Trip days">
        <CarouselContent>
          <CarouselItem aria-label="Day 1">Day 1</CarouselItem>
          <CarouselItem aria-label="Day 2">Day 2</CarouselItem>
          <div>Transfer</div>
          {tripDays.slice(2).map((day) => (
            <CarouselItem key={day} aria-label={day}>
              {day}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots />
        <CurrentDayReadout />
      </Carousel>,
    )

    expect(screen.getByText('Showing day 1 of 7')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Transfer' })).toBeNull()

    scrollerBox.scrollLeft = 570
    fireEvent(
      scrollerOf(screen.getByRole('region', { name: 'Trip days' })),
      new Event('scrollend'),
    )

    expect(screen.getByText('Showing day 3 of 7')).toBeInTheDocument()
  })

  it('starts on defaultIndex without animating there', () => {
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ clientWidth: 900, scrollWidth: 1930 })
    render(<DayBoard defaultIndex={2} />)

    expect(scrollTo).toHaveBeenCalledWith({ left: 560, behavior: 'instant' })
    expect(screen.getByText('Showing day 3 of 7')).toBeInTheDocument()
  })

  it('settles current from a scroll that never ends, for browsers without scrollend', () => {
    vi.useFakeTimers()
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard />)

    scrollerBox.scrollLeft = 1130
    fireEvent.scroll(
      scrollerOf(screen.getByRole('region', { name: 'Trip days' })),
    )

    expect(screen.getByText('Showing day 1 of 7')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1000))

    expect(screen.getByText('Showing day 5 of 7')).toBeInTheDocument()

    vi.useRealTimers()
  })
})
