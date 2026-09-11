import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from './classnames'
import { AvatarColor, AvatarSize } from './types'
import { getInitials } from './utils'

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

export function Avatar({
  size = AvatarSize.Default,
  src,
  name,
  alt,
  color = AvatarColor.Indigo,
  className,
  ...props
}: AvatarProps) {
  const [loadedSource, setLoadedSource] = useState<string>()
  const [brokenSource, setBrokenSource] = useState<string>()
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const image = imageRef.current

    if (!image?.complete) return

    if (image.naturalWidth === 0) setBrokenSource(src)
    else setLoadedSource(src)
  }, [src])

  const accessibleName = alt ?? name ?? ''
  const showsImage = Boolean(src) && brokenSource !== src
  const initials = name ? getInitials(name) : ''

  return (
    <span className={cn(avatarVariants({ size }), className)} {...props}>
      {showsImage ? (
        <img
          ref={imageRef}
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
