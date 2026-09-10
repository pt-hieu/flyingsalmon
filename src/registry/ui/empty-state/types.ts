export enum EmptyStateSize {
  Default = 'default',
  Small = 'sm',
}

export enum EmptyStateTitleElement {
  H2 = 'h2',
  H3 = 'h3',
}

export interface EmptyStateContextValue {
  size: EmptyStateSize
  titleId?: string
}
