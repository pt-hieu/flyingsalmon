import { cn } from '@/lib/utils'

import { TimelineMarkerSize, TimelineOrientation } from './types'

const timelineAxisClassNames: Record<TimelineOrientation, string> = {
  [TimelineOrientation.Vertical]: 'flex-col',
  [TimelineOrientation.Horizontal]: 'flex-row',
}

export function timelineClassName(orientation: TimelineOrientation) {
  return cn(
    'm-0 flex list-none gap-(--timeline-spacing) p-0',
    timelineAxisClassNames[orientation],
  )
}

const timelineItemAxisClassNames: Record<TimelineOrientation, string> = {
  [TimelineOrientation.Vertical]: 'flex-row',
  [TimelineOrientation.Horizontal]: 'min-w-0 flex-1 flex-col',
}

export function timelineItemClassName(orientation: TimelineOrientation) {
  return cn('flex gap-3', timelineItemAxisClassNames[orientation])
}

const timelineMarkerAxisClassNames: Record<TimelineOrientation, string> = {
  [TimelineOrientation.Vertical]: 'w-6 flex-col items-center self-stretch',
  [TimelineOrientation.Horizontal]: 'h-6 w-full items-center justify-center',
}

export function timelineMarkerClassName(orientation: TimelineOrientation) {
  return cn('relative flex shrink-0', timelineMarkerAxisClassNames[orientation])
}

const timelineMarkerBoxSizeClassNames: Record<TimelineMarkerSize, string> = {
  [TimelineMarkerSize.Default]: 'size-6 [&_svg]:size-4',
  [TimelineMarkerSize.Small]: 'my-1 size-4 [&_svg]:size-3',
}

export function timelineMarkerBoxClassName(
  size: TimelineMarkerSize,
  bordered: boolean,
) {
  return cn(
    'flex shrink-0 items-center justify-center rounded-full',
    timelineMarkerBoxSizeClassNames[size],
    bordered && 'border-border text-foreground border bg-background',
  )
}

const timelineMarkerDotSizeClassNames: Record<TimelineMarkerSize, string> = {
  [TimelineMarkerSize.Default]: 'size-3',
  [TimelineMarkerSize.Small]: 'size-2',
}

export function timelineMarkerDotClassName(size: TimelineMarkerSize) {
  return cn(
    'bg-muted-foreground rounded-full',
    timelineMarkerDotSizeClassNames[size],
  )
}

const timelineHorizontalConnectorSpanClassNames: Record<
  TimelineMarkerSize,
  string
> = {
  [TimelineMarkerSize.Default]:
    'left-[calc(50%+0.75rem)] w-[calc(100%+var(--timeline-spacing)-1.5rem)]',
  [TimelineMarkerSize.Small]:
    'left-[calc(50%+0.5rem)] w-[calc(100%+var(--timeline-spacing)-1rem)]',
}

const timelineConnectorAxisClassNames: Record<TimelineOrientation, string> = {
  [TimelineOrientation.Vertical]:
    'w-0.5 flex-1 mb-[calc(var(--timeline-spacing)*-1)]',
  [TimelineOrientation.Horizontal]: 'absolute top-1/2 h-0.5 -translate-y-1/2',
}

export function timelineConnectorClassName(
  orientation: TimelineOrientation,
  size: TimelineMarkerSize,
) {
  return cn(
    'bg-border',
    timelineConnectorAxisClassNames[orientation],
    orientation === TimelineOrientation.Horizontal &&
      timelineHorizontalConnectorSpanClassNames[size],
  )
}

export const timelineContentClassName = 'flex min-w-0 flex-col gap-1'

export const timelineTitleClassName = cn(
  'font-heading text-foreground text-base leading-6 font-semibold',
  '[&_a]:text-foreground [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4',
  '[&_a]:decoration-muted-foreground',
  '[&_a]:transition-colors [&_a]:duration-(--motion-fast)',
  '[&_a]:hover:decoration-foreground [&_a]:active:decoration-foreground',
)

export const timelineDescriptionClassName = 'text-muted-foreground text-sm'
