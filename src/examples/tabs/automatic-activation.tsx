import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export function TabsAutomaticActivation() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="sharing">Sharing</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        Dates, destination, and travellers for Lisbon long weekend.
      </TabsContent>
      <TabsContent
        value="activity"
        className="text-muted-foreground pt-4 text-sm"
      >
        Every change made to the itinerary.
      </TabsContent>
      <TabsContent
        value="sharing"
        className="text-muted-foreground pt-4 text-sm"
      >
        Who can see and edit this trip.
      </TabsContent>
    </Tabs>
  )
}
