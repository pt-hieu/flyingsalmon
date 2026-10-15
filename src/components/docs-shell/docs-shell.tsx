import { ComponentSidebar } from '@/components/component-sidebar'
import { SiteHeader } from '@/components/site-header'

import {
  docsShellBodyClassName,
  docsShellClassName,
  docsShellColumnsClassName,
  docsShellMainClassName,
  skipLinkClassName,
} from './classnames'
import { DocsShellContext } from './context'
import { mainContentId } from './main-content-id'

export interface DocsShellProps {
  children: React.ReactNode
}

export function DocsShell({ children }: DocsShellProps) {
  return (
    <DocsShellContext value={true}>
      <div className={docsShellClassName}>
        <a href={`#${mainContentId}`} className={skipLinkClassName}>
          Skip to content
        </a>
        <SiteHeader />
        <div className={docsShellBodyClassName}>
          <div className={docsShellColumnsClassName}>
            <ComponentSidebar />
            <main
              id={mainContentId}
              tabIndex={-1}
              className={docsShellMainClassName}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </DocsShellContext>
  )
}
