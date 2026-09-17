# Coding standards

## Source text

- No code comments. Names and structure carry the meaning.
- Identifiers are spelled out in full. No abbreviations, no single-letter parameters.
- No Tailwind opacity modifiers on colors, because they produce colors outside the palette (ADR 0004). Opacity applied to a whole element, as for disabled states and motion, is allowed.

## Grouping

Statements inside a function are grouped by goal: the lines that together achieve one thing sit next to each other, and a blank line separates one group from the next. Each branch of a conditional is its own group. The formatter keeps a single blank line and collapses runs of them, so the spacing is the author's responsibility and is reviewed like any other part of the code.

## Components are folders

Every registry component is a folder under `src/registry/ui/`, named after the component in kebab-case. The folder is the unit `registry.json` ships, so every file in it, except those under `__test__/`, is listed in the item's `files`.

A folder holds these files:

- `index.ts` re-exports the folder's public surface and defines nothing.
- One `.tsx` file per component, named after the component in kebab-case, defining that component and its props interface.
- `classnames.ts` holds every `cva()` call and every reusable `cn()` class string the folder uses.
- `types.ts` holds every type the folder exports, except component props.
- `utils.ts` holds the folder's utility functions with low cognitive complexity, including every value a component derives from props or state beyond a single expression.
- Any other runtime value the folder needs, such as a React context, a hook, a lookup table, or a utility function too involved for `utils.ts`, gets its own file named after what it holds.

Consumers import from the folder, never from a file inside it.

## One component per file

A `.tsx` file defines exactly one component, named after the file in PascalCase. A folder that ships several components has one file per component beside the main one.

Utility functions do not each need a file. The ones with low cognitive complexity, short and with no nested logic, share the folder's `utils.ts`. A utility function whose branching or nesting takes effort to follow gets its own file, named after the function.

## Class names live in classnames.ts

Every `cva()` call and every `cn()` call that builds a reusable class string is declared in `classnames.ts` and imported by the component file. The component file may merge the consumer's `className` at the render site. It may not declare a class string of its own.

## Types live in types.ts

Every exported type the folder defines goes in `types.ts`: variant enums, context value shapes, aliases over third-party types, prop-derived helpers. The one exception is the component's own props interface, which stays in the component file directly above the component so the contract and the implementation read together.

## Enums, not string unions

A closed set of string values is a TypeScript enum with string values, declared in `types.ts`. Members are PascalCase. Values are the kebab-case strings the DOM and the class names use.

The enum is the source of truth. Do not declare the set as a union type, and do not derive it from cva's `VariantProps`. `classnames.ts` keys its variant maps on the enum members, props default to an enum member, and every consumer, including docs pages and tests, passes the enum member rather than its string value.

Boolean variants are not string sets and stay booleans. A type alias that only re-exports a third-party type is not a string set and stays an alias in `types.ts`.

## Tests

A test file sits in a `__test__` folder beside the file it tests and is named after it: `src/registry/ui/avatar/utils.ts` is tested by `src/registry/ui/avatar/__test__/utils.test.ts`. A component folder's behavior tests go in one file named after the folder, such as `src/registry/ui/avatar/__test__/avatar.test.tsx`.

A test verifies the behavior of its target, never how the target achieves it. A test that restates the implementation is tautological: it can only pass. A test that fails on a behavior-preserving refactor is a change detector. Both are worse than no test, and ADR 0006 relies on this rule.

- Assert on what a consumer can observe. For a component, that is the rendered content, accessible names and states, focus, or a prop callback firing. For a utility function, it is the value returned for the inputs a caller passes. Asserting that an internal function was called pins the implementation.
- Do not test the class names or styles a target renders. A class name, an inline style, a CSS value, a motion or design constant, or a value that only feeds one of them restates the design. A restyle breaks such a test without breaking anything a consumer relies on.
- Do not pin values no consumer can observe, such as React keys, the shape of internal state, or the format of an internal lookup key. Assert the property the caller relies on instead.
- Every utility function with behavior of its own is tested, whether it lives in a folder's `utils.ts`, in a file of its own, or in a shared module under `src/lib/` or `src/registry/lib/`. A utility function whose output only feeds class names or styles has no behavior of its own.
- Write the expected value out by hand. An expectation computed with the code under test copies its bug and still passes.
- Render the real collaborators. Mock only what cannot run in jsdom: network, clock, randomness.
- When output is unstable, such as generated ids or timestamps, assert the property that must hold rather than the exact string.
- If a behavior-preserving refactor forces a test edit, rewrite that test against the behavior or delete it. Do not patch the expectation.
