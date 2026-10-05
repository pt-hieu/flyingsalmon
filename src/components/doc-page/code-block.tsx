import { Fragment, useMemo } from 'react'

import {
  codeBlockClassName,
  codeBlockCopySlotClassName,
  codeBlockPreClassName,
} from './classnames'
import { CopyButton } from './copy-button'
import { highlightCode } from './highlight-code'
import { CodeLanguage } from './types'

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
          {lines.map((tokens, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 ? '\n' : null}
              {tokens.map((token, tokenIndex) => (
                <span key={tokenIndex} style={{ color: token.color }}>
                  {token.content}
                </span>
              ))}
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
