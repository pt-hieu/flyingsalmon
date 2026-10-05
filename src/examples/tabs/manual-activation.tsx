import {
  Tabs,
  TabsActivationMode,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/ui/tabs'

export function TabsManualActivation() {
  return (
    <Tabs
      defaultValue="overview"
      activationMode={TabsActivationMode.Manual}
      className="w-full max-w-sm"
    >
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="text-muted-foreground pt-4 text-sm"
      >
        Dates, destination, and travellers for Lisbon long weekend.
      </TabsContent>
      <TabsContent value="map" className="text-muted-foreground pt-4 text-sm">
        An interactive map that loads when you open it.
      </TabsContent>
      <TabsContent
        value="photos"
        className="text-muted-foreground pt-4 text-sm"
      >
        A gallery of photos from past visits.
      </TabsContent>
    </Tabs>
  )
}
