import { cn } from '@/lib/utils'

export const docPageClassName = cn(
  'mx-auto flex max-w-3xl flex-col gap-16 px-6 py-12',
  '[&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:text-foreground [&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.875em]',
)

export const docPageHeaderClassName = 'flex flex-col gap-3'

export const docPageTitleClassName =
  'font-heading text-4xl font-bold tracking-tight'

export const docPageLeadClassName = 'text-muted-foreground text-lg'

export const docSectionClassName = 'flex scroll-mt-20 flex-col gap-6'

export const docSectionHeadingClassName = 'font-heading text-2xl font-bold'

export const docSectionBodyClassName = cn(
  'text-muted-foreground flex flex-col gap-4',
  '[&_strong]:text-foreground [&_strong]:font-semibold',
)

export const exampleListClassName = 'flex flex-col gap-12'

export const exampleClassName = 'flex scroll-mt-20 flex-col gap-3'

export const exampleCaptionClassName =
  'font-heading text-foreground text-lg font-semibold'

export const exampleDescriptionClassName = 'text-muted-foreground'

export const exampleTabsContentClassName = 'mt-4'

export const examplePreviewClassName = cn(
  'border-border bg-background text-foreground rounded-lg border',
  'flex min-h-40 flex-wrap items-center justify-center gap-6 p-10',
)

export const codeBlockClassName = cn(
  'border-border bg-card flex items-start rounded-lg border',
  '[--shiki-foreground:var(--color-neutral-950)]',
  '[--shiki-token-keyword:var(--color-orange-700)]',
  '[--shiki-token-string:var(--color-green-700)]',
  '[--shiki-token-string-expression:var(--color-green-700)]',
  '[--shiki-token-function:var(--color-sky-700)]',
  '[--shiki-token-constant:var(--color-violet-700)]',
  '[--shiki-token-parameter:var(--color-neutral-800)]',
  '[--shiki-token-punctuation:var(--color-neutral-600)]',
  '[--shiki-token-comment:var(--color-neutral-600)]',
  '[--shiki-token-link:var(--color-sky-700)]',
  '[--shiki-token-inserted:var(--color-green-700)]',
  '[--shiki-token-deleted:var(--color-red-700)]',
  '[--shiki-token-changed:var(--color-amber-700)]',
)

export const codeBlockPreClassName = cn(
  'text-foreground min-w-0 flex-1 overflow-x-auto p-4 font-mono text-sm leading-6',
  'focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:outline-hidden',
)

export const codeBlockCopySlotClassName = 'shrink-0 p-2'

export const copyButtonStatusClassName = 'sr-only'

export const guidelinesClassName = 'flex flex-col gap-8'

export const guidelinesGroupClassName = 'flex flex-col gap-3'

export const guidelinesHeadingClassName =
  'font-heading text-foreground text-lg font-semibold'

export const guidelinesListClassName = 'flex list-disc flex-col gap-2 pl-6'

export const guidelineRuleListClassName = 'flex flex-col gap-4'

export const guidelineRuleClassName = 'flex items-start gap-3'

export const guidelineRuleTextClassName = 'flex flex-col gap-1'

export const guidelineRuleStatementClassName = 'text-foreground font-medium'

export const guidelineVerdictBadgeClassName =
  'mt-0.5 w-16 shrink-0 justify-center'

export const tableTitleClassName =
  'font-heading text-foreground text-lg font-semibold'

export const tableGroupClassName = 'flex flex-col gap-3'

export const tableCodeCellClassName = 'text-foreground align-top font-mono'

export const tableTextCellClassName = 'text-muted-foreground align-top'

export const keyboardKeyCellClassName = 'w-1/3 align-top'

export const keyboardKeyListClassName = 'flex flex-wrap gap-1'

export const keyboardKeyClassName =
  'border-border bg-card text-foreground rounded-sm border px-2 py-0.5 font-mono text-xs whitespace-nowrap'

export const propRequiredClassName = 'text-primary-text font-sans'

export const notesTriggerHeadingClassName = 'text-2xl font-bold'

export const notesBodyClassName = cn(
  'flex flex-col gap-4 text-base',
  '[&_strong]:text-foreground [&_strong]:font-semibold',
)

export const relatedListClassName = 'grid gap-4 sm:grid-cols-2'

export const relatedCardClassName = 'h-full'

export const noticeFrameClassName = 'relative w-full transform-gpu'

export const noticeFrameContentClassName =
  'flex flex-col items-center gap-4 pt-40'
