import { Slider as SliderPrimitive } from 'radix-ui'
import { useId } from 'react'

import { cn } from '@/lib/utils'
import { FieldDescription } from '@/registry/lib/field'

import {
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
  required = false,
  disabled = false,
  id,
  name,
  className,
}: SliderProps) {
  const generatedId = useId()
  const thumbId = id ?? generatedId
  const labelId = `${thumbId}-label`
  const descriptionId = `${thumbId}-description`

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
              style={
                { '--slider-fill-width': fillWidth } as React.CSSProperties
              }
            />
            {stepDotOffsets.map((stepDotOffset) => (
              <span
                key={stepDotOffset}
                aria-hidden
                className={sliderStepDotClassName}
                style={
                  {
                    '--slider-step-dot-offset': stepDotOffset,
                  } as React.CSSProperties
                }
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

      <FieldDescription id={descriptionId} disabled={disabled}>
        {description}
      </FieldDescription>
    </div>
  )
}
