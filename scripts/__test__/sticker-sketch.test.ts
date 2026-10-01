import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { StickerArt } from '@/registry/ui/sticker'

import { drawSticker, ink, writeSticker } from '../sticker-sketch.ts'
import type { Pen } from '../sticker-sketch.ts'

const windowOutline = 'M 20 20 H 60 V 60 H 20 Z'

function drawWindow(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette([windowOutline], frameSeed + 10)
  draw(
    generator.path(windowOutline, {
      ...ink,
      fill: 'glass',
      seed: frameSeed + 21,
    }),
  )
}

const windowSticker = { width: 80, height: 80, drawFrame: drawWindow }

const temporaryRoot = join(process.cwd(), 'node_modules', '.cache')
const temporaryDirectoryPrefix = join(temporaryRoot, 'sticker-sketch-')
const temporaryDirectories: string[] = []

mkdirSync(temporaryRoot, { recursive: true })

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true })
  }
})

describe('drawSticker', () => {
  it('draws the same art every time it runs', () => {
    expect(drawSticker(windowSticker)).toEqual(drawSticker(windowSticker))
  })

  it('draws three frames whose lines differ', () => {
    const { frames } = drawSticker(windowSticker)

    expect(frames).toHaveLength(3)
    expect(frames[0]).not.toEqual(frames[1])
    expect(frames[1]).not.toEqual(frames[2])
  })

  it('names each layer by role and paint rather than by colour', () => {
    const art: StickerArt = drawSticker(windowSticker)

    const rolesAndPaints = new Set(
      art.frames[0].map((layer) => `${layer.role} ${layer.paint}`),
    )

    expect(rolesAndPaints).toEqual(
      new Set(['cut fill', 'cut stroke', 'glass fill', 'ink stroke']),
    )
  })

  it('keeps the size it was given', () => {
    const { width, height } = drawSticker(windowSticker)

    expect({ width, height }).toEqual({ width: 80, height: 80 })
  })
})

describe('writeSticker', () => {
  it('writes a module that exports the drawn art under the given name', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const directory = mkdtempSync(temporaryDirectoryPrefix)
    temporaryDirectories.push(directory)
    const output = pathToFileURL(join(directory, 'window-sticker-art.ts'))

    writeSticker({ ...windowSticker, exportName: 'windowStickerArt', output })
    const writtenModule = await import(/* @vite-ignore */ fileURLToPath(output))

    expect(writtenModule.windowStickerArt).toEqual(drawSticker(windowSticker))
  })

  it('writes the same file every time it runs', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    const directory = mkdtempSync(temporaryDirectoryPrefix)
    temporaryDirectories.push(directory)
    const output = pathToFileURL(join(directory, 'window-sticker-art.ts'))

    writeSticker({ ...windowSticker, exportName: 'windowStickerArt', output })
    const firstWrite = readFileSync(output, 'utf8')
    writeSticker({ ...windowSticker, exportName: 'windowStickerArt', output })

    expect(readFileSync(output, 'utf8')).toBe(firstWrite)
  })
})
