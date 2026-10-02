// Materializes a library-shaped package for design-sync under
// .design-sync/.cache/pkg/. The repo ships its registry as source (shadcn
// distribution), so there is no dist/ or .d.ts tree for the converter to read;
// this builds both, plus the compiled Tailwind stylesheet the previews need.
//
// Run from the repo root: node .design-sync/prepare.mjs

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const REPO_ROOT = resolve(import.meta.dirname, '..')
const CACHE_DIR = join(REPO_ROOT, '.design-sync', '.cache')
const PACKAGE_DIR = join(CACHE_DIR, 'pkg')
const TYPES_DIR = join(PACKAGE_DIR, 'types')
const REGISTRY_UI_DIR = join(REPO_ROOT, 'src', 'registry', 'ui')
const PROSE_DIR = join(REPO_ROOT, '.design-sync', 'docs')
const PREVIEWS_DIR = join(REPO_ROOT, '.design-sync', 'previews')

// The browsable component set, by the section it appears under in the design
// tool's picker. Every other PascalCase export - compound parts like
// CardHeader, setup wrappers like TooltipProvider - stays importable from the
// bundle but gets no card of its own; its props travel in the root's doc.
const GROUPS = {
  Actions: ['Button', 'TextLink', 'ToggleGroup'],
  Forms: [
    'Input',
    'Textarea',
    'Checkbox',
    'RadioGroup',
    'Switch',
    'Select',
    'Combobox',
    'NumberField',
    'Slider',
    'DatePicker',
    'Calendar',
    'Form',
  ],
  'Data display': [
    'Table',
    'Card',
    'Avatar',
    'AvatarGroup',
    'Badge',
    'Timeline',
    'Stepper',
    'Progress',
    'Separator',
    'Sticker',
    'Accordion',
  ],
  Feedback: [
    'Alert',
    'NoticeProvider',
    'EmptyState',
    'ErrorState',
    'Spinner',
    'Skeleton',
    'Tooltip',
  ],
  Overlays: ['Dialog', 'Drawer', 'DropdownMenu'],
  Navigation: ['Tabs', 'Breadcrumb', 'Pagination', 'Sidebar'],
}

const groupOf = Object.fromEntries(
  Object.entries(GROUPS).flatMap(([group, names]) =>
    names.map((name) => [name, group]),
  ),
)
const ROOT_COMPONENTS = Object.keys(groupOf).toSorted()

// ADRs that describe the design language itself. The rest of docs/adr/ records
// implementation decisions (which primitive library, where class strings live)
// that a design agent composing UI has no use for.
const DESIGN_ADRS = [
  '0001-motion-language.md',
  '0002-feedback-rule-scope.md',
  '0003-flat-surfaces.md',
  '0004-palette-only-colors.md',
  '0008-feedback-is-noticed-where-attention-is.md',
]

// Utilities a design agent reaches for when writing its own layout around
// these components. Tailwind only emits what it finds in @source files, and a
// rendered design gets the stylesheet as-is with no build step, so anything
// absent here silently does nothing in the agent's output.
const SAFELIST = [
  'flex inline-flex grid inline-grid block inline-block inline hidden contents',
  'flex-row flex-col flex-wrap flex-nowrap flex-1 flex-none shrink-0 grow',
  'items-{start,center,end,baseline,stretch}',
  'justify-{start,center,end,between,around,evenly}',
  'self-{start,center,end,stretch}',
  'grid-cols-{1,2,3,4,5,6,7,8,9,10,11,12}',
  'grid-rows-{1,2,3,4,5,6}',
  'col-span-{1,2,3,4,5,6,7,8,9,10,11,12} col-span-full',
  'row-span-{1,2,3,4,5,6}',
  'gap-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,10,12,16,20,24}',
  'gap-{x,y}-{0,1,2,3,4,5,6,8,10,12}',
  '{p,px,py,pt,pr,pb,pl}-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,10,12,16,20,24}',
  '{m,mx,my,mt,mr,mb,ml}-{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,8,10,12,16,auto}',
  'w-{0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px,auto,full,screen,min,max,fit}',
  'h-{0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,56,64,72,80,96,px,auto,full,screen,min,max,fit}',
  '{min,max}-w-{0,full,min,max,fit,screen,xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}',
  '{min,max}-h-{0,full,min,max,fit,screen}',
  'size-{3,3.5,4,5,6,7,8,9,10,12,16,20,full}',
  'text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}',
  'font-{light,normal,medium,semibold,bold} font-{sans,heading,mono}',
  'text-{left,center,right,justify} truncate text-balance text-pretty text-nowrap',
  'leading-{none,tight,snug,normal,relaxed,loose} tracking-{tight,normal,wide}',
  'uppercase lowercase capitalize normal-case line-through underline no-underline',
  'rounded-{none,sm,md,lg,xl,2xl,3xl,full}',
  'rounded-{t,r,b,l,tl,tr,br,bl}-{none,sm,md,lg,xl,2xl,3xl,full}',
  'border border-{0,2,4,8} border-{t,r,b,l}-{0,2,4}',
  'relative absolute fixed sticky static inset-0 top-0 right-0 bottom-0 left-0',
  'z-{0,10,20,30,40,50}',
  'overflow-{auto,hidden,visible,scroll} overflow-{x,y}-{auto,hidden,visible,scroll}',
  'opacity-{0,5,10,20,25,30,40,50,60,70,75,80,90,95,100}',
  'cursor-{pointer,default,not-allowed,wait,text} select-none pointer-events-none',
  'list-{none,disc,decimal} whitespace-{normal,nowrap,pre,pre-line,pre-wrap}',
  'aspect-{auto,square,video} object-{contain,cover,fill,none,scale-down}',
  // Functional colour aliases from the theme layer - the vocabulary a design
  // agent is told to use in conventions.md.
  '{bg,text,border,ring,fill,stroke,divide,outline}-{background,foreground,card,card-foreground,popover,popover-foreground,primary,primary-foreground,secondary,secondary-foreground,muted,muted-foreground,accent,accent-foreground,destructive,destructive-foreground,success,success-foreground,warning,warning-foreground,border,input,ring,indicator,transparent,current,inherit}',
  // Responsive and state variants over the layout families above; Tailwind
  // expands each variant against every listed utility.
  '{sm,md,lg,xl}:{flex,grid,hidden,block,flex-row,flex-col}',
  '{sm,md,lg,xl}:grid-cols-{1,2,3,4,5,6}',
  '{sm,md,lg,xl}:{p,px,py,gap,m,mx,my}-{0,1,2,3,4,5,6,8,10,12}',
  '{sm,md,lg,xl}:text-{xs,sm,base,lg,xl,2xl,3xl,4xl}',
  '{sm,md,lg,xl}:w-{auto,full,fit}',
  'hover:{bg,text,border}-{accent,accent-foreground,muted,primary,primary-foreground,border}',
  'focus-visible:outline-none',
]

function readComponentDirectories() {
  return readdirSync(REGISTRY_UI_DIR)
    .filter((entry) => entry !== '__test__')
    .filter((entry) => statSync(join(REGISTRY_UI_DIR, entry)).isDirectory())
    .toSorted()
}

function writePackageManifest() {
  writeFileSync(
    join(PACKAGE_DIR, 'package.json'),
    JSON.stringify(
      {
        name: 'flyingsalmon',
        version: '0.1.0',
        private: true,
        type: 'module',
        module: './entry.ts',
        types: './types/index.d.ts',
      },
      null,
      2,
    ) + '\n',
  )
}

function writeBundleEntry(componentDirectories) {
  const lines = componentDirectories.map((directory) => {
    const target = relative(
      PACKAGE_DIR,
      join(REGISTRY_UI_DIR, directory),
    ).replaceAll('\\', '/')
    return `export * from '${target}'`
  })
  writeFileSync(join(PACKAGE_DIR, 'entry.ts'), lines.join('\n') + '\n')
}

function emitDeclarations() {
  const tsconfigPath = join(CACHE_DIR, 'tsconfig.declarations.json')
  writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          jsx: 'react-jsx',
          module: 'ESNext',
          moduleResolution: 'bundler',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          strict: true,
          skipLibCheck: true,
          declaration: true,
          emitDeclarationOnly: true,
          allowImportingTsExtensions: false,
          verbatimModuleSyntax: true,
          rootDir: '../../src',
          outDir: './pkg/types',
          paths: { '@/*': ['../../src/*'] },
        },
        include: [
          '../../src/registry/**/*.ts',
          '../../src/registry/**/*.tsx',
          '../../src/lib/**/*.ts',
        ],
        exclude: ['../../src/**/__test__/**'],
      },
      null,
      2,
    ) + '\n',
  )
  execFileSync(
    process.execPath,
    [
      join(REPO_ROOT, 'node_modules', 'typescript', 'bin', 'tsc'),
      '-p',
      tsconfigPath,
    ],
    {
      cwd: REPO_ROOT,
      stdio: 'inherit',
    },
  )
}

// ts-morph reads the emitted tree with no tsconfig paths, so an unresolved
// `@/...` specifier collapses every type behind it to `any` - and those types
// are the API contract the design agent codes against.
function rewritePathAliases() {
  const declarationFiles = []
  const collect = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = join(directory, entry.name)
      if (entry.isDirectory()) collect(full)
      else if (entry.name.endsWith('.d.ts')) declarationFiles.push(full)
    }
  }
  collect(TYPES_DIR)

  for (const file of declarationFiles) {
    const source = readFileSync(file, 'utf8')
    const rewritten = source.replaceAll(
      /(['"])@\/([^'"]+)\1/g,
      (_match, quote, aliasTarget) => {
        let relativeTarget = relative(
          dirname(file),
          join(TYPES_DIR, aliasTarget),
        ).replaceAll('\\', '/')
        if (!relativeTarget.startsWith('.'))
          relativeTarget = `./${relativeTarget}`
        return `${quote}${relativeTarget}${quote}`
      },
    )
    if (rewritten !== source) writeFileSync(file, rewritten)
  }
  return declarationFiles.length
}

// The converter reads this barrel to decide which components get a preview
// card, so it names only the browsable roots. Compound parts stay out of it and
// remain importable through entry.ts, which exports every registry module.
function writeTypesBarrel(directoryByRoot) {
  const lines = ROOT_COMPONENTS.map((rootExport) => {
    const directory = directoryByRoot[rootExport]
    const indexText = readFileSync(
      join(TYPES_DIR, 'registry', 'ui', directory, 'index.d.ts'),
      'utf8',
    )
    const named = indexText.includes(`${rootExport}Props`)
      ? `${rootExport}, type ${rootExport}Props`
      : rootExport
    return `export { ${named} } from './registry/ui/${directory}';`
  })
  writeFileSync(join(TYPES_DIR, 'index.d.ts'), lines.join('\n') + '\n')
}

const toPascalCase = (kebab) =>
  kebab
    .split('-')
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join('')

// Every registry directory names its root export and its implementation file
// after itself, except notice, whose entry point is the provider.
const ROOT_EXPORT_OVERRIDES = { notice: 'NoticeProvider' }
const SOURCE_FILE_OVERRIDES = { notice: 'notice-provider.tsx' }
const rootExportFor = (directory) =>
  ROOT_EXPORT_OVERRIDES[directory] ?? toPascalCase(directory)

// The converter derives a component's picker section from the last meaningful
// segment of its source path, and only falls back to the doc's `category` when
// that yields nothing. A kebab directory like `avatar-group` doesn't match
// `AvatarGroup`, so it survives the filter and becomes a section of one. This
// mirror gives every component a directory named exactly after it, which the
// filter does drop - so `category` decides the section for every component alike.
// Content is copied rather than linked so the converter's source hash still
// tracks real edits; prepare runs before every build.
function writeSourceMirror(directoryByRoot) {
  const mirrorDir = join(CACHE_DIR, 'srcmirror')
  rmSync(mirrorDir, { recursive: true, force: true })

  for (const [rootExport, directory] of Object.entries(directoryByRoot)) {
    if (!groupOf[rootExport]) continue
    const fileName = SOURCE_FILE_OVERRIDES[directory] ?? `${directory}.tsx`
    const source = join(REGISTRY_UI_DIR, directory, fileName)
    if (!existsSync(source))
      throw new Error(`no implementation file: ${source}`)
    mkdirSync(join(mirrorDir, rootExport), { recursive: true })
    cpSync(source, join(mirrorDir, rootExport, 'index.tsx'))
  }
}

function readDirectoryDeclarations(directory) {
  const base = join(TYPES_DIR, 'registry', 'ui', directory)
  return readdirSync(base)
    .filter((name) => name.endsWith('.d.ts'))
    .map((name) => readFileSync(join(base, name), 'utf8'))
    .join('\n')
}

// Pull a named type's declaration text back out of the emitted tree. Interfaces
// are brace-matched because they nest; type aliases run to their semicolon.
function extractTypeDeclaration(declarationText, typeName) {
  const interfaceStart = declarationText.search(
    new RegExp(`(?:export )?(?:declare )?interface ${typeName}\\b`),
  )
  if (interfaceStart >= 0) {
    const openBrace = declarationText.indexOf('{', interfaceStart)
    let depth = 0
    for (let index = openBrace; index < declarationText.length; index++) {
      if (declarationText[index] === '{') depth++
      else if (declarationText[index] === '}') {
        depth--
        if (depth === 0) {
          return declarationText
            .slice(interfaceStart, index + 1)
            .replace(/^export /, '')
        }
      }
    }
  }
  const alias = new RegExp(
    `(?:export )?(?:declare )?type ${typeName}\\b[^=]*=[\\s\\S]*?;`,
  ).exec(declarationText)
  return alias ? alias[0].replace(/^export /, '') : null
}

// Compound parts get no card of their own, so this is the only place their
// props reach the design agent.
function describeParts(directory, rootExport) {
  const indexPath = join(TYPES_DIR, 'registry', 'ui', directory, 'index.d.ts')
  const indexText = readFileSync(indexPath, 'utf8')
  const declarationText = readDirectoryDeclarations(directory)

  const exportedNames = [
    ...indexText.matchAll(/export\s*\{([\s\S]*?)\}\s*from/g),
  ]
    .flatMap((match) => match[1].split(','))
    .map((entry) =>
      entry
        .trim()
        .replace(/^type\s+/, '')
        .replace(/\s+/g, ' ')
        .split(' as ')
        .pop(),
    )
    .filter(Boolean)

  const partNames = exportedNames.filter(
    (name) =>
      /^[A-Z]/.test(name) && !name.endsWith('Props') && name !== rootExport,
  )

  const described = []
  for (const partName of [...new Set(partNames)].toSorted()) {
    // Parts rarely own a <Part>Props type - several members of a family share
    // one slot type - so fall back to whatever their signature actually names.
    const signatureType =
      new RegExp(
        `declare function ${partName}\\s*\\([^)]*?:\\s*([A-Za-z_$][\\w$]*)`,
      ).exec(declarationText)?.[1] ??
      new RegExp(
        `declare const ${partName}\\s*:[^=\\n]*?<\\s*([A-Za-z_$][\\w$]*)`,
      ).exec(declarationText)?.[1]

    const propsTypeName = declarationText.includes(`${partName}Props`)
      ? `${partName}Props`
      : signatureType

    const propsDeclaration =
      propsTypeName && extractTypeDeclaration(declarationText, propsTypeName)

    described.push(
      propsDeclaration
        ? `### ${partName}\n\n\`\`\`ts\n${propsDeclaration}\n\`\`\``
        : `### ${partName}\n\nTakes the props of the element it renders.`,
    )
  }
  return described
}

// Authored preview exports double as the usage examples the design agent
// imitates, so the doc quotes them rather than restating them by hand.
function previewExamples(rootExport) {
  const previewPath = join(PREVIEWS_DIR, `${rootExport}.tsx`)
  if (!existsSync(previewPath)) return null
  const source = readFileSync(previewPath, 'utf8')
    .split('\n')
    .filter((line) => !/^\s*import\b/.test(line))
    .join('\n')
    .trim()
  return source ? `\`\`\`jsx\n${source}\n\`\`\`` : null
}

function writeComponentDocs(directoryByRoot) {
  const docsDir = join(PACKAGE_DIR, 'docs')
  mkdirSync(docsDir, { recursive: true })

  for (const rootExport of ROOT_COMPONENTS) {
    const directory = directoryByRoot[rootExport]
    if (!directory) throw new Error(`no registry directory for ${rootExport}`)

    const sections = [`---\ncategory: ${groupOf[rootExport]}\n---`]

    const prosePath = join(PROSE_DIR, `${rootExport}.md`)
    if (existsSync(prosePath))
      sections.push(readFileSync(prosePath, 'utf8').trim())

    const parts = describeParts(directory, rootExport)
    if (parts.length) sections.push(['## Parts', ...parts].join('\n\n'))

    const examples = previewExamples(rootExport)
    if (examples) sections.push(`## Examples\n\n${examples}`)

    writeFileSync(
      join(docsDir, `${rootExport}.md`),
      sections.join('\n\n') + '\n',
    )
  }
  return ROOT_COMPONENTS.length
}

// The repo's own src/styles.css is the theme source. Fonts are deliberately
// left out and wired through cfg.extraFonts instead: inlined here their
// url()s would resolve against the fontsource package, not the bundle.
function compileStylesheet() {
  const entryPath = join(PACKAGE_DIR, 'tailwind-entry.css')
  const themeSource = readFileSync(join(REPO_ROOT, 'src', 'styles.css'), 'utf8')
    .split('\n')
    .filter((line) => !line.includes('@fontsource-variable/'))
    .join('\n')

  writeFileSync(
    entryPath,
    [
      themeSource,
      '',
      "@source '../../../src/registry';",
      "@source '../../../src/routes';",
      "@source '../../../.design-sync/previews';",
      ...SAFELIST.map((pattern) => `@source inline('${pattern}');`),
      '',
    ].join('\n'),
  )

  execFileSync(
    process.execPath,
    [
      join(
        REPO_ROOT,
        '.ds-sync',
        'node_modules',
        '@tailwindcss',
        'cli',
        'dist',
        'index.mjs',
      ),
      '-i',
      entryPath,
      '-o',
      join(PACKAGE_DIR, 'styles.css'),
      '--minify',
    ],
    { cwd: REPO_ROOT, stdio: 'inherit' },
  )
}

// The emitter mirrors each guideline's package-relative subpath under
// guidelines/, so these land at the package root to keep the uploaded paths
// flat.
function copyDesignGuidelines() {
  for (const name of DESIGN_ADRS) {
    const source = join(REPO_ROOT, 'docs', 'adr', name)
    if (!existsSync(source)) throw new Error(`design ADR missing: ${source}`)
    cpSync(source, join(PACKAGE_DIR, name))
  }
}

const componentDirectories = readComponentDirectories()
const directoryByRoot = Object.fromEntries(
  componentDirectories.map((directory) => [
    rootExportFor(directory),
    directory,
  ]),
)
for (const rootExport of ROOT_COMPONENTS) {
  if (!directoryByRoot[rootExport])
    throw new Error(`no registry directory for ${rootExport}`)
}

rmSync(PACKAGE_DIR, { recursive: true, force: true })
mkdirSync(PACKAGE_DIR, { recursive: true })

writePackageManifest()
writeBundleEntry(componentDirectories)
emitDeclarations()
const declarationCount = rewritePathAliases()
writeTypesBarrel(directoryByRoot)
const docCount = writeComponentDocs(directoryByRoot)
writeSourceMirror(directoryByRoot)
compileStylesheet()
copyDesignGuidelines()

const stylesheetBytes = statSync(join(PACKAGE_DIR, 'styles.css')).size
console.error(
  `prepared ${componentDirectories.length} registry dirs → ${ROOT_COMPONENTS.length} browsable components, ` +
    `${declarationCount} .d.ts files, ${docCount} docs, ` +
    `${(stylesheetBytes / 1024).toFixed(0)}KB stylesheet, ${DESIGN_ADRS.length} guidelines`,
)
