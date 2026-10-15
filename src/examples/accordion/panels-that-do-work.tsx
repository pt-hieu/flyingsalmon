import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/ui/accordion'
import { Alert, AlertSize, AlertVariant } from '@/registry/ui/alert'
import { Button, ButtonSize } from '@/registry/ui/button'
import { Checkbox } from '@/registry/ui/checkbox'
import { Input } from '@/registry/ui/input'

const packingItems = ['Two-pin adapter', 'Rain shell', 'Passport and copies']

export function AccordionPanelsThatDoWork() {
  const [note, setNote] = useState('')
  const [noteError, setNoteError] = useState<string>()
  const [sending, setSending] = useState(false)
  const [noteSent, setNoteSent] = useState(false)

  async function sendNote() {
    if (!note.trim()) {
      setNoteError('Write the note before sending it.')
      return
    }

    setNoteSent(false)
    setSending(true)

    try {
      await waitForServer()
      setNoteSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Accordion className="w-full max-w-sm" defaultValue={['note']}>
      <AccordionItem value="note">
        <AccordionTrigger>Note for the host</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-3">
            <Input
              label="Arrival note"
              placeholder="Landing late, around 23:00"
              value={note}
              error={noteError}
              onChange={(event) => {
                setNote(event.target.value)
                setNoteError(undefined)
              }}
            />
            <div className="flex justify-end">
              <Button
                size={ButtonSize.Small}
                loading={sending}
                onClick={sendNote}
              >
                Send to host
              </Button>
            </div>
            <Alert
              size={AlertSize.Small}
              variant={AlertVariant.Success}
              open={noteSent}
            >
              The host has your note.
            </Alert>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="packing">
        <AccordionTrigger>Packing list</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2">
            {packingItems.map((item) => (
              <Checkbox key={item} label={item} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function waitForServer() {
  return new Promise((resolve) => setTimeout(resolve, 1200))
}
