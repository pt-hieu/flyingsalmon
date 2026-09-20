import { RadioGroup, RadioGroupItem, RadioGroupOrientation } from 'flyingsalmon'

export function Basic() {
  return (
    <RadioGroup label="Delivery speed" defaultValue="standard">
      <RadioGroupItem value="standard" label="Standard, 3–5 days" />
      <RadioGroupItem value="express" label="Express, next day" />
      <RadioGroupItem value="overnight" label="Overnight, before 9am" />
    </RadioGroup>
  )
}

export function Horizontal() {
  return (
    <RadioGroup
      label="Seat"
      defaultValue="window"
      orientation={RadioGroupOrientation.Horizontal}
    >
      <RadioGroupItem value="window" label="Window" />
      <RadioGroupItem value="aisle" label="Aisle" />
      <RadioGroupItem value="either" label="Either" />
    </RadioGroup>
  )
}

export function ErrorAndDisabled() {
  return (
    <div className="flex flex-col gap-8">
      <RadioGroup
        label="Delivery speed"
        defaultValue="express"
        error="Overnight is the only speed available today"
      >
        <RadioGroupItem value="standard" label="Standard, 3–5 days" />
        <RadioGroupItem value="express" label="Express, next day" />
        <RadioGroupItem value="overnight" label="Overnight, before 9am" />
      </RadioGroup>
      <RadioGroup label="Gift wrap" defaultValue="none">
        <RadioGroupItem value="none" label="No wrapping" />
        <RadioGroupItem value="paper" label="Recycled paper" />
        <RadioGroupItem value="ribbon" label="Ribbon, out of stock" disabled />
      </RadioGroup>
      <RadioGroup label="Signature on delivery" defaultValue="any" disabled>
        <RadioGroupItem value="any" label="Anyone at the address" />
        <RadioGroupItem value="named" label="Named recipient only" />
      </RadioGroup>
    </div>
  )
}

export function Controlled() {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup label="Payment method" name="payment" value="transfer">
        <RadioGroupItem value="card" label="Card" />
        <RadioGroupItem value="transfer" label="Bank transfer" />
        <RadioGroupItem value="invoice" label="Invoice" />
      </RadioGroup>
      <p className="text-muted-foreground text-sm">Paying by Bank transfer.</p>
    </div>
  )
}
