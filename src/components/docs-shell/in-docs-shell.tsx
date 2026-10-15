import { use } from 'react'

import { DocsShellContext } from './context'
import { DocsShell } from './docs-shell'

export interface InDocsShellProps {
  children: React.ReactNode
}

export function InDocsShell({ children }: InDocsShellProps) {
  const insideDocsShell = use(DocsShellContext)

  return insideDocsShell ? children : <DocsShell>{children}</DocsShell>
}
