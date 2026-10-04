# Feedback rule scope: button owns loading only; alert ships

Status: accepted; placement and toast clauses superseded by ADR 0008

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

- The feedback-rule wording in `CLAUDE.md`, `GLOSSARY.md`, and the batch-1 map (issue #1) changes to match.
- Registry dependencies between atomic components are allowed: button depends on the `spinner` registry item. "Atomic" excludes floating layers and composite widgets, not dependencies.
- The docs principles page must state the revised boundary when it is written.

## Amendment (issue #4)

"Loading only" scopes what the button shows, not which component may load: input also owns a `loading` state (spinner in its end slot, field stays editable). The rule stands — the acting component shows its own busyness; success and error stay with the app.

## Superseded in part (ADR 0008)

ADR 0008 keeps the split above — the acting component shows its own busyness, results belong to the app — and replaces "shown inline via alert" and "toast stays banned permanently" with an invariant: feedback appears where the user's attention already is and stays until seen. The ban is restated as properties (auto-dismiss, stacking, no owner, no link to the subject) rather than position, and a shell-owned notice with none of those properties is admitted as the last home in a ranking that starts with the affected item.
