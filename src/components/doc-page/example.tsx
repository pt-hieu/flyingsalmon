import { exampleClassName, exampleDescriptionClassName } from './classnames'
import { DocSubheading } from './doc-subheading'
import { ExampleFrame } from './example-frame'
import { toAnchorId } from './utils'

export interface ExampleProps {
  caption: string
  description?: React.ReactNode
  source: string
  children: React.ReactNode
}

export function Example({
  caption,
  description,
  source,
  children,
}: ExampleProps) {
  const anchorId = toAnchorId(caption)

  return (
    <div id={anchorId} className={exampleClassName}>
      <DocSubheading>{caption}</DocSubheading>

      {description ? (
        <p className={exampleDescriptionClassName}>{description}</p>
      ) : null}

      <ExampleFrame source={source} demo={children} label={caption} />
    </div>
  )
}
