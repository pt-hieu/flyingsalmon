import { Input } from '@/registry/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'

export function TabsKeepPanelState() {
  return (
    <Tabs defaultValue="notes" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="places">Places</TabsTrigger>
      </TabsList>
      <TabsContent value="notes" forceMount className="pt-4">
        <Input label="Note for the trip" placeholder="Book Sintra tickets" />
      </TabsContent>
      <TabsContent
        value="places"
        className="text-muted-foreground pt-4 text-sm"
      >
        Alfama, Belém, and Time Out Market.
      </TabsContent>
    </Tabs>
  )
}
