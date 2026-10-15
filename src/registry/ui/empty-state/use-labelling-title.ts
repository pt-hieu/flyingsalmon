import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react'

export function useLabellingTitle() {
  const defaultTitleId = useId()
  const [labellingTitleId, setLabellingTitleId] = useState<string | undefined>(
    defaultTitleId,
  )
  const titleRegisteredRef = useRef(false)

  const registerTitleId = useCallback((titleId: string | undefined) => {
    titleRegisteredRef.current = titleId !== undefined
    setLabellingTitleId(titleId)
  }, [])

  useLayoutEffect(() => {
    if (!titleRegisteredRef.current) setLabellingTitleId(undefined)
  }, [])

  return { defaultTitleId, labellingTitleId, registerTitleId }
}
