import { Slider as SliderPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'

import {
  sliderActionClassName,
  sliderDescriptionVariants,
  sliderFillClassName,
  sliderLabelClassName,
  sliderRootClassName,
  sliderStepDotClassName,
  sliderThumbClassName,
  sliderTrackClassName,
  sliderWellVariants,
  sliderWrapperClassName,
} from './classnames'
import { stepPercents, thumbCenterOffset, valuePercent } from './utils'

export interface SliderProps {
  label: string
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  description?: string
  action?: React.ReactNode
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

export function Slider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  description,
  action,
  required = false,
  disabled = false,
  id,
  name,
  className,
}: SliderProps) {
  const generatedId = useId()
  const thumbId = id ?? generatedId
  const labelId = `${thumbId}-label`

  const fillWidth = thumbCenterOffset(valuePercent(value, min, max))
  const stepDotOffsets = stepPercents(min, max, step).map(thumbCenterOffset)

  return (
    <div className={cn(sliderWrapperClassName, className)}>
      <span
        id={labelId}
        className={sliderLabelClassName({ disabled, required })}
      >
        {label}
      </span>

      <div className={sliderWellVariants({ disabled })}>
        <SliderPrimitive.Root
          className={sliderRootClassName}
          min={min}
          max={max}
          step={step}
          value={[value]}
          disabled={disabled}
          name={name}
          onValueChange={([nextValue]) => onValueChange(nextValue)}
        >
          <SliderPrimitive.Track className={sliderTrackClassName}>
            <span
              aria-hidden
              className={sliderFillClassName}
              style={{ width: fillWidth }}
            />
            {stepDotOffsets.map((stepDotOffset) => (
              <span
                key={stepDotOffset}
                aria-hidden
                className={sliderStepDotClassName}
                style={{ left: stepDotOffset }}
              />
            ))}
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            id={thumbId}
            aria-labelledby={labelId}
            aria-valuetext={description}
            className={sliderThumbClassName}
          />
        </SliderPrimitive.Root>
      </div>

      {action ? <div className={sliderActionClassName}>{action}</div> : null}

      {description ? (
        <p className={sliderDescriptionVariants({ disabled })}>{description}</p>
      ) : null}
    </div>
  )
}
