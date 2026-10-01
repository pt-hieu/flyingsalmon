import { cva } from 'class-variance-authority'

export const stickerVariants = cva(
  'fill-foreground stroke-foreground w-full overflow-visible',
  {
    variants: {
      popIn: {
        true: 'animate-sticker-pop [animation-range:entry_10%_cover_35%] [animation-timeline:view()]',
        false: '',
      },
    },
  },
)

export const stickerFrameVariants = cva('animate-sticker-boil', {
  variants: {
    leading: {
      true: '',
      false: 'opacity-0',
    },
  },
})

export const stickerCutBorderClassName = 'fill-border stroke-border'

export const stickerCutEdgeClassName = 'fill-card stroke-card'
