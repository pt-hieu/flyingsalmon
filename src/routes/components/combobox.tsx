import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { ModePreview } from '@/components/mode-preview'
import { Alert, AlertVariant } from '@/registry/ui/alert'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxMode,
  ComboboxSeparator,
  ComboboxSize,
} from '@/registry/ui/combobox'

export const Route = createFileRoute('/components/combobox')({
  component: ComboboxPage,
})

const PLACES = [
  { value: 'fsq-1', label: 'Reykjavík', description: 'Iceland' },
  { value: 'fsq-2', label: 'Reims', description: 'France' },
  { value: 'fsq-3', label: 'Rennes', description: 'France' },
  { value: 'fsq-4', label: 'Hanoi', description: 'Vietnam' },
  { value: 'fsq-5', label: 'Hakone', description: 'Japan' },
  { value: 'fsq-6', label: 'Halifax', description: 'Canada' },
]

const INTERESTS = [
  { value: 'food', label: 'Food and drink' },
  { value: 'museums', label: 'Museums' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'nightlife', label: 'Nightlife' },
]

function ComboboxPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="space-y-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Combobox
        </h1>
        <p className="text-muted-foreground text-lg">
          A field the user types into, with a panel of the items the app
          supplies for the current text. It takes one value, several as chips,
          or whatever was typed. It owns its label, its error message, and its
          busyness; the app owns the items, the value, and the timing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          The app owns the list
        </h2>
        <p className="text-muted-foreground">
          Combobox never filters, fetches, or debounces.{' '}
          <strong className="text-foreground">
            You pass the items you want shown for the current text, and nothing
            else is shown.
          </strong>{' '}
          That keeps a billed autocomplete call, its debounce, and its
          cancellation in your code, where you can see them. Read the text
          through <code>onInputValueChange</code>, fetch how you like, and
          render the answer as <code>ComboboxItem</code> children.
        </p>
        <p className="text-muted-foreground">
          Six parts are exported: <code>Combobox</code>,{' '}
          <code>ComboboxItem</code>, <code>ComboboxGroup</code>,{' '}
          <code>ComboboxLabel</code>, <code>ComboboxSeparator</code>, and{' '}
          <code>ComboboxEmpty</code>. There is no input, trigger, or content
          part — the root renders all of them, and <code>className</code> styles
          the wrapper that holds the label and the error message.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          A strict place field
        </h2>
        <p className="text-muted-foreground">
          <code>mode</code> is required and has no default. In{' '}
          <code>ComboboxMode.Single</code> without <code>allowFreeText</code>{' '}
          the field is strict: the value is always an item key, and text that
          matches no pick reverts on blur. The demo debounces its own fetch,
          shows <code>loading</code> while the request runs, and renders a{' '}
          <code>ComboboxEmpty</code> when the source comes back with nothing.
          Type <em>r</em> or <em>ha</em> to see matches, or <em>zz</em> to see
          the empty row.
        </p>
        <ModePreview>
          <PlaceFieldDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Groups, separators, and descriptions
        </h2>
        <p className="text-muted-foreground">
          <code>ComboboxGroup</code> is semantics only and takes a{' '}
          <code>ComboboxLabel</code> as its heading;{' '}
          <code>ComboboxSeparator</code> rules a line between groups. An item's
          <code>description</code> sits after its label on the same line and
          truncates; a disabled item stays in the list so positions never shift.
          Open the panel below to see all of it.
        </p>
        <ModePreview>
          <GroupedPlacesDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Free text as the value
        </h2>
        <p className="text-muted-foreground">
          <code>allowFreeText</code> lets the field keep what was typed. A pick
          reports the item's key; text that matches no pick is reported as
          itself on blur. This is the shape a Destination field wants — a
          traveller may be going somewhere your source has never heard of.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">
            A typed string that happens to equal a real item key is
            indistinguishable from a pick.
          </strong>{' '}
          Keys like the place ids above make that collision negligible; keys
          that read like words do not, so key your items with ids rather than
          labels.
        </p>
        <ModePreview>
          <DestinationFieldDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Several values as chips
        </h2>
        <p className="text-muted-foreground">
          <code>ComboboxMode.Multiple</code> takes a <code>string[]</code>{' '}
          value. A pick adds a chip before the caret, keeps the panel open,
          marks the item with a check, and clears the text so the next query
          starts fresh; picking a checked item removes it. Backspace on an empty
          input removes the last chip, ArrowLeft from the start of the caret
          focuses it, and Backspace or Delete there removes it.
        </p>
        <ModePreview>
          <InterestsFieldDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Chips from free text
        </h2>
        <p className="text-muted-foreground">
          With <code>allowFreeText</code> in multiple mode, Enter with nothing
          highlighted turns the typed text into a chip. Comma and blur do not
          commit: commas occur inside place names, and a blur commit turns an
          abandoned keystroke into a value.
        </p>
        <ModePreview>
          <TravellerTagsDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Error and disabled</h2>
        <p className="text-muted-foreground">
          <code>error</code> takes the destructive border and ring, turns the
          label destructive, and renders the message below the field through the
          same <code>FieldErrorMessage</code> as Input; the panel may cover it
          while open. <code>disabled</code> dims the whole field and takes it
          out of the tab order.
        </p>
        <ModePreview>
          <ErrorAndDisabledDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Sizes</h2>
        <p className="text-muted-foreground">
          Two field sizes match Input and Select. Items stay 32px at both sizes,
          and in multiple mode the field grows by rows as chips wrap.
        </p>
        <ModePreview>
          <SizesDemo />
        </ModePreview>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">
          Attribution is app content
        </h2>
        <p className="text-muted-foreground">
          A place source usually requires a credit line. Combobox has no footer
          slot and never will:{' '}
          <strong className="text-foreground">
            the "Powered by" line under the strict place field above is rendered
            by the demo, not by the component.
          </strong>{' '}
          Your source, your wording, your placement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Motion</h2>
        <p className="text-muted-foreground">
          The panel enters and exits on the floating item's anchored keyframe
          pair — scale from <code>0.96</code> plus fade, 250ms on the bounce
          curve in and 150ms on the settle curve out, growing from the field.
          The chevron rotates 180 degrees at <code>--motion-base</code>, and the
          field's border transitions at <code>--motion-fast</code>. Chips enter
          and exit on <code>springSettle</code> and their neighbours reflow with
          motion's <code>layout</code> prop, because a chip displaces the caret.
          The item highlight, the check, the clear button, and the spinner all
          snap.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-bold">Accessibility</h2>
        <p className="text-muted-foreground">
          The input is the only tab stop. The panel opens on typing, ArrowDown,
          ArrowUp, or the chevron, and never on focus alone. Escape closes and
          never clears, because with free text the typed text is the value. Tab
          and Shift-Tab close without selecting and move on — the panel is
          non-modal, unlike Select — and focus never leaves the input when the
          panel opens or closes; the highlighted row is the focus indicator, and
          the input carries <code>aria-activedescendant</code>. The clear and
          chevron buttons are labelled and out of the tab order, so neither adds
          a stop between fields.
        </p>
        <p className="text-muted-foreground">
          The panel registers in the same layer stack as Dialog and
          DropdownMenu, so it opens, positions, and stays clickable inside a
          modal dialog. <code>name</code> posts a hidden input per value — the
          key for a pick, the string for free text — and <code>required</code>{' '}
          sets <code>aria-required</code> on the input.
        </p>
      </section>
    </article>
  )
}

function PlaceFieldDemo() {
  const [text, setText] = useState('')
  const [placeId, setPlaceId] = useState<string | null>(null)
  const [matches, setMatches] = useState<typeof PLACES>([])
  const [loading, setLoading] = useState(false)
  const requestTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => () => clearTimeout(requestTimeout.current), [])

  function searchPlaces(nextText: string) {
    setText(nextText)
    clearTimeout(requestTimeout.current)

    if (nextText.trim().length === 0) {
      setLoading(false)
      setMatches([])
      return
    }

    setLoading(true)

    requestTimeout.current = setTimeout(() => {
      setMatches(
        PLACES.filter((place) =>
          place.label.toLowerCase().startsWith(nextText.trim().toLowerCase()),
        ),
      )
      setLoading(false)
    }, 500)
  }

  const chosenPlace = PLACES.find((place) => place.value === placeId)

  return (
    <div className="flex w-72 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Combobox
          mode={ComboboxMode.Single}
          label="Where are you going?"
          placeholder="Search a place"
          value={placeId}
          onValueChange={setPlaceId}
          inputValue={text}
          onInputValueChange={searchPlaces}
          loading={loading}
        >
          {matches.map((place) => (
            <ComboboxItem
              key={place.value}
              value={place.value}
              description={place.description}
            >
              {place.label}
            </ComboboxItem>
          ))}

          {!loading && text.trim().length > 0 && matches.length === 0 ? (
            <ComboboxEmpty>No place matches that</ComboboxEmpty>
          ) : null}
        </Combobox>

        <p className="text-muted-foreground text-xs">Powered by Foursquare</p>
      </div>

      {chosenPlace ? (
        <Alert variant={AlertVariant.Success}>
          Trip anchored to {chosenPlace.label}
        </Alert>
      ) : null}
    </div>
  )
}

function GroupedPlacesDemo() {
  const [placeId, setPlaceId] = useState<string | null>(null)

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Single}
      label="Departure city"
      placeholder="Search a city"
      value={placeId}
      onValueChange={setPlaceId}
    >
      <ComboboxGroup>
        <ComboboxLabel>Recent</ComboboxLabel>
        <ComboboxItem value="fsq-4" description="Vietnam">
          Hanoi
        </ComboboxItem>
        <ComboboxItem value="fsq-5" description="Japan">
          Hakone
        </ComboboxItem>
      </ComboboxGroup>

      <ComboboxSeparator />

      <ComboboxGroup>
        <ComboboxLabel>Everywhere else</ComboboxLabel>
        <ComboboxItem value="fsq-2" description="France">
          Reims
        </ComboboxItem>
        <ComboboxItem value="fsq-1" description="Iceland" disabled>
          Reykjavík — no flights this season
        </ComboboxItem>
      </ComboboxGroup>
    </Combobox>
  )
}

function DestinationFieldDemo() {
  const [destination, setDestination] = useState<string | null>(null)

  const knownPlace = PLACES.find((place) => place.value === destination)

  return (
    <div className="flex w-72 flex-col gap-3">
      <Combobox
        mode={ComboboxMode.Single}
        allowFreeText
        label="Destination"
        placeholder="Anywhere you like"
        value={destination}
        onValueChange={setDestination}
      >
        {PLACES.map((place) => (
          <ComboboxItem
            key={place.value}
            value={place.value}
            description={place.description}
          >
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>

      {destination ? (
        <Alert variant={AlertVariant.Info}>
          {knownPlace
            ? `Value is the key ${destination}`
            : `Value is the text "${destination}"`}
        </Alert>
      ) : null}
    </div>
  )
}

function InterestsFieldDemo() {
  const [interests, setInterests] = useState<string[]>(['museums'])

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      label="What do you want to do?"
      placeholder="Add an interest"
      value={interests}
      onValueChange={setInterests}
    >
      {INTERESTS.map((interest) => (
        <ComboboxItem key={interest.value} value={interest.value}>
          {interest.label}
        </ComboboxItem>
      ))}
    </Combobox>
  )
}

function TravellerTagsDemo() {
  const [tags, setTags] = useState<string[]>([])

  return (
    <Combobox
      className="w-72"
      mode={ComboboxMode.Multiple}
      allowFreeText
      label="Who is coming?"
      placeholder="Type a name and press Enter"
      value={tags}
      onValueChange={setTags}
    >
      <ComboboxItem value="me">Me</ComboboxItem>
      <ComboboxItem value="partner">My partner</ComboboxItem>
    </Combobox>
  )
}

function ErrorAndDisabledDemo() {
  const [invalidValue, setInvalidValue] = useState<string | null>(null)

  return (
    <div className="flex w-72 flex-col gap-6">
      <Combobox
        mode={ComboboxMode.Single}
        label="Departure city"
        placeholder="Search a city"
        error="Pick a city we fly from"
        value={invalidValue}
        onValueChange={setInvalidValue}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>

      <Combobox
        mode={ComboboxMode.Single}
        disabled
        label="Return city"
        placeholder="Same as departure"
        value={null}
        onValueChange={() => {}}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
    </div>
  )
}

function SizesDemo() {
  const [defaultValue, setDefaultValue] = useState<string | null>(null)
  const [smallValue, setSmallValue] = useState<string | null>(null)

  return (
    <div className="flex w-72 flex-col gap-6">
      <Combobox
        mode={ComboboxMode.Single}
        label="Default"
        placeholder="Search a city"
        value={defaultValue}
        onValueChange={setDefaultValue}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>

      <Combobox
        mode={ComboboxMode.Single}
        size={ComboboxSize.Small}
        label="Small"
        placeholder="Search a city"
        value={smallValue}
        onValueChange={setSmallValue}
      >
        {PLACES.map((place) => (
          <ComboboxItem key={place.value} value={place.value}>
            {place.label}
          </ComboboxItem>
        ))}
      </Combobox>
    </div>
  )
}
