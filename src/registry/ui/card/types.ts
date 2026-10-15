import type { ComponentProps } from 'react'

export type CardSlotProps = ComponentProps<'div'>

export enum CardTitleElement {
  Div = 'div',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}
