import { createFileRoute } from '@tanstack/react-router'

import {
  CodeBlock,
  CodeLanguage,
  DocPage,
  Example,
  GuidelineVerdict,
  PropsTable,
} from '@/components/doc-page'
import {
  houseStickerLabel,
  houseStickerRoleClassNames,
} from '@/components/house-sticker'
import { StickerBesideItsTitle } from '@/examples/sticker/beside-its-title'
import besideItsTitleSource from '@/examples/sticker/beside-its-title.tsx?raw'
import { StickerDemo } from '@/examples/sticker/demo'
import demoSource from '@/examples/sticker/demo.tsx?raw'
import { StickerPopIn } from '@/examples/sticker/pop-in'
import popInSource from '@/examples/sticker/pop-in.tsx?raw'
import { StickerSizeAndTilt } from '@/examples/sticker/size-and-tilt'
import sizeAndTiltSource from '@/examples/sticker/size-and-tilt.tsx?raw'
import usageSource from '@/examples/sticker/usage.tsx?raw'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

export const Route = createFileRoute('/_docs/components/sticker')({
  component: StickerPage,
})

const drawingScriptExample = `import { ink, writeSticker } from '../src/components/ui/sticker/sticker-sketch.ts'
import type { Pen } from '../src/components/ui/sticker/sticker-sketch.ts'

const door = 'M 20 80 V 30 Q 20 16 40 16 Q 60 16 60 30 V 80 Z'

function drawFrame(
  { generator, draw, drawSilhouette }: Pen,
  frameSeed: number,
) {
  drawSilhouette([door], frameSeed + 10)
  draw(generator.path(door, { ...ink, fill: 'door', seed: frameSeed + 21 }))
}

writeSticker({
  exportName: 'doorStickerArt',
  width: 80,
  height: 96,
  drawFrame,
  output: new URL('../src/components/door-sticker-art.ts', import.meta.url),
})`

const runScriptExample = 'node scripts/draw-door-sticker.ts'

const generatedArtExample = `export const doorStickerArt = {
  width: 80,
  height: 96,
  frames: [
    [
      { role: 'cut', paint: 'fill', d: 'M20.4 79.6 C19.8 ...' },
      { role: 'door', paint: 'fill', d: 'M21.1 78.2 C20.6 ...' },
      { role: 'ink', paint: 'stroke', d: 'M19.7 80.3 C20.2 ...' },
    ],
    [ ... ],
    [ ... ],
  ],
} as const`

function StickerPage() {
  return (
    <DocPage
      title="Sticker"
      lead="A sticker is hand-drawn art cut out like a paper sticker, marking a moment such as the end of a trip or a page with nothing on it yet."
      preview={{ source: demoSource, demo: <StickerDemo /> }}
      installation="sticker"
      usage={usageSource}
      examples={
        <>
          <Example
            caption="Beside its title"
            description="The sticker sits next to a title that says the same thing in words. A small tilt, two or three degrees either way, keeps it from looking printed."
            source={besideItsTitleSource}
          >
            <StickerBesideItsTitle />
          </Example>

          <Example
            caption="Pop-in on scroll"
            description="By default the sticker grows from small and tilted, overshoots, and settles as it scrolls into view. Scroll this one in and out of view; it plays backwards when you scroll back."
            source={popInSource}
          >
            <StickerPopIn />
          </Example>

          <Example
            caption="Size and tilt"
            description="The sticker fills the width its parent gives it and keeps the art’s aspect ratio. It sets no size and no tilt of its own, so set both with className."
            source={sizeAndTiltSource}
          >
            <StickerSizeAndTilt />
          </Example>
        </>
      }
      guidelines={{
        whenToUse: [
          'To mark a moment: a finished trip, a first visit, a page with nothing on it yet.',
          'Beside a title that says the same thing in words.',
        ],
        whenNotToUse: [
          {
            situation:
              'to label a status or a count, because a badge is small, static, and states the state in words.',
            alternative: { to: '/components/badge', label: 'Badge' },
          },
          {
            situation:
              'to tell the traveller a page is empty, with a sticker beside the message rather than in place of it.',
            alternative: {
              to: '/components/empty-state',
              label: 'Empty state',
            },
          },
        ],
        rules: [
          {
            verdict: GuidelineVerdict.Do,
            rule: 'Keep a title beside the sticker that says what it says.',
            reason:
              'The art is decoration with a job. It never replaces the words.',
          },
          {
            verdict: GuidelineVerdict.Do,
            rule: (
              <>
                Pass <code>popIn={'{false}'}</code> for a sticker already in
                view when its page opens.
              </>
            ),
            reason:
              'The pop is tied to scroll position. A sticker at the top of a page would sit part-way through it until the reader scrolled.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Write the art by hand.',
            reason:
              'The art is generated data with three frames, each drawn with its own seeds. A hand-edited module is lost the next time the script runs.',
          },
          {
            verdict: GuidelineVerdict.Dont,
            rule: 'Name roles after colours.',
            reason:
              'A role names a part of the drawing, such as roof or door, so the same art follows whatever theme draws it.',
          },
        ],
      }}
      accessibility={
        <p>
          The sticker is one image: an <code>svg</code> with{' '}
          <code>role=&quot;img&quot;</code> named by <code>label</code>, with
          its paths presentational. Keep the label short and describe the
          picture, not its purpose: &ldquo;{houseStickerLabel}&rdquo;. It takes
          no focus and has no states. Its colours carry no meaning of their own,
          so they have no contrast floor; the title beside the sticker carries
          the meaning.
        </p>
      }
      api={
        <>
          <PropsTable
            component="Sticker"
            description={
              <>
                Also takes every <code>&lt;svg&gt;</code> attribute;{' '}
                <code>className</code> reaches the root <code>svg</code>.
              </>
            }
            rows={[
              {
                name: 'art',
                type: 'StickerArt',
                required: true,
                description:
                  'The frames a drawing script generated: a width and height in drawing units and exactly three frames.',
              },
              {
                name: 'label',
                type: 'string',
                required: true,
                description: 'Names the picture for screen readers.',
              },
              {
                name: 'roleClassNames',
                type: 'StickerRoleClassNames',
                required: true,
                description:
                  'Maps each role in the art to a Tailwind class per paint. A role the map leaves out draws in the foreground colour.',
              },
              {
                name: 'popIn',
                type: 'boolean',
                default: 'true',
                description: 'Plays the scroll-linked pop-in.',
              },
            ]}
          />
          <h3 className="font-heading text-lg font-semibold">The role map</h3>
          <p>
            <code>roleClassNames</code> gives each role a class per paint. Spell
            the classes out in full so Tailwind finds them, and split them by
            paint, because a fill class on a stroke path would override its{' '}
            <code>fill=&quot;none&quot;</code>. Take colours from the theme’s
            functional aliases: <code>--foreground</code> for ink,{' '}
            <code>--card</code> for paper, and the group colours for everything
            that tells one part from another. Every line draws at the same
            weight unless its role’s classes set another, as the dotted{' '}
            <code>trail</code> behind the plane does. This is the house
            sticker’s map.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeadCell>Role</TableHeadCell>
                <TableHeadCell>Fill</TableHeadCell>
                <TableHeadCell>Stroke</TableHeadCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(houseStickerRoleClassNames).map(
                ([role, classNames]) => (
                  <TableRow key={role}>
                    <TableCell>
                      <code>{role}</code>
                    </TableCell>
                    <TableCell>
                      <code>{classNames.fill}</code>
                    </TableCell>
                    <TableCell>
                      <code>{classNames.stroke}</code>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </>
      }
      notes={
        <>
          <p>
            A frame is a list of layers, and a layer is one SVG path: its{' '}
            <code>d</code>, its <code>paint</code> (<code>fill</code> or{' '}
            <code>stroke</code>), and its <code>role</code>. One role belongs to
            the sticker: <code>cut</code> is the drawing’s silhouette, which the
            sticker turns into its die-cut edge. Every other role is the art’s
            to name.
          </p>
          <p>
            The die-cut edge strokes the <code>cut</code> silhouette thick three
            times: a <code>--border</code> layer offset down and to the right, a{' '}
            <code>--border</code> line, and a <code>--card</code> edge on top.
            The strokes merge into one cut around the whole drawing. Every pass
            is a solid palette colour, with no shadow and no alpha.
          </p>
          <p>
            The three frames draw the same picture with a different wobble and
            take turns every 150ms on a 450ms loop (
            <code>animate-sticker-boil</code>), so the lines jitter like a
            cartoon’s. The boil is continuous and runs as long as the sticker is
            on the page, one of the documented exceptions to the 200ms limit.
          </p>
          <p>
            The pop-in (<code>animate-sticker-pop</code>) runs on scroll
            position rather than a clock, from the moment the sticker is 10%
            into the viewport until it covers 35% of it. A browser without
            scroll-driven animations shows the sticker at rest.
          </p>
          <h3 className="font-heading text-lg font-semibold">
            Drawing new art
          </h3>
          <p>
            Art comes from a drawing script built on rough.js. Installing the
            sticker adds <code>sticker-sketch.ts</code> to the sticker’s folder,
            beside the component, and the <code>roughjs</code> dev dependency.
            The sketch module holds the pen: the ink’s weight, roughness, and
            bowing, the silhouette pen, the three frames, and the output shape.
            A sticker’s own script imports the pen, draws its shapes once per
            frame, and writes the art module beside the code that renders it.
          </p>
          <p>
            <code>drawSilhouette</code> takes the outline pieces the edge cuts
            around; a closed piece is filled so the edge has no holes.{' '}
            <code>draw</code> takes any rough.js drawable. A fill or stroke name
            becomes the layer’s role, and <code>ink</code> strokes in the{' '}
            <code>ink</code> role. Offset every seed from <code>frameSeed</code>
            , so each frame wobbles differently and a rerun draws exactly the
            same frames.
          </p>
          <CodeBlock code={drawingScriptExample} label="Drawing script" />
          <p>
            Run it with Node, which runs TypeScript directly, and commit the
            module it writes. Rerun it after every change to the drawing.
          </p>
          <CodeBlock
            code={runScriptExample}
            language={CodeLanguage.Bash}
            label="Run the drawing script"
          />
          <CodeBlock code={generatedArtExample} label="Generated art module" />
          <p>
            This site regenerates its house sticker with{' '}
            <code>pnpm stickers:draw</code>, which runs{' '}
            <code>scripts/draw-house-sticker.ts</code>.
          </p>
        </>
      }
      related={[
        {
          to: '/components/empty-state',
          label: 'Empty state',
          description: 'The page a sticker most often decorates.',
        },
        {
          to: '/components/badge',
          label: 'Badge',
          description: 'The marker for a status or a count.',
        },
        {
          to: '/motion',
          label: 'Motion',
          description:
            'Where the boil and the pop-in sit in the motion language.',
        },
        {
          to: '/colors',
          label: 'Colours',
          description: 'The group colours a role map draws from.',
        },
      ]}
    />
  )
}
