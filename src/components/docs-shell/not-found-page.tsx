import { DocTextLink, StatusPage } from '@/components/doc-page'

import { InDocsShell } from './in-docs-shell'

export function NotFoundPage() {
  return (
    <InDocsShell>
      <StatusPage
        title="Page not found"
        lead={
          <>
            Nothing lives at this address. Every component and foundation is
            listed on the <DocTextLink to="/">home page</DocTextLink>.
          </>
        }
      />
    </InDocsShell>
  )
}
