import { numberFieldSpinButtonVariants } from './classnames'
import type { NumberFieldSize } from './types'
import { useHoldRepeat } from './use-hold-repeat'

export interface NumberFieldSpinButtonProps {
  label: string
  size: NumberFieldSize
  error: boolean
  disabled: boolean
  controlsId: string
  onStep: () => void
  children: React.ReactNode
}

export function NumberFieldSpinButton({
  label,
  size,
  error,
  disabled,
  controlsId,
  onStep,
  children,
}: NumberFieldSpinButtonProps) {
  const { startHoldRepeat, stopHoldRepeat } = useHoldRepeat(onStep)

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (disabled) {
      return
    }

    event.preventDefault()
    startHoldRepeat()
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (disabled || event.detail !== 0) {
      return
    }

    onStep()
  }

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={label}
      aria-controls={controlsId}
      aria-disabled={disabled || undefined}
      className={numberFieldSpinButtonVariants({ size, error })}
      onPointerDown={handlePointerDown}
      onPointerUp={stopHoldRepeat}
      onPointerCancel={stopHoldRepeat}
      onPointerLeave={stopHoldRepeat}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
