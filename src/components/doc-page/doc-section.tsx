import {
  docSectionBodyClassName,
  docSectionClassName,
  docSectionHeadingClassName,
} from './classnames'
import { toAnchorId } from './utils'

export interface DocSectionProps {
  title: string
  children: React.ReactNode
}

export function DocSection({ title, children }: DocSectionProps) {
  const anchorId = toAnchorId(title)

  return (
    <section aria-labelledby={anchorId} className={docSectionClassName}>
      <h2 id={anchorId} className={docSectionHeadingClassName}>
        {title}
      </h2>

      <div className={docSectionBodyClassName}>{children}</div>
    </section>
  )
}
