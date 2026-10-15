import { createFileRoute } from '@tanstack/react-router'

import { PageHeaderBesideSidebar } from '@/examples/page-header/beside-sidebar'

export const Route = createFileRoute('/frames/page-header-strip')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
  component: PageHeaderBesideSidebar,
})
