import { describe, expect, it } from 'vitest'

import { stickerViewBox } from '../utils'

describe('stickerViewBox', () => {
  it('frames the art with room for the die-cut edge on every side', () => {
    expect(stickerViewBox({ width: 360, height: 220, frames: [] })).toBe(
      '-16 -16 392 252',
    )
  })
})
