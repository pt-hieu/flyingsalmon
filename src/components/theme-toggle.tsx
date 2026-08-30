import { Moon, Sun } from 'lucide-react'

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
      className="inline-flex size-8 items-center justify-center rounded-lg text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring [&_svg]:size-4"
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </button>
  )
}
