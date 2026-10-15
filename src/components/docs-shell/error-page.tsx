import type { ErrorComponentProps } from '@tanstack/react-router'

import { DocTextLink, StatusPage } from '@/components/doc-page'
import { Button } from '@/registry/ui/button'

import { InDocsShell } from './in-docs-shell'

export function ErrorPage({ reset }: ErrorComponentProps) {
  return (
    <InDocsShell>
      <StatusPage
        title="This page failed to load"
        lead={
          <>
            Something broke while showing it. Try again, or go back to the{' '}
            <DocTextLink to="/">home page</DocTextLink>.
          </>
        }
        actions={<Button onClick={reset}>Try again</Button>}
      />
    </InDocsShell>
  )
}
