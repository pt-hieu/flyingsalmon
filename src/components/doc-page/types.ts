import type { LinkProps } from '@tanstack/react-router'
import type { ThemedToken } from 'shiki/core'

export enum CodeLanguage {
  Tsx = 'tsx',
  Bash = 'bash',
}

export enum CopyState {
  Idle = 'idle',
  Copied = 'copied',
  Failed = 'failed',
}

export enum GuidelineVerdict {
  Do = 'do',
  Dont = 'dont',
}

export type DocRoute = NonNullable<LinkProps['to']>

export interface DocLink {
  to: DocRoute
  label: string
}

export interface RelatedPage extends DocLink {
  description: string
}

export interface AlternativeComponent {
  situation: React.ReactNode
  alternative: DocLink
}

export interface GuidelineRule {
  verdict: GuidelineVerdict
  rule: React.ReactNode
  reason: React.ReactNode
}

export interface GuidelinesContent {
  whenToUse: React.ReactNode[]
  whenNotToUse: AlternativeComponent[]
  rules: GuidelineRule[]
}

export interface KeyboardRow {
  keys: string[]
  description: React.ReactNode
}

export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: React.ReactNode
}

export interface DataTableColumn {
  heading: string
  cellClassName?: string
}

export interface DataTableRow {
  key: string
  cells: React.ReactNode[]
}

export interface FoundationTableRow {
  sample: React.ReactNode
  name: string
  detail: string
  job: React.ReactNode
}

export interface FoundationTableSection {
  title: string
  description?: React.ReactNode
  headings?: [string, string, string, string]
  rows: FoundationTableRow[]
}

export interface GroupHue {
  name: string
  solidClassName: string
  softClassName: string
  borderClassName: string
}

export interface FoundationSection {
  title: string
  content: React.ReactNode
}

export interface HighlightedLine {
  offset: number
  tokens: ThemedToken[]
}

export interface ExampleSource {
  source: string
  demo: React.ReactNode
}

declare module 'react' {
  interface CSSProperties {
    '--code-token-color'?: string
  }
}
