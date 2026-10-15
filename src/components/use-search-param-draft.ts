import { useEffect, useRef, useState } from 'react'

export function useSearchParamDraft(
  urlValue: string,
  commit: (value: string) => Promise<void>,
) {
  const [draft, setDraft] = useState(urlValue)
  const pendingCommitCount = useRef(0)

  useEffect(() => {
    if (pendingCommitCount.current === 0) setDraft(urlValue)
  }, [urlValue])

  function updateDraft(nextValue: string) {
    setDraft(nextValue)

    pendingCommitCount.current += 1
    void commit(nextValue).finally(() => {
      pendingCommitCount.current -= 1
    })
  }

  return [draft, updateDraft] as const
}
