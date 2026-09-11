import { useCallback, useEffect, useRef } from 'react'

const holdRepeatDelayMs = 400
const holdRepeatIntervalMs = 60

export function useHoldRepeat(action: () => void) {
  const actionRef = useRef(action)
  const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const repeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    actionRef.current = action
  })

  const stopHoldRepeat = useCallback(() => {
    if (delayTimeoutRef.current !== null) {
      clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = null
    }

    if (repeatIntervalRef.current !== null) {
      clearInterval(repeatIntervalRef.current)
      repeatIntervalRef.current = null
    }
  }, [])

  const startHoldRepeat = useCallback(() => {
    stopHoldRepeat()
    actionRef.current()

    delayTimeoutRef.current = setTimeout(() => {
      repeatIntervalRef.current = setInterval(() => {
        actionRef.current()
      }, holdRepeatIntervalMs)
    }, holdRepeatDelayMs)
  }, [stopHoldRepeat])

  useEffect(() => stopHoldRepeat, [stopHoldRepeat])

  return { startHoldRepeat, stopHoldRepeat }
}
