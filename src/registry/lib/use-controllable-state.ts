import { useCallback, useInsertionEffect, useRef, useState } from 'react'

export interface UseControllableStateOptions<Value> {
  value?: Value
  defaultValue: Value
  onChange?: (value: Value) => void
}

export function useControllableState<Value>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<Value>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  const isControlledRef = useRef(isControlled)
  const onChangeRef = useRef(onChange)

  useInsertionEffect(() => {
    isControlledRef.current = isControlled
    onChangeRef.current = onChange
  })

  const setValue = useCallback((nextValue: Value) => {
    if (!isControlledRef.current) {
      setUncontrolledValue(() => nextValue)
    }

    onChangeRef.current?.(nextValue)
  }, [])

  return [currentValue, setValue] as const
}
