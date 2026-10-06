import { Link } from '@tanstack/react-router'

import { TextLink } from '@/registry/ui/text-link'

import type { DocRoute } from './types'

export interface DocTextLinkProps {
  to: DocRoute
  children: React.ReactNode
}

export function DocTextLink({ to, children }: DocTextLinkProps) {
  return (
    <TextLink asChild>
      <Link to={to}>{children}</Link>
    </TextLink>
  )
}
