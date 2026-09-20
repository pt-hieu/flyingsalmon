import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

import {
  breadcrumbActiveItemClassName,
  breadcrumbItemClassName,
  breadcrumbLinkClassName,
  breadcrumbPageClassName,
} from './classnames'

interface BreadcrumbAncestorItemProps extends React.ComponentProps<'a'> {
  link: true
  active?: never
  asChild?: boolean
}

interface BreadcrumbActiveItemProps extends React.ComponentProps<'span'> {
  link?: never
  active: true
  asChild?: never
}

interface BreadcrumbPlainItemProps extends React.ComponentProps<'li'> {
  link?: never
  active?: never
  asChild?: never
}

export type BreadcrumbItemProps =
  | BreadcrumbAncestorItemProps
  | BreadcrumbActiveItemProps
  | BreadcrumbPlainItemProps

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  if (props.link) {
    const { link, asChild = false, className, ...anchorProps } = props
    const Anchor = asChild ? Slot.Root : 'a'

    return (
      <li className={breadcrumbItemClassName}>
        <Anchor
          className={cn(breadcrumbLinkClassName, className)}
          {...anchorProps}
        />
      </li>
    )
  }

  if (props.active) {
    const { active, className, ...pageProps } = props

    return (
      <li
        className={cn(breadcrumbItemClassName, breadcrumbActiveItemClassName)}
      >
        <span
          aria-current="page"
          className={cn(breadcrumbPageClassName, className)}
          {...pageProps}
        />
      </li>
    )
  }

  const { className, ...listItemProps } = props

  return (
    <li className={cn(breadcrumbItemClassName, className)} {...listItemProps} />
  )
}
