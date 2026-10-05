import { Link } from '@tanstack/react-router'
import { MapPin, Pencil } from 'lucide-react'

import { Button, ButtonVariant } from '@/registry/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'

export function DropdownMenuNavigationItem() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={ButtonVariant.Outline}>Kyoto in autumn</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Pencil />} onSelect={() => undefined}>
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem icon={<MapPin />} asChild>
          <Link to="/components/card">View itinerary</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
