import { cn } from '@/lib/utils'

import { stickerFrameVariants, stickerVariants } from './classnames'
import { cutPasses } from './cut-passes'
import type { StickerArt, StickerRoleClassNames } from './types'
import {
  boilFrameDelay,
  cutLayers,
  drawingLayers,
  drawingStrokeWidth,
  frameContent,
  layerContent,
  stickerViewBox,
  unpaintedFill,
  unpaintedStroke,
  withContentKeys,
} from './utils'

export interface StickerProps extends React.ComponentProps<'svg'> {
  art: StickerArt
  label: string
  roleClassNames: StickerRoleClassNames
  popIn?: boolean
  boil?: boolean
}

export function Sticker({
  art,
  label,
  roleClassNames,
  popIn = true,
  boil = true,
  className,
  ...props
}: StickerProps) {
  const shownFrames = boil ? art.frames : art.frames.slice(0, 1)

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
      {withContentKeys(shownFrames, frameContent).map(
        ({ key: frameKey, item: layers }, frameIndex) => {
          const keyedSilhouette = withContentKeys(
            cutLayers(layers),
            layerContent,
          )

          return (
            <g
              key={frameKey}
              style={
                {
                  '--sticker-frame-delay': boilFrameDelay(frameIndex),
                } as React.CSSProperties
              }
              className={stickerFrameVariants({
                boil,
                leading: frameIndex === 0,
              })}
            >
              {cutPasses.map((pass) => (
                <g
                  key={pass.name}
                  transform={pass.transform}
                  className={pass.className}
                >
                  {keyedSilhouette.map(({ key: layerKey, item: layer }) => (
                    <path
                      key={layerKey}
                      d={layer.d}
                      fill={unpaintedFill(layer)}
                      strokeWidth={pass.strokeWidth}
                    />
                  ))}
                </g>
              ))}

              {withContentKeys(drawingLayers(layers), layerContent).map(
                ({ key: layerKey, item: layer }) => (
                  <path
                    key={layerKey}
                    d={layer.d}
                    className={roleClassNames[layer.role]?.[layer.paint]}
                    fill={unpaintedFill(layer)}
                    stroke={unpaintedStroke(layer)}
                    strokeWidth={drawingStrokeWidth}
                  />
                ),
              )}
            </g>
          )
        },
      )}
    </svg>
  )
}
