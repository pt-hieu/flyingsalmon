import { Link } from '@tanstack/react-router'

import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-heading text-lg font-bold tracking-tight">
          flying<span className="text-primary">salmon</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
