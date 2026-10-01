import { Compass, Link2Off, Wallet } from 'lucide-react'

import {
  Button,
  ButtonVariant,
  Card,
  CardContent,
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateKind,
  EmptyStateSize,
  EmptyStateSticker,
  EmptyStateTitle,
} from 'flyingsalmon'
import type { StickerRoleClassNames } from 'flyingsalmon'

import { routeStickerArt } from '../../src/components/route-sticker-art'
import { snappedPencilStickerArt } from '../../src/components/snapped-pencil-sticker-art'

const routeRoleClassNames: StickerRoleClassNames = {
  ink: { fill: 'fill-foreground', stroke: 'stroke-foreground' },
  trail: { stroke: 'stroke-foreground' },
  paper: { fill: 'fill-card' },
  fold: { fill: 'fill-muted' },
  water: { fill: 'fill-group-sky-soft' },
  hill: { stroke: 'stroke-group-teal' },
  start: { fill: 'fill-group-pink' },
  pin: { fill: 'fill-primary' },
  pencil: { fill: 'fill-group-cyan' },
  wood: { fill: 'fill-accent' },
  eraser: { fill: 'fill-group-pink' },
}

const snappedPencilRoleClassNames: StickerRoleClassNames = {
  ink: { fill: 'fill-foreground', stroke: 'stroke-foreground' },
  paper: { fill: 'fill-card' },
  margin: { stroke: 'stroke-group-pink' },
  pencil: { fill: 'fill-group-cyan' },
  wood: { fill: 'fill-accent' },
  eraser: { fill: 'fill-group-pink' },
}

export function WithSticker() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState>
        <EmptyStateSticker
          art={routeStickerArt}
          label="A folded map with a route drawn to a pin"
          roleClassNames={routeRoleClassNames}
          popIn={false}
        />
        <EmptyStateTitle>Your route is on its way</EmptyStateTitle>
        <EmptyStateDescription>
          The cities, flights, and trains appear here as soon as the route is
          drafted. You can leave this page; it keeps going.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button variant={ButtonVariant.Outline}>Back to your trips</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}

export function ErrorState() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState kind={EmptyStateKind.Error}>
        <EmptyStateSticker
          art={snappedPencilStickerArt}
          label="A pencil with its tip snapped off, lying on a half-written page"
          roleClassNames={snappedPencilRoleClassNames}
          popIn={false}
        />
        <EmptyStateTitle>Generation failed</EmptyStateTitle>
        <EmptyStateDescription>
          All 12 credits are back in your wallet. Your Brief is saved; try again
          or change it first.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Try again</Button>
          <Button variant={ButtonVariant.Outline}>Edit the Brief</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}

export function Default() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState>
        <EmptyStateIcon>
          <Compass />
        </EmptyStateIcon>
        <EmptyStateTitle>No trips yet</EmptyStateTitle>
        <EmptyStateDescription>
          Tell hottrip where you want to go and it drafts the route.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Plan a trip</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}

export function TwoActions() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState>
        <EmptyStateIcon>
          <Compass />
        </EmptyStateIcon>
        <EmptyStateTitle>No trips yet</EmptyStateTitle>
        <EmptyStateDescription>
          Tell hottrip where you want to go and it drafts the route.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Plan a trip</Button>
          <Button variant={ButtonVariant.Outline}>Browse ideas</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}

export function InCard() {
  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardContent>
          <EmptyState size={EmptyStateSize.Small}>
            <EmptyStateIcon>
              <Wallet />
            </EmptyStateIcon>
            <EmptyStateTitle>No credits yet</EmptyStateTitle>
            <EmptyStateDescription>
              Credits pay for route and activity generation.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button>Buy credits</Button>
            </EmptyStateActions>
          </EmptyState>
        </CardContent>
      </Card>
    </div>
  )
}

export function ExpiredLink() {
  return (
    <div className="w-full max-w-sm">
      <EmptyState>
        <EmptyStateIcon>
          <Link2Off />
        </EmptyStateIcon>
        <EmptyStateTitle>This trip link has expired</EmptyStateTitle>
        <EmptyStateDescription>
          The owner stopped sharing it, or the trip was deleted.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button>Plan your own trip</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}
