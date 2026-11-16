import { Fragment, useMemo } from 'react'

import {
  codeBlockClassName,
  codeBlockCopySlotClassName,
  codeBlockPreClassName,
  codeTokenClassName,
} from './classnames'
import { CopyButton } from './copy-button'
import { highlightCode } from './highlight-code'
import { CodeLanguage } from './types'
import type { CodeTokenStyle } from './types'

export interface CodeBlockProps {
  code: string
  language?: CodeLanguage
  label: string
}

export function CodeBlock({
  code,
  language = CodeLanguage.Tsx,
  label,
}: CodeBlockProps) {
  const lines = useMemo(() => highlightCode(code, language), [code, language])

  return (
    <div className={codeBlockClassName}>
      <pre
        role="group"
        tabIndex={0}
        aria-label={label}
        className={codeBlockPreClassName}
      >
        <code>
          {lines.map((line) => (
            <Fragment key={line.offset}>
              {line.offset > 0 ? '\n' : null}
              {line.tokens.map((token) => {
                const tokenStyle: CodeTokenStyle = {
                  '--code-token-color': token.color,
                }

                return (
                  <span
                    key={token.offset}
                    className={codeTokenClassName}
                    style={tokenStyle}
                  >
                    {token.content}
                  </span>
                )
              })}
            </Fragment>
          ))}
        </code>
      </pre>

      <div className={codeBlockCopySlotClassName}>
        <CopyButton text={code} />
      </div>
    </div>
  )
}
