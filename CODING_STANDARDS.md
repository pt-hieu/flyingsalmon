# Coding standards

Rules for every source file in the repo. Sections that name the registry apply under `src/registry/`. Design-system rules such as palette, surfaces, motion, and accessibility stay in `CLAUDE.md`.

## Source text

- No code comments. Names and structure carry the meaning.
- Identifiers are spelled out in full. No abbreviations, no single-letter parameters.
- No Tailwind opacity modifiers on colors, because they produce colors outside the palette (ADR 0004). Opacity applied to a whole element, as for disabled states and motion, is allowed.

## Components are folders

Every registry component is a folder under `src/registry/ui/`, named after the component in kebab-case. The folder is the unit `registry.json` ships, so every file in it is listed in the item's `files`.

A folder holds these files:

- `index.ts` re-exports the folder's public surface and defines nothing.
- One `.tsx` file per component, named after the component in kebab-case, defining that component and its props interface.
- `classnames.ts` holds every `cva()` call and every reusable `cn()` class string the folder uses.
- `types.ts` holds every type the folder exports, except component props.
- Any other runtime value the folder needs, such as a React context, a hook, or a lookup table, gets its own file named after what it holds.

Consumers import from the folder, never from a file inside it.

## One component per file

A `.tsx` file defines exactly one component, named after the file in PascalCase. A folder that ships several components has one file per component beside the main one.

## Class names live in classnames.ts

Every `cva()` call and every `cn()` call that builds a reusable class string is declared in `classnames.ts` and imported by the component file. The component file may merge the consumer's `className` at the render site. It may not declare a class string of its own.

## Types live in types.ts

Every exported type the folder defines goes in `types.ts`: variant enums, context value shapes, aliases over third-party types, prop-derived helpers. The one exception is the component's own props interface, which stays in the component file directly above the component so the contract and the implementation read together.

## Enums, not string unions

A closed set of string values is a TypeScript enum with string values, declared in `types.ts`. Members are PascalCase. Values are the kebab-case strings the DOM and the class names use.

The enum is the source of truth. Do not declare the set as a union type, and do not derive it from cva's `VariantProps`. `classnames.ts` keys its variant maps on the enum members, props default to an enum member, and every consumer, including docs pages and tests, passes the enum member rather than its string value.

Boolean variants are not string sets and stay booleans. A type alias that only re-exports a third-party type is not a string set and stays an alias in `types.ts`.

## Tests

Tests live in `src/registry/ui/__test__/`, one file per component named after it. A test pins the behavior a consumer depends on, never how the component achieves it. A test that restates the implementation can only pass. A test that fails on a behavior-preserving refactor is a change detector. Both are worse than no test, and ADR 0006 relies on this rule.

- Assert on what a consumer can observe: the rendered DOM, a returned value, or a prop callback firing. Asserting that an internal function was called pins the implementation.
- Write the expected value out by hand. An expectation computed with the code under test copies its bug and still passes.
- Render the real collaborators. Mock only what cannot run in jsdom: network, clock, randomness.
- When output is unstable, such as generated ids or timestamps, assert the property that must hold rather than the exact string.
- If a behavior-preserving refactor forces a test edit, rewrite that test against the behavior or delete it. Do not patch the expectation.
