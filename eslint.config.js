//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    // Registry sources follow shadcn upstream idiom so future `shadcn add`
    // pulls and diffs stay clean; the inline-type-specifier style is theirs.
    files: ['src/registry/**', 'src/lib/utils.ts'],
    rules: {
      'import/consistent-type-specifier-style': 'off',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
]
