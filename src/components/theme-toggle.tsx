import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'

const toggle = () => {
  const dark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggle}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:ring-ring [&_svg]:size-4',
        offsetFocusRingGeometry,
      )}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </button>
  )
}
