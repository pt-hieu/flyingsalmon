import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { SiteHeader } from '@/components/site-header'
import { TooltipProvider } from '@/registry/ui/tooltip'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'flyingsalmon',
      },
      {
        name: 'description',
        content:
          'flyingsalmon — a bold, warm, social design system by Brian. Distributed as a shadcn registry.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  )
}
