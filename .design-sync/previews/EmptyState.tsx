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
  EmptyStateSize,
  EmptyStateTitle,
} from 'flyingsalmon'

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
