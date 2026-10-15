import { ArrowUpRight } from 'lucide-react'

import { TextLink } from '@/registry/ui/text-link'

export function TextLinkExternalLink() {
  return (
    <p className="max-w-sm text-sm">
      Japan&rsquo;s rail passes are explained in the{' '}
      <TextLink
        href="https://example.com/rail-passes"
        target="_blank"
        rel="noreferrer"
      >
        rail pass guide
        <ArrowUpRight aria-hidden="true" />
      </TextLink>
      , which lists every regional option.
    </p>
  )
}
