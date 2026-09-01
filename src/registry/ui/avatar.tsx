import { cva, type VariantProps } from 'class-variance-authority'
import { useState } from 'react'

import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full leading-none select-none',
  {
    variants: {
      size: {
        default: 'size-8 text-xs',
        sm: 'size-6 text-[0.625rem]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const avatarImageVariants = cva('size-full object-cover', {
  variants: {
    loaded: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    loaded: false,
  },
})

const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center font-medium text-neutral-950',
  {
    variants: {
      color: {
        orange: 'bg-orange-400',
        amber: 'bg-amber-400',
        green: 'bg-green-400',
        teal: 'bg-teal-400',
        sky: 'bg-sky-400',
        indigo: 'bg-indigo-400',
        purple: 'bg-purple-400',
        pink: 'bg-pink-400',
      },
    },
    defaultVariants: {
      color: 'indigo',
    },
  },
)

export type AvatarSize = NonNullable<
  VariantProps<typeof avatarVariants>['size']
>

export type AvatarColor = NonNullable<
  VariantProps<typeof avatarFallbackVariants>['color']
>

export interface AvatarProps extends Omit<
  React.ComponentProps<'span'>,
  'color'
> {
  size?: AvatarSize
  src?: string
  name?: string
  alt?: string
  color?: AvatarColor
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''

  const firstWord = words[0]
  const lastWord = words[words.length - 1]

  if (words.length === 1) return firstWord.charAt(0).toUpperCase()

  return (firstWord.charAt(0) + lastWord.charAt(0)).toUpperCase()
}

export function Avatar({
  size = 'default',
  src,
  name,
  alt,
  color = 'indigo',
  className,
  ...props
}: AvatarProps) {
  const [loadedSource, setLoadedSource] = useState<string>()
  const [brokenSource, setBrokenSource] = useState<string>()

  const accessibleName = alt ?? name ?? ''
  const showsImage = Boolean(src) && brokenSource !== src
  const initials = name ? getInitials(name) : ''

  return (
    <span className={cn(avatarVariants({ size }), className)} {...props}>
      {showsImage ? (
        <img
          src={src}
          alt={accessibleName}
          onLoad={() => setLoadedSource(src)}
          onError={() => setBrokenSource(src)}
          className={avatarImageVariants({ loaded: loadedSource === src })}
        />
      ) : (
        <span
          role={accessibleName ? 'img' : undefined}
          aria-label={accessibleName || undefined}
          aria-hidden={accessibleName ? undefined : true}
          className={avatarFallbackVariants({ color })}
        >
          {initials}
        </span>
      )}
    </span>
  )
}
