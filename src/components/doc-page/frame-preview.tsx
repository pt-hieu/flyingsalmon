import { framePreviewClassName } from './classnames'
import type { DocRoute } from './types'

export interface FramePreviewProps {
  title: string
  to: DocRoute
}

export function FramePreview({ title, to }: FramePreviewProps) {
  return (
    <iframe
      title={title}
      src={to}
      loading="lazy"
      className={framePreviewClassName}
    />
  )
}
