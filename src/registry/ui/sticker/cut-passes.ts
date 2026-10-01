import {
  stickerCutBorderClassName,
  stickerCutEdgeClassName,
} from './classnames'

export const cutPasses = [
  {
    name: 'offset',
    className: stickerCutBorderClassName,
    strokeWidth: 22,
    transform: 'translate(4 5)',
  },
  {
    name: 'line',
    className: stickerCutBorderClassName,
    strokeWidth: 22,
    transform: undefined,
  },
  {
    name: 'edge',
    className: stickerCutEdgeClassName,
    strokeWidth: 18,
    transform: undefined,
  },
]
