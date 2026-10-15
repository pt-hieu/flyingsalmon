import { Minus, Plus } from 'lucide-react'

import { Spinner } from '../spinner'

import {
  numberFieldLoadingSlotVariants,
  numberFieldSpinnerErrorClassName,
} from './classnames'
import { NumberFieldSpinButton } from './number-field-spin-button'
import type { NumberFieldSize } from './types'
import { spinnerSizeFor } from './utils'

export interface NumberFieldControlsProps {
  size: NumberFieldSize
  error: boolean
  loading: boolean
  controlsId: string
  decreaseDisabled: boolean
  increaseDisabled: boolean
  onDecrease: () => void
  onIncrease: () => void
}

export function NumberFieldControls({
  size,
  error,
  loading,
  controlsId,
  decreaseDisabled,
  increaseDisabled,
  onDecrease,
  onIncrease,
}: NumberFieldControlsProps) {
  if (loading) {
    return (
      <div className={numberFieldLoadingSlotVariants({ size, error })}>
        <Spinner
          aria-hidden
          size={spinnerSizeFor(size)}
          className={error ? numberFieldSpinnerErrorClassName : undefined}
        />
      </div>
    )
  }

  return (
    <>
      <NumberFieldSpinButton
        label="Decrease"
        size={size}
        error={error}
        disabled={decreaseDisabled}
        controlsId={controlsId}
        onStep={onDecrease}
      >
        <Minus aria-hidden />
      </NumberFieldSpinButton>

      <NumberFieldSpinButton
        label="Increase"
        size={size}
        error={error}
        disabled={increaseDisabled}
        controlsId={controlsId}
        onStep={onIncrease}
      >
        <Plus aria-hidden />
      </NumberFieldSpinButton>
    </>
  )
}
