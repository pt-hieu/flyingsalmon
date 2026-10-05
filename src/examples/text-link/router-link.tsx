import { Link } from '@tanstack/react-router'

import { TextLink } from '@/registry/ui/text-link'

export function TextLinkRouterLink() {
  return (
    <p className="max-w-sm text-sm">
      Every trip page is built from the{' '}
      <TextLink asChild>
        <Link to="/">registry components</Link>
      </TextLink>
      .
    </p>
  )
}
