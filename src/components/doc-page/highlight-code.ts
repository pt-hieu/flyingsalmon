import { createCssVariablesTheme, createHighlighterCoreSync } from 'shiki/core'
import type { HighlighterCore, ThemedToken } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import bash from 'shiki/langs/bash.mjs'
import tsx from 'shiki/langs/tsx.mjs'

import type { CodeLanguage } from './types'

const themeName = 'flyingsalmon'

const tokenColors = {
  foreground: 'var(--color-neutral-950)',
  'token-keyword': 'var(--color-orange-700)',
  'token-string': 'var(--color-green-700)',
  'token-string-expression': 'var(--color-green-700)',
  'token-function': 'var(--color-sky-700)',
  'token-constant': 'var(--color-violet-700)',
  'token-parameter': 'var(--color-neutral-800)',
  'token-punctuation': 'var(--color-neutral-600)',
  'token-comment': 'var(--color-neutral-600)',
  'token-link': 'var(--color-sky-700)',
  'token-inserted': 'var(--color-green-700)',
  'token-deleted': 'var(--color-red-700)',
  'token-changed': 'var(--color-amber-700)',
}

let highlighter: HighlighterCore | null = null

function getHighlighter() {
  highlighter ??= createHighlighterCoreSync({
    themes: [
      createCssVariablesTheme({
        name: themeName,
        fontStyle: false,
        variableDefaults: tokenColors,
      }),
    ],
    langs: [tsx, bash],
    engine: createJavaScriptRegexEngine(),
  })

  return highlighter
}

export function highlightCode(
  code: string,
  language: CodeLanguage,
): ThemedToken[][] {
  return getHighlighter().codeToTokens(code, {
    lang: language,
    theme: themeName,
  }).tokens
}
