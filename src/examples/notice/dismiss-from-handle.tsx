import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { offsetFocusRingGeometry } from '@/registry/lib/interaction'
import { AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'
import { useNotice } from '@/registry/ui/notice'
import type { NoticeHandle } from '@/registry/ui/notice'

export function NoticeDismissFromHandle() {
  const { show } = useNotice()
  const noticeHandle = useRef<NoticeHandle | null>(null)
  const [tripVisible, setTripVisible] = useState(false)

  function openTheTrip() {
    setTripVisible(true)
    noticeHandle.current?.dismiss()
  }

  function saveTheTrip() {
    setTripVisible(false)
    noticeHandle.current = show({
      variant: AlertVariant.Success,
      title: 'Trip saved',
      description: 'Six days in Lisbon, ready to share.',
      subject: (
        <button
          type="button"
          onClick={openTheTrip}
          className={cn(
            offsetFocusRingGeometry,
            'ring-ring focus-visible:ring-offset-card rounded-sm',
          )}
        >
          Open the trip
        </button>
      ),
    })
  }

  return (
    <>
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Small}
        onClick={saveTheTrip}
      >
        Save the trip
      </Button>
      {tripVisible ? (
        <p className="border-border bg-card text-card-foreground rounded-lg border px-4 py-3 text-sm">
          Lisbon, six days
        </p>
      ) : null}
    </>
  )
}
