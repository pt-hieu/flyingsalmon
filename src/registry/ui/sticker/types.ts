export enum StickerPaint {
  Fill = 'fill',
  Stroke = 'stroke',
}

export interface StickerLayer {
  readonly role: string
  readonly paint: `${StickerPaint}`
  readonly d: string
}

export interface StickerArt {
  readonly width: number
  readonly height: number
  readonly frames: readonly (readonly StickerLayer[])[]
}

export type StickerRoleClassNames = Readonly<
  Record<string, Readonly<Partial<Record<`${StickerPaint}`, string>>>>
>
