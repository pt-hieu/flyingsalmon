import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertVariant,
} from '@/registry/ui/alert'
import { TextLink } from '@/registry/ui/text-link'

export function TextLinkInsideMutedText() {
  return (
    <div className="w-full max-w-sm">
      <Alert variant={AlertVariant.Warning} animateOpen={false}>
        <AlertTitle>Two travellers have no passport on file</AlertTitle>
        <AlertDescription>
          Add their documents on the{' '}
          <TextLink href="#travellers">travellers page</TextLink> before you
          book.
        </AlertDescription>
      </Alert>
    </div>
  )
}
