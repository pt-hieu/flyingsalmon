import { ArrowUpRight } from 'lucide-react'

import { TextLink } from '@/registry/ui/text-link'

export function TextLinkExternalLink() {
  return (
    <p className="max-w-sm text-sm">
      Japan&rsquo;s rail passes are explained on{' '}
      <TextLink
        href="https://www.japan.travel"
        target="_blank"
        rel="noreferrer"
      >
        japan.travel
        <ArrowUpRight aria-hidden="true" />
      </TextLink>
      , which lists every regional option.
    </p>
  )
}
