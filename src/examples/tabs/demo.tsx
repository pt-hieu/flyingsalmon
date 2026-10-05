import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export function TabsDemo() {
  return (
    <Tabs defaultValue="itinerary" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="travellers">Travellers</TabsTrigger>
      </TabsList>
      <TabsContent
        value="itinerary"
        className="text-muted-foreground pt-4 text-sm"
      >
        Three days in Lisbon, one plan each morning.
      </TabsContent>
      <TabsContent
        value="places"
        className="text-muted-foreground pt-4 text-sm"
      >
        Alfama, Belém, and Time Out Market.
      </TabsContent>
      <TabsContent
        value="travellers"
        className="text-muted-foreground pt-4 text-sm"
      >
        Brian Nguyen is the only traveller so far.
      </TabsContent>
    </Tabs>
  )
}
