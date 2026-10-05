import { createCssVariablesTheme, createHighlighterCoreSync } from 'shiki/core'
import type { HighlighterCore, ThemedToken } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import bash from 'shiki/langs/bash.mjs'
import tsx from 'shiki/langs/tsx.mjs'

import type { CodeLanguage } from './types'

const themeName = 'flyingsalmon'

let highlighter: HighlighterCore | null = null

function getHighlighter() {
  highlighter ??= createHighlighterCoreSync({
    themes: [createCssVariablesTheme({ name: themeName, fontStyle: false })],
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
