import { cn } from '@/lib/utils'

import { stickerFrameVariants, stickerVariants } from './classnames'
import { cutPasses } from './cut-passes'
import { drawingStrokeWidth } from './drawing-stroke-width'
import { StickerPaint } from './types'
import type { StickerArt, StickerRoleClassNames } from './types'
import {
  boilFrameDelay,
  cutLayers,
  drawingLayers,
  stickerViewBox,
} from './utils'

export interface StickerProps extends React.ComponentProps<'svg'> {
  art: StickerArt
  label: string
  roleClassNames: StickerRoleClassNames
  popIn?: boolean
}

export function Sticker({
  art,
  label,
  roleClassNames,
  popIn = true,
  className,
  ...props
}: StickerProps) {
  return (
    <svg
      {...props}
      role="img"
      aria-label={label}
      viewBox={stickerViewBox(art)}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(stickerVariants({ popIn }), className)}
    >
      {art.frames.map((layers, frameIndex) => (
        <g
          key={frameIndex}
          style={{ animationDelay: boilFrameDelay(frameIndex) }}
          className={stickerFrameVariants({ leading: frameIndex === 0 })}
        >
          {cutPasses.map((pass) => (
            <g
              key={pass.name}
              transform={pass.transform}
              className={pass.className}
            >
              {cutLayers(layers).map((layer, layerIndex) => (
                <path
                  key={layerIndex}
                  d={layer.d}
                  fill={layer.paint === StickerPaint.Fill ? undefined : 'none'}
                  strokeWidth={pass.strokeWidth}
                />
              ))}
            </g>
          ))}
          {drawingLayers(layers).map((layer, layerIndex) => (
            <path
              key={layerIndex}
              d={layer.d}
              className={roleClassNames[layer.role]?.[layer.paint]}
              fill={layer.paint === StickerPaint.Fill ? undefined : 'none'}
              stroke={layer.paint === StickerPaint.Fill ? 'none' : undefined}
              strokeWidth={drawingStrokeWidth}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
