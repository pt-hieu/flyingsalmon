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

/**
 * jsdom reports no intersections of its own, so which items the scroller shows
 * is the test's to state.
 */
class ReportingIntersectionObserver implements IntersectionObserver {
  static readonly instances: ReportingIntersectionObserver[] = []

  readonly root = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds: ReadonlyArray<number> = []

  callback: IntersectionObserverCallback
  targets: HTMLElement[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    ReportingIntersectionObserver.instances.push(this)
  }

  observe(target: Element) {
    this.targets.push(target as HTMLElement)
  }

  unobserve() {}
  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  report(visibleTargets: HTMLElement[]) {
    const entries = this.targets.map((target) => ({
      target,
      isIntersecting: visibleTargets.includes(target),
    })) as unknown as IntersectionObserverEntry[]

    this.callback(entries, this)
  }
}

function reportVisibleItems(visibleTargets: HTMLElement[]) {
  act(() => {
    for (const observer of ReportingIntersectionObserver.instances) {
      observer.report(visibleTargets)
    }
  })
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

function VisibleDaysReadout() {
  const { visible } = useCarousel()

  return (
    <p>{`Visible days: ${visible.map((index) => index + 1).join(', ')}`}</p>
  )
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
      <VisibleDaysReadout />
    </Carousel>
  )
}

describe('Carousel', () => {
  let scrollTo: ReturnType<typeof recordScrollTargets>
  const neverReportingIntersectionObserver = globalThis.IntersectionObserver

  beforeEach(() => {
    scrollTo = recordScrollTargets()
    ReportingIntersectionObserver.instances.length = 0
    globalThis.IntersectionObserver = ReportingIntersectionObserver
  })

  afterEach(() => {
    forgetReportedMeasurements()
    globalThis.IntersectionObserver = neverReportingIntersectionObserver
  })

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

  it('moves by item and to either end from the keyboard', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ scrollLeft: 560, clientWidth: 900, scrollWidth: 1930 })
    render(<DayBoard />)

    await user.tab()
    fireEvent(document.activeElement as HTMLElement, new Event('scrollend'))

    await user.keyboard('{ArrowRight}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 840, behavior: 'smooth' })

    await user.keyboard('{ArrowLeft}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 560, behavior: 'smooth' })

    await user.keyboard('{Home}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })

    await user.keyboard('{End}')
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 1680,
      behavior: 'smooth',
    })
  })

  it('steps on from the item it is already heading to, without waiting for the scroll to end', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ clientWidth: 900, scrollWidth: 1930 })
    render(<DayBoard />)

    await user.tab()

    await user.keyboard('{ArrowRight}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 280, behavior: 'smooth' })

    await user.keyboard('{ArrowRight}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 560, behavior: 'smooth' })
  })

  it('moves by a page of the scroller from the keyboard', async () => {
    const user = userEvent.setup()
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ scrollLeft: 940, clientWidth: 900, scrollWidth: 2800 })
    render(<DayBoard />)

    await user.tab()
    fireEvent(document.activeElement as HTMLElement, new Event('scrollend'))

    await user.keyboard('{PageDown}')
    expect(scrollTo).toHaveBeenLastCalledWith({
      left: 1840,
      behavior: 'smooth',
    })

    await user.keyboard('{PageUp}')
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 940, behavior: 'smooth' })
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

  it('marks the items the scroller is showing and offers them to the consumer', () => {
    reportItemStarts(dayCardStarts)
    reportScrollerBox({ clientWidth: 900, scrollWidth: 1930 })
    render(<DayBoard />)

    const firstDay = screen.getByRole('group', { name: 'Day 1' })
    const secondDay = screen.getByRole('group', { name: 'Day 2' })
    const fifthDay = screen.getByRole('group', { name: 'Day 5' })

    reportVisibleItems([firstDay, secondDay])

    expect(firstDay).toHaveAttribute('data-visible', 'true')
    expect(secondDay).toHaveAttribute('data-visible', 'true')
    expect(fifthDay).not.toHaveAttribute('data-visible')
    expect(screen.getByText('Visible days: 1, 2')).toBeInTheDocument()

    reportVisibleItems([fifthDay])

    expect(firstDay).not.toHaveAttribute('data-visible')
    expect(fifthDay).toHaveAttribute('data-visible', 'true')
    expect(screen.getByText('Visible days: 5')).toBeInTheDocument()
  })

  it('marks the current item and only the current item', () => {
    reportItemStarts(dayCardStarts)
    const scrollerBox = reportScrollerBox({
      clientWidth: 900,
      scrollWidth: 1930,
    })
    render(<DayBoard />)

    expect(screen.getByRole('group', { name: 'Day 1' })).toHaveAttribute(
      'data-current',
      'true',
    )

    scrollerBox.scrollLeft = 1130
    fireEvent(
      scrollerOf(screen.getByRole('region', { name: 'Trip days' })),
      new Event('scrollend'),
    )

    expect(screen.getByRole('group', { name: 'Day 1' })).not.toHaveAttribute(
      'data-current',
    )
    expect(screen.getByRole('group', { name: 'Day 5' })).toHaveAttribute(
      'data-current',
      'true',
    )
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

  it('counts nothing, shows no dots, and offers no move when it holds no items', () => {
    reportScrollerBox({ clientWidth: 900, scrollWidth: 900 })
    render(<DayBoard days={[]} />)

    expect(screen.getByText('Showing day 1 of 0')).toBeInTheDocument()
    expect(screen.queryByRole('group')).toBeNull()
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
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
