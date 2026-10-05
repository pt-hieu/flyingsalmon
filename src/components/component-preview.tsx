import { CalendarClock, Compass, Ellipsis, Lock, MapPinned } from 'lucide-react'

import type { ComponentRoute } from '@/components/component-catalog'
import { houseStickerArt } from '@/components/house-sticker-art'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { snappedPencilStickerArt } from '@/components/snapped-pencil-sticker-art'
import {
  snappedPencilStickerLabel,
  snappedPencilStickerRoleClassNames,
} from '@/components/snapped-pencil-sticker'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'
import { Alert, AlertSize, AlertTitle, AlertVariant } from '@/registry/ui/alert'
import { Avatar, AvatarColor, AvatarSize } from '@/registry/ui/avatar'
import { AvatarGroup } from '@/registry/ui/avatar-group'
import { Badge, BadgeVariant } from '@/registry/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/registry/ui/breadcrumb'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { Calendar } from '@/registry/ui/calendar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'
import { Checkbox } from '@/registry/ui/checkbox'
import {
  Combobox,
  ComboboxItem,
  ComboboxMode,
  ComboboxSize,
} from '@/registry/ui/combobox'
import { DatePicker, DatePickerSize } from '@/registry/ui/date-picker'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/registry/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/ui/dropdown-menu'
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateSize,
  EmptyStateSticker,
  EmptyStateTitle,
  EmptyStateTitleElement,
} from '@/registry/ui/empty-state'
import { ErrorState } from '@/registry/ui/error-state'
import { Form, FormActions } from '@/registry/ui/form'
import { IconTooltip } from '@/registry/ui/icon-tooltip'
import { Input, InputSize } from '@/registry/ui/input'
import { NumberField } from '@/registry/ui/number-field'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle,
} from '@/registry/ui/page-header'
import { Pagination } from '@/registry/ui/pagination'
import { Progress } from '@/registry/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/registry/ui/radio-group'
import { Select, SelectItem, SelectSize } from '@/registry/ui/select'
import { Separator } from '@/registry/ui/separator'
import { SidebarGroup, SidebarHeader, SidebarNav } from '@/registry/ui/sidebar'
import { Skeleton } from '@/registry/ui/skeleton'
import { Slider } from '@/registry/ui/slider'
import { Spinner } from '@/registry/ui/spinner'
import { Stepper } from '@/registry/ui/stepper'
import { Sticker } from '@/registry/ui/sticker'
import { Switch } from '@/registry/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'
import { Textarea } from '@/registry/ui/textarea'
import { TextLink } from '@/registry/ui/text-link'
import {
  Timeline,
  TimelineItem,
  TimelineMarker,
  TimelineOrientation,
} from '@/registry/ui/timeline'
import { ToggleGroup, ToggleGroupItem } from '@/registry/ui/toggle-group'
import { Tooltip } from '@/registry/ui/tooltip'

const previewByRoute: Record<ComponentRoute, React.ReactNode> = {
  '/components/button': (
    <div className="flex items-center gap-2">
      <Button size={ButtonSize.Small}>Book trip</Button>
      <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
        Cancel
      </Button>
    </div>
  ),

  '/components/calendar': (
    <div className="[zoom:0.42]">
      <Calendar aria-label="Trip dates" />
    </div>
  ),

  '/components/checkbox': (
    <div className="flex flex-col gap-2 text-sm">
      <Checkbox label="Flights" defaultChecked />
      <Checkbox label="Hotels" />
    </div>
  ),

  '/components/combobox': (
    <div className="w-56">
      <Combobox
        mode={ComboboxMode.Single}
        size={ComboboxSize.Small}
        label="Destination"
        placeholder="Search a place"
        value={null}
        onValueChange={() => {}}
      >
        <ComboboxItem value="tokyo">Tokyo</ComboboxItem>
        <ComboboxItem value="lisbon">Lisbon</ComboboxItem>
      </Combobox>
    </div>
  ),

  '/components/date-picker': (
    <div className="w-56">
      <DatePicker
        size={DatePickerSize.Small}
        label="Departure"
        defaultValue="2026-03-04"
      />
    </div>
  ),

  '/components/form': (
    <Form className="w-56">
      <Input label="Destination" placeholder="Lisbon" size={InputSize.Small} />
      <FormActions>
        <Button size={ButtonSize.Small}>Save trip</Button>
      </FormActions>
    </Form>
  ),

  '/components/input': (
    <Input
      className="w-56"
      label="Destination"
      placeholder="Lisbon"
      size={InputSize.Small}
    />
  ),

  '/components/number-field': (
    <NumberField
      className="w-40"
      label="Guests"
      defaultValue={2}
      min={1}
      max={8}
    />
  ),

  '/components/radio-group': (
    <RadioGroup className="w-40" label="Room" defaultValue="shared">
      <RadioGroupItem value="shared" label="Shared" />
      <RadioGroupItem value="private" label="Private" />
    </RadioGroup>
  ),

  '/components/select': (
    <Select className="w-40" size={SelectSize.Small} placeholder="Currency">
      <SelectItem value="usd">US Dollar</SelectItem>
      <SelectItem value="eur">Euro</SelectItem>
    </Select>
  ),

  '/components/slider': (
    <Slider
      className="w-56"
      label="Pace"
      min={0}
      max={4}
      value={2}
      description="Two plans a day"
      onValueChange={() => {}}
    />
  ),

  '/components/switch': (
    <div className="flex flex-col gap-2">
      <Switch label="Share trip" defaultChecked />
      <Switch label="Let others edit" />
    </div>
  ),

  '/components/textarea': (
    <Textarea
      className="w-56"
      label="Notes"
      placeholder="Add a note"
      minRows={2}
    />
  ),

  '/components/toggle-group': (
    <ToggleGroup className="w-56" label="Pace" defaultValue="steady">
      <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
      <ToggleGroupItem value="steady">Steady</ToggleGroupItem>
      <ToggleGroupItem value="packed">Packed</ToggleGroupItem>
    </ToggleGroup>
  ),

  '/components/avatar': (
    <div className="flex items-center gap-2">
      <Avatar name="Brian Nguyen" color={AvatarColor.Blue} />
      <Avatar
        name="Linh Tran"
        size={AvatarSize.Small}
        color={AvatarColor.Teal}
      />
    </div>
  ),

  '/components/avatar-group': (
    <AvatarGroup
      aria-label="Trip members"
      items={[
        { id: 'brian', name: 'Brian Nguyen', color: AvatarColor.Sky },
        { id: 'linh', name: 'Linh Tran', color: AvatarColor.Teal },
        {
          id: 'minh',
          name: 'Minh Pham',
          color: AvatarColor.Fuchsia,
        },
      ]}
    />
  ),

  '/components/badge': (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant={BadgeVariant.Success}>Success</Badge>
      <Badge variant={BadgeVariant.Outline}>Outline</Badge>
    </div>
  ),

  '/components/icon-tooltip': (
    <div className="bg-background text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-xs [&_svg]:size-4">
      <span className="text-foreground">Day 1</span>
      <IconTooltip content="Locked, so the AI won’t change it">
        <Lock aria-hidden />
      </IconTooltip>
      <IconTooltip content="Tied to this date">
        <CalendarClock aria-hidden />
      </IconTooltip>
    </div>
  ),

  '/components/separator': (
    <div className="bg-background text-muted-foreground flex w-40 flex-col gap-2 rounded-lg p-3 text-xs">
      <span>Flights</span>
      <Separator />
      <span>Hotels</span>
    </div>
  ),

  '/components/sticker': (
    <Sticker
      art={houseStickerArt}
      label={houseStickerLabel}
      roleClassNames={houseStickerRoleClassNames}
      popIn={false}
      className="w-40 -rotate-2"
    />
  ),

  '/components/table': (
    <div className="w-56 [zoom:0.9]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Stop</TableHeadCell>
            <TableHeadCell>Nights</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Kyoto</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tokyo</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),

  '/components/timeline': (
    <Timeline orientation={TimelineOrientation.Horizontal}>
      <TimelineItem>
        <TimelineMarker />
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker />
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker />
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker />
      </TimelineItem>
    </Timeline>
  ),

  '/components/tooltip': (
    <Tooltip content="Copy link">
      <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
        Share
      </Button>
    </Tooltip>
  ),

  '/components/alert': (
    <Alert
      variant={AlertVariant.Success}
      size={AlertSize.Small}
      className="w-56"
    >
      <AlertTitle>Trip saved</AlertTitle>
    </Alert>
  ),

  '/components/empty-state': (
    <EmptyState size={EmptyStateSize.Small}>
      <EmptyStateIcon>
        <Compass />
      </EmptyStateIcon>
      <EmptyStateTitle as={EmptyStateTitleElement.H3}>
        No trips yet
      </EmptyStateTitle>
    </EmptyState>
  ),

  '/components/error-state': (
    <ErrorState size={EmptyStateSize.Small}>
      <EmptyStateSticker
        art={snappedPencilStickerArt}
        label={snappedPencilStickerLabel}
        roleClassNames={snappedPencilStickerRoleClassNames}
        popIn={false}
        className="w-28"
      />
      <EmptyStateTitle as={EmptyStateTitleElement.H3}>
        Generation failed
      </EmptyStateTitle>
    </ErrorState>
  ),

  '/components/notice': (
    <Alert
      variant={AlertVariant.Info}
      size={AlertSize.Small}
      className="w-60"
      onClose={() => {}}
    >
      <AlertTitle>Link copied</AlertTitle>
      <span className="text-card-foreground w-fit text-xs underline underline-offset-4">
        View the trip
      </span>
    </Alert>
  ),

  '/components/progress': (
    <Progress className="w-56" value={62} label="Building your trip" />
  ),

  '/components/skeleton': (
    <div className="flex w-56 flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),

  '/components/spinner': <Spinner />,

  '/components/accordion': (
    <Accordion className="w-56">
      <AccordionItem value="flights">
        <AccordionTrigger>Flights</AccordionTrigger>
        <AccordionContent>Haneda to Itami, two seats.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="stays">
        <AccordionTrigger>Stays</AccordionTrigger>
        <AccordionContent>Three nights in a ryokan near Gion.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  '/components/card': (
    <Card className="w-56">
      <CardHeader>
        <CardTitle>Weekend in Kyoto</CardTitle>
        <CardDescription>Three days, ten stops</CardDescription>
      </CardHeader>
    </Card>
  ),

  '/components/dialog': (
    <Dialog>
      <DialogTrigger>
        <Button size={ButtonSize.Small}>New trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New trip</DialogTitle>
      </DialogContent>
    </Dialog>
  ),

  '/components/drawer': (
    <Drawer>
      <DrawerTrigger>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
          Filter trips
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Filter trips</DrawerTitle>
      </DrawerContent>
    </Drawer>
  ),

  '/components/dropdown-menu': (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.IconSmall}
          aria-label="Trip actions"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  '/components/page-header': (
    <div className="w-56">
      <PageHeader>
        <PageHeaderTitle>Trips</PageHeaderTitle>
        <PageHeaderActions>
          <Button size={ButtonSize.Small}>Plan a trip</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  ),

  '/components/breadcrumb': (
    <Breadcrumb>
      <BreadcrumbItem link href="#">
        Trips
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem active>Kyoto</BreadcrumbItem>
    </Breadcrumb>
  ),

  '/components/pagination': <Pagination page={2} pageCount={5} />,

  '/components/sidebar': (
    <div className="border-border bg-background flex w-40 flex-col overflow-hidden rounded-lg border">
      <SidebarHeader className="border-border border-b">
        <Avatar name="Trip Co" size={AvatarSize.Small} />
      </SidebarHeader>
      <SidebarNav aria-label="Primary" className="p-2">
        <SidebarGroup className="flex flex-col gap-1">
          <div className="text-foreground flex h-7 items-center gap-2 px-1 text-xs">
            <Compass className="size-3.5" />
            Explore
          </div>
          <div className="text-muted-foreground flex h-7 items-center gap-2 px-1 text-xs">
            <MapPinned className="size-3.5" />
            Trips
          </div>
        </SidebarGroup>
      </SidebarNav>
    </div>
  ),

  '/components/stepper': (
    <div className="w-56">
      <Stepper count={4} current={2} label="Trip planning" />
    </div>
  ),

  '/components/tabs': (
    <Tabs defaultValue="overview" className="w-56">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Trip summary and highlights.</TabsContent>
      <TabsContent value="activity">Recent activity.</TabsContent>
    </Tabs>
  ),

  '/components/text-link': (
    <TextLink href="#itinerary">View itinerary</TextLink>
  ),
}

export function ComponentPreview({ to }: { to: ComponentRoute }) {
  return previewByRoute[to]
}
