# Coding standards

Rules for every file under `src/registry/`. `CLAUDE.md` still applies (no comments, no Tailwind opacity modifiers, palette-only colors, `@/` is the only alias).

## Components are folders

Every registry component lives in its own folder under `src/registry/ui/`, named after the component in kebab-case. The folder is the unit `registry.json` ships: every file in it is listed in the item's `files`.

```
src/registry/ui/button/
  index.ts        re-exports the public surface of the folder
  button.tsx      the Button component and its props interface
  classnames.ts   every cva() and cn() class definition the folder uses
  types.ts        every type the folder exports, except component props
```

`index.ts` only re-exports. It defines nothing. Consumers import from the folder (`@/registry/ui/button`), never from a file inside it.

## One component per file

A `.tsx` file defines exactly one component, named after the file in PascalCase: `card-header.tsx` defines `CardHeader`. A folder that ships several components has one file per component next to the main one:

```
src/registry/ui/card/
  index.ts
  card.tsx
  card-header.tsx
  card-title.tsx
  card-description.tsx
  card-action.tsx
  card-content.tsx
  card-footer.tsx
  classnames.ts
  types.ts
```

Runtime values that are neither a component, a class definition, nor a type (a React context, a hook, a lookup table) go in their own file named after what they hold, for example `context.ts` or `use-field-ids.ts`.

## Class names live in `classnames.ts`

Every `cva()` call and every `cn()` call that builds a reusable class string is declared in the folder's `classnames.ts` and imported by the component file. A component file may still call `cn(variants({ ... }), className)` at the render site to merge the consumer's `className`. It may not declare a class string of its own.

## Types live in `types.ts`

Every exported type the folder defines goes in `types.ts`: variant enums, context value shapes, aliases over third-party types, prop-derived helpers. The one exception is the component's own props interface, which stays in the component file directly above the component so a reader sees the contract and the implementation together.

## Enums, not string unions

A closed set of string values is a TypeScript `enum` with string values, declared in `types.ts`. Members are PascalCase; values are the kebab-case strings the DOM and the class names use.

```ts
export enum ButtonVariant {
  Default = 'default',
  Outline = 'outline',
  Secondary = 'secondary',
  Ghost = 'ghost',
  Destructive = 'destructive',
}
```

Do not write `type ButtonVariant = 'default' | 'outline'`, and do not derive the type from cva with `VariantProps<typeof buttonVariants>['variant']`. The enum is the source of truth; `classnames.ts` keys its variant maps on the enum members:

```ts
variants: {
  variant: {
    [ButtonVariant.Default]: 'bg-primary text-primary-foreground',
    [ButtonVariant.Outline]: 'border-input border bg-background',
  },
},
```

Props default to an enum member (`variant = ButtonVariant.Default`), and every consumer, including docs pages and tests, passes the enum member rather than the string.

Boolean variants (`true` / `false` keys in cva) are not string sets and stay as booleans. A type alias that only re-exports a third-party type (`CheckboxPrimitive.CheckedState`) is not a string set either and stays an alias in `types.ts`.

## Naming

Spell identifiers out in full. `selectedObjectives.map(objective => ...)`, never `sltObjs.map(o => ...)`.

## Tests

Tests live in `src/registry/ui/__test__/<name>.test.tsx` and pin the behavior a consumer depends on, never how the component achieves it. A test that restates the implementation can only pass. A test that fails on a behavior-preserving refactor is a change detector. Both are worse than no test, and ADR 0006 already leans on this rule.

- Assert on what a consumer can observe: the rendered DOM, a returned value, or a prop callback firing. Asserting that an internal function was called pins the implementation.
- Write the expected value out by hand. An expectation computed with the code under test copies its bug and still passes.
- Render the real collaborators. Mock only what cannot run in jsdom: network, clock, randomness.
- When output is unstable (generated ids, timestamps), assert the property that must hold, not the exact string.
- If a behavior-preserving refactor forces a test edit, rewrite that test against the behavior or delete it. Do not patch the expectation.
