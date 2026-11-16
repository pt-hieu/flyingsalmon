# Coding standards

## Source text

- No code comments. Names and structure carry the meaning.
- Identifiers are spelled out in full. No abbreviations, no single-letter parameters.
- No Tailwind opacity modifiers on colors, because they produce colors outside the palette (ADR 0004). Opacity applied to a whole element, as for disabled states and motion, is allowed.

## Grouping

Statements inside a function are grouped by goal: the lines that together achieve one thing sit next to each other, and a blank line separates one group from the next. Each branch of a conditional is its own group. The formatter keeps a single blank line and collapses runs of them, so the spacing is the author's responsibility and is reviewed like any other part of the code.

## Domain state

A piece of domain knowledge lives in one structure that encodes it: a state machine for a lifecycle, a lookup table keyed on the variant for per-variant values, a discriminated union for variants that hold different data. Code reads the structure instead of branching on the same condition in several places. In this repo, `alertStatusByVariant` in `src/registry/ui/alert/alert-status-by-variant.ts` is one.

- A new variant is a new entry in the structure. A change that adds one more branch to an if/else chain that already exists is the sign the structure is missing.
- State that two booleans would have to keep in sync is one value: `status: Status.Loading` rather than `isLoading` beside `isLoaded`.
- A module is organized around the domain knowledge it owns. A pipeline split into steps (load, validate, transform, save) repeats the same domain rules in each step.
- Logic that lives in one place and has two or three cases stays a plain conditional. A structure earns its place by deleting branches, duplicated rules, or invalid states.

## Boundaries

Data from outside the program, from route search parameters and `FormData` reads, is parsed into the repo's own types where it enters. Code past that point trusts those types and checks nothing again.

- A parse function turns raw input into a typed value or an error, and business logic receives the typed value.
- Business logic is pure functions with no framework imports. The framework layer parses input, calls them, and writes the output.
- The public surface of a module exposes the repo's domain types. Transport, storage, and wire types stay inside the module that talks to them.

## Types admit only valid states

A type admits the states the program can be in, and the compiler rejects the rest.

- Variants that hold different data are a discriminated union keyed on an enum member. `{ completed: boolean; completedAt?: Date }` admits a completed task with no date, and `{ status: TaskStatus.Open } | { status: TaskStatus.Done; completedAt: Date }` admits valid tasks alone. A comment explaining which combinations of fields are valid marks a type that is a union.
- A `switch` over a union handles every member and ends in a `default` that assigns the value to `never`, so adding a member fails compilation at every `switch` that misses it.
- Two values that share a primitive and differ in meaning, such as a `UserId` and an `OrderId`, are branded types, each created by one function that validates it.
- `as`, a non-null `!`, and `any` each assert a fact the compiler cannot prove. The fact is proven where the data enters (see Boundaries), and the assertion goes.
- A runtime check or a "should never happen" throw marks a type that is wider than the data. The type narrows at that spot and no further: a type tracks what each caller must handle, and a function that has an answer for every input keeps the plain type.

## Components are folders

Every registry component is a folder under `src/registry/ui/`, named after the component in kebab-case. The folder is the unit `registry.json` ships, so every file in it, except those under `__test__/`, is listed in the item's `files`. A folder holds these files:

- `index.ts` re-exports the folder's public surface and defines nothing.
- One `.tsx` file per component, named after the component in kebab-case, defining that component and its props interface.
- `classnames.ts` holds every `cva()` call and every reusable `cn()` class string the folder uses.
- `types.ts` holds every type the folder exports, except component props.
- `utils.ts` holds the utility functions about the component as a whole, each with low cognitive complexity, including every value a component derives from props or state beyond a single expression.
- `guidelines.md` holds the component's when to use, when not to use, and do and don't rules, in the format `docs/agents/docs-page-template.md` gives, and ships as a `registry:file`.
- Any other runtime value the folder needs, such as a React context, a hook, a lookup table, a group of utility functions about one subject, or a utility function too involved for `utils.ts`, gets its own file named after what it holds.

Consumers import from the folder, never from a file inside it.

A `.tsx` file defines exactly one component, named after the file in PascalCase. A folder that ships several components has one file per component beside the main one.

Utility functions do not each need a file. The ones with low cognitive complexity, short and with no nested logic, share the folder's `utils.ts`. Two or more that share a subject narrower than the component, such as the text of an amount field, share a file named after that subject, because a reader picks a file by its name and `utils.ts` names no subject. A utility function whose branching or nesting takes effort to follow gets its own file, named after the function.

Every exported type the folder defines goes in `types.ts`: variant enums, context value shapes, aliases over third-party types, prop-derived helpers. The one exception is the component's own props interface, which stays in the component file directly above the component so the contract and the implementation read together.

## Class names live in classnames.ts

Every `cva()` call and every `cn()` call that builds a reusable class string is declared in `classnames.ts` and imported by the component file. The component file may merge the consumer's `className` at the render site. It may not declare a class string of its own.

A class string with no variants is a plain string named after what it styles with a `ClassName` suffix, such as `badgeIconClassName`. A `cva()` call is reserved for a class string that takes variants.

A folder's `index.ts` exports a class string or `cva()` function only when another registry component composes it, as combobox's chips wear `badgeVariants` and the calendar's month navigation buttons wear `buttonVariants`. That export is public surface: a consumer can import it as well, so it is named and kept as carefully as a component. A class string no other component uses stays unexported.

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
- Do not test a declarative artifact against itself. A reader sees exactly what it accepts, so a test that restates its clauses documents nothing a reader lacks and catches no defect, because there is no logic to get wrong. Test the code that consumes it, where the behavior is emergent.
- Write the expected value out by hand. An expectation computed with the code under test copies its bug and still passes.
- Render the real collaborators. Mock only what cannot run in jsdom: network, clock, randomness.
- When output is unstable, such as generated ids or timestamps, assert the property that must hold rather than the exact string.
- If a behavior-preserving refactor forces a test edit, rewrite that test against the behavior or delete it. Do not patch the expectation.
