import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export function TabsUsage() {
  return (
    <Tabs defaultValue="itinerary">
      <TabsList>
        <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        <TabsTrigger value="places">Places</TabsTrigger>
      </TabsList>
      <TabsContent value="itinerary">Three days in Lisbon.</TabsContent>
      <TabsContent value="places">Alfama and Belém.</TabsContent>
    </Tabs>
  )
}
