import { Link } from '@tanstack/react-router'

import { TextLink } from '@/registry/ui/text-link'

export function TextLinkRouterLink() {
  return (
    <p className="max-w-sm text-sm">
      See every day of the route on the{' '}
      <TextLink asChild>
        <Link to="/">trip overview</Link>
      </TextLink>
      .
    </p>
  )
}
