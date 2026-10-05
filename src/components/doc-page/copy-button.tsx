import { useState } from 'react'

import { Button, ButtonSize, ButtonVariant } from '@/registry/ui/button'

import { copyButtonStatusClassName } from './classnames'
import { copyButtonContentByState } from './copy-button-content-by-state'
import { CopyState } from './types'

export interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copyState, setCopyState] = useState(CopyState.Idle)

  const content = copyButtonContentByState[copyState]

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState(CopyState.Copied)
    } catch {
      setCopyState(CopyState.Failed)
    }
  }

  function settle() {
    setCopyState(CopyState.Idle)
  }

  function settleWhenMouseLeaves(event: React.PointerEvent) {
    if (event.pointerType === 'mouse') settle()
  }

  return (
    <>
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Small}
        icon={content.icon}
        onClick={copyText}
        onBlur={settle}
        onPointerLeave={settleWhenMouseLeaves}
      >
        {content.label}
      </Button>

      <span role="status" className={copyButtonStatusClassName}>
        {copyState === CopyState.Idle ? '' : content.label}
      </span>
    </>
  )
}
