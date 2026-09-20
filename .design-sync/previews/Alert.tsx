import {
  Alert,
  AlertDescription,
  AlertSize,
  AlertTitle,
  AlertVariant,
  Button,
  ButtonSize,
  ButtonVariant,
} from 'flyingsalmon'

export function Variants() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert animateOpen={false}>Saved as a draft</Alert>
      <Alert variant={AlertVariant.Success} animateOpen={false}>
        Trip saved
      </Alert>
      <Alert variant={AlertVariant.Warning} animateOpen={false}>
        Two seats left at this price
      </Alert>
      <Alert variant={AlertVariant.Error} animateOpen={false}>
        The payment failed
      </Alert>
    </div>
  )
}

export function TitleAndDescription() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant={AlertVariant.Success} animateOpen={false}>
        <AlertTitle>Trip saved</AlertTitle>
        <AlertDescription>
          Six days in Da Nang, ready to share.
        </AlertDescription>
      </Alert>
      <Alert variant={AlertVariant.Error} animateOpen={false}>
        <AlertTitle>The payment failed</AlertTitle>
        <AlertDescription>
          Your card was declined. Try another card.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function Actions() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <Alert
        variant={AlertVariant.Error}
        onClose={() => {}}
        animateOpen={false}
      >
        <AlertTitle>The payment failed</AlertTitle>
        <AlertDescription>Your card was declined.</AlertDescription>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Small}>
            Try again
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Small}>
            Another card
          </Button>
        </div>
      </Alert>
    </div>
  )
}

export function Sizes() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <Alert variant={AlertVariant.Success} animateOpen={false}>
        Trip saved
      </Alert>
      <Alert
        variant={AlertVariant.Success}
        size={AlertSize.Small}
        animateOpen={false}
      >
        Trip saved
      </Alert>
    </div>
  )
}
