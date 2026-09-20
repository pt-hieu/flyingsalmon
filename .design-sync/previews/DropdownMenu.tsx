import {
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuAlign,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemVariant,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from 'flyingsalmon'
import { Copy, Ellipsis, Pencil, Trash2 } from 'lucide-react'

export function Actions() {
  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.IconSmall}
          aria-label="Trip actions"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={DropdownMenuAlign.Start}>
        <DropdownMenuLabel>Weekend in Kyoto</DropdownMenuLabel>
        <DropdownMenuItem icon={<Pencil />}>
          Rename
          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          icon={<Trash2 />}
          variant={DropdownMenuItemVariant.Destructive}
        >
          Delete trip
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Groups() {
  return (
    <Card className="w-72">
      <CardHeader className="flex-row items-start justify-between gap-2">
        <CardTitle>Weekend in Kyoto</CardTitle>
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.IconSmall}
              aria-label="Trip actions"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={DropdownMenuAlign.End}>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Manage</DropdownMenuLabel>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem disabled>Archive</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Go</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <a href="/trips/kyoto">View itinerary</a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant={DropdownMenuItemVariant.Destructive}>
              Delete trip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Temples in the morning, tea in the afternoon, a river walk at dusk.
      </CardContent>
    </Card>
  )
}
