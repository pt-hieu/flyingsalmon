import { Link } from '@tanstack/react-router'

import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-heading text-lg font-bold tracking-tight"
          >
            flying<span className="text-primary">salmon</span>
          </Link>
          <Link
            to="/components/spinner"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Spinner
          </Link>
          <Link
            to="/components/input"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Input
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
