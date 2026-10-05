import { Switch } from '@/registry/ui/switch'

const places = ['Alfama walking tour', 'Time Out Market lunch']

export function SwitchWithoutALabel() {
  return (
    <ul className="flex w-full max-w-sm flex-col gap-2 text-sm">
      {places.map((place) => (
        <li key={place} className="flex items-center justify-between">
          {place}
          <Switch aria-label={`Remind me about ${place}`} defaultChecked />
        </li>
      ))}
    </ul>
  )
}
