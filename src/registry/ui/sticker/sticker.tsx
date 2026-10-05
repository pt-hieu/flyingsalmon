import { cn } from '@/lib/utils'

import { stickerFrameVariants, stickerVariants } from './classnames'
import { cutPasses } from './cut-passes'
import type { StickerArt, StickerRoleClassNames } from './types'
import {
  boilFrameDelay,
  cutLayers,
  drawingLayers,
  drawingStrokeWidth,
  stickerViewBox,
  unpaintedFill,
  unpaintedStroke,
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
      {art.frames.map((layers, frameIndex) => {
        const silhouette = cutLayers(layers)

        return (
          <g
            key={frameIndex}
            style={
              {
                '--sticker-frame-delay': boilFrameDelay(frameIndex),
              } as React.CSSProperties
            }
            className={stickerFrameVariants({ leading: frameIndex === 0 })}
          >
            {cutPasses.map((pass) => (
              <g
                key={pass.name}
                transform={pass.transform}
                className={pass.className}
              >
                {silhouette.map((layer, layerIndex) => (
                  <path
                    key={layerIndex}
                    d={layer.d}
                    fill={unpaintedFill(layer)}
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
                fill={unpaintedFill(layer)}
                stroke={unpaintedStroke(layer)}
                strokeWidth={drawingStrokeWidth}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
