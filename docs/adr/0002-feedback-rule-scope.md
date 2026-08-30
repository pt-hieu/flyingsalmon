# Feedback rule scope: button owns loading only; alert ships

Status: accepted

The original feedback rule said the acting component owns all feedback for its action — buttons morph through loading and success — and banned toast and alert permanently. The button spec grilling (issue #3) stress-tested that rule and narrowed it.

## Decision

- **Button owns loading only.** A boolean `loading` prop drives a spinner morph. Success and error do not live on the button.
- **Success and error are app concerns, shown inline.** The app places its own representation next to the action. To make that possible, the registry ships an **alert/info component** — the alert ban is lifted.
- **Toast stays banned permanently.** The ban was always about floating, unowned feedback; an inline alert the app places in the layout is a different thing.
- **Alert joins batch 1**, growing it from 11 to 12 atomic components.

## Rationale

- An error needs a message, and a button cannot carry text. A red shake without words is low-information feedback.
- A success morph with no error counterpart leaves failure silent, because toast is banned.
- Packing loading, success, and error into the atomic button bloats its API. Loading is the one state that is unambiguous, cheap, and owned by the action itself.

## Consequences

- The feedback-rule wording in `CLAUDE.md`, `CONTEXT.md`, and the batch-1 map (issue #1) changes to match.
- Registry dependencies between atomic components are allowed: button depends on the `spinner` registry item. "Atomic" excludes floating layers and composite widgets, not dependencies.
- The docs principles page must state the revised boundary when it is written.
