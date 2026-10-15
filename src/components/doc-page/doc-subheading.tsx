import { subheadingClassName } from './classnames'

export interface DocSubheadingProps {
  children: React.ReactNode
}

export function DocSubheading({ children }: DocSubheadingProps) {
  return <h3 className={subheadingClassName}>{children}</h3>
}
