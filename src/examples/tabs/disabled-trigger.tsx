import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export function TabsDisabledTrigger() {
  return (
    <Tabs defaultValue="itinerary" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="receipts" disabled>
          Receipts
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="itinerary"
        className="text-muted-foreground pt-4 text-sm"
      >
        Three days in Lisbon, one plan each morning.
      </TabsContent>
      <TabsContent
        value="bookings"
        className="text-muted-foreground pt-4 text-sm"
      >
        Nothing is booked yet.
      </TabsContent>
    </Tabs>
  )
}
