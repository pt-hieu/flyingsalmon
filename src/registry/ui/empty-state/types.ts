export enum EmptyStateSize {
  Default = 'default',
  Small = 'sm',
}

export enum EmptyStateKind {
  Empty = 'empty',
  Error = 'error',
}

export enum EmptyStateTitleElement {
  H2 = 'h2',
  H3 = 'h3',
}

export interface EmptyStateContextValue {
  size: EmptyStateSize
  kind: EmptyStateKind
  titleId?: string
}
