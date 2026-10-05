import { AlertVariant } from '@/registry/ui/alert'
import { NoticeProvider, useNotice } from '@/registry/ui/notice'

export function AppShell({ children }: { children: React.ReactNode }) {
  return <NoticeProvider>{children}</NoticeProvider>
}

export function SaveTripButton() {
  const { show } = useNotice()

  function saveTrip() {
    show({
      variant: AlertVariant.Success,
      title: 'Trip saved',
      subject: <a href="/trips/lisbon">View the trip</a>,
    })
  }

  return (
    <button type="button" onClick={saveTrip}>
      Save
    </button>
  )
}
