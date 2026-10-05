import type { LinkProps } from '@tanstack/react-router'

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

export interface ExampleSource {
  source: string
  demo: React.ReactNode
}
