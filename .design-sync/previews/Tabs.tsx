import {
  Tabs,
  TabsActivationMode,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'flyingsalmon'

export function Default() {
  return (
    <Tabs defaultValue="itinerary" className="w-full max-w-xs">
      <TabsList>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="guests">Guests</TabsTrigger>
        <TabsTrigger value="budget" disabled>
          Budget
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="itinerary"
        className="text-muted-foreground pt-4 text-sm"
      >
        Day-by-day stops, from arrival to departure.
      </TabsContent>
      <TabsContent
        value="guests"
        className="text-muted-foreground pt-4 text-sm"
      >
        Who is coming and what they are covering.
      </TabsContent>
    </Tabs>
  )
}

export function Automatic() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        A summary of the trip: dates, destination, and travellers.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground pt-4 text-sm"
      >
        A log of every change made to the itinerary.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-muted-foreground pt-4 text-sm"
      >
        Notification and sharing preferences for this trip.
      </TabsContent>
    </Tabs>
  )
}

export function Manual() {
  return (
    <Tabs
      defaultValue="overview"
      activationMode={TabsActivationMode.Manual}
      className="w-full max-w-sm"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        A summary of the trip: dates, destination, and travellers.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground pt-4 text-sm"
      >
        A log of every change made to the itinerary.
      </TabsContent>
      <TabsContent
        value="settings"
        className="text-muted-foreground pt-4 text-sm"
      >
        Notification and sharing preferences for this trip.
      </TabsContent>
    </Tabs>
  )
}
