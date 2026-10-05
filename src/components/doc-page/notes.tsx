import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionType,
} from '@/registry/ui/accordion'

import {
  docSectionClassName,
  notesBodyClassName,
  notesTriggerHeadingClassName,
} from './classnames'

export interface NotesProps {
  children: React.ReactNode
}

export function Notes({ children }: NotesProps) {
  return (
    <section aria-labelledby="notes" className={docSectionClassName}>
      <Accordion type={AccordionType.Single}>
        <AccordionItem value="notes">
          <AccordionTrigger asChild>
            <h2 id="notes" className={notesTriggerHeadingClassName}>
              Notes
            </h2>
          </AccordionTrigger>
          <AccordionContent className={notesBodyClassName}>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
