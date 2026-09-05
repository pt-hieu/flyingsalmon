import { cva, type VariantProps } from 'class-variance-authority'
import { Check, ChevronDown } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'
import {
  FieldErrorMessage,
  fieldLabelVariants,
  useFieldIds,
} from '@/registry/lib/field'
import {
  boundaryFocusRingGeometry,
  disabledInteraction,
  invalidBoundaryFocusRingGeometry,
} from '@/registry/lib/interaction'
import {
  menuContent,
  menuItem,
  menuItemHighlighted,
  menuItemIconSlot,
  menuLabel,
  menuSeparator,
} from '@/registry/lib/menu'
import { Spinner } from '@/registry/ui/spinner'

const selectTriggerVariants = cva(
  cn(
    'group border-input bg-background text-foreground relative flex w-full items-center justify-between gap-2 rounded-md border',
    'data-[placeholder]:text-muted-foreground',
    'transition-[color,border-color,box-shadow] duration-(--motion-fast)',
    'enabled:hover:not-focus-visible:border-neutral-300 dark:enabled:hover:not-focus-visible:border-neutral-600',
    'focus-visible:ring-ring',
    boundaryFocusRingGeometry,
    disabledInteraction,
    'aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive',
    invalidBoundaryFocusRingGeometry,
  ),
  {
    variants: {
      size: {
        default: 'h-9 pl-3 pr-9 text-sm',
        sm: 'h-8 pl-2.5 pr-8 text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const selectEndSlotVariants = cva(
  'pointer-events-none absolute flex items-center',
  {
    variants: {
      size: {
        default: 'right-3',
        sm: 'right-2.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const selectChevronClassName =
  'text-muted-foreground size-4 shrink-0 transition-transform duration-(--motion-base) group-data-[state=open]:rotate-180'

const selectContentAnimationClassName =
  'data-[state=open]:animate-floating-anchored-enter data-[state=closed]:animate-floating-anchored-exit'

let exhibitionModeMountCount = 0
let exhibitionModeBodyObserver: MutationObserver | null = null

function keepDocumentBodyInteractiveWhileExhibiting() {
  exhibitionModeMountCount += 1

  exhibitionModeBodyObserver ??= new MutationObserver(() => {
    if (document.body.style.pointerEvents === 'none') {
      document.body.style.pointerEvents = ''
    }
  })
  exhibitionModeBodyObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['style'],
  })
  document.body.style.pointerEvents = ''

  return () => {
    exhibitionModeMountCount -= 1

    if (exhibitionModeMountCount === 0 && exhibitionModeBodyObserver) {
      exhibitionModeBodyObserver.disconnect()
      exhibitionModeBodyObserver = null
      document.body.style.pointerEvents = ''
    }
  }
}

export type SelectSize = NonNullable<
  VariantProps<typeof selectTriggerVariants>['size']
>

type SelectPanelSide = NonNullable<
  React.ComponentProps<typeof SelectPrimitive.Content>['side']
>
type SelectPanelAlign = NonNullable<
  React.ComponentProps<typeof SelectPrimitive.Content>['align']
>

function SelectPanel({
  side,
  align,
  children,
}: {
  side: SelectPanelSide
  align: SelectPanelAlign
  children?: React.ReactNode
}) {
  return (
    <SelectPrimitive.Content
      position="popper"
      side={side}
      align={align}
      sideOffset={8}
      collisionPadding={8}
      className={cn(
        menuContent,
        'w-(--radix-select-trigger-width) max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) outline-hidden',
        selectContentAnimationClassName,
      )}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
}

export interface SelectProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Root>,
  'children'
> {
  label?: string
  size?: SelectSize
  error?: string
  loading?: boolean
  placeholder?: string
  id?: string
  'aria-describedby'?: string
  side?: SelectPanelSide
  align?: SelectPanelAlign
  exhibitionMode?: boolean
  className?: string
  children?: React.ReactNode
}

export function Select({
  label,
  size = 'default',
  error,
  loading = false,
  placeholder,
  id,
  'aria-describedby': callerDescribedBy,
  disabled,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  side = 'bottom',
  align = 'center',
  exhibitionMode = false,
  className,
  children,
  ...props
}: SelectProps) {
  const { fieldId, errorMessageId, describedBy } = useFieldIds({
    id,
    error,
    describedBy: callerDescribedBy,
  })

  const hasError = Boolean(error)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!exhibitionMode) {
      return
    }

    return keepDocumentBodyInteractiveWhileExhibiting()
  }, [exhibitionMode])

  function guardOpeningWhileLoading(event: { preventDefault: () => void }) {
    if (loading) {
      event.preventDefault()
    }
  }

  const panel = (
    <SelectPanel side={side} align={align}>
      {children}
    </SelectPanel>
  )

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {label ? (
        <label
          htmlFor={fieldId}
          onClick={(event) => {
            event.preventDefault()
            triggerRef.current?.focus()
          }}
          className={fieldLabelVariants({
            placement: 'above',
            error: hasError,
            disabled: Boolean(disabled),
          })}
        >
          {label}
        </label>
      ) : null}

      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={exhibitionMode ? true : open}
        defaultOpen={defaultOpen}
        onOpenChange={exhibitionMode ? () => {} : onOpenChange}
        disabled={disabled}
        required={required}
        name={name}
        {...props}
      >
        <SelectPrimitive.Trigger
          ref={triggerRef}
          id={fieldId}
          aria-invalid={hasError ? true : undefined}
          aria-busy={loading || undefined}
          aria-describedby={describedBy}
          onPointerDown={guardOpeningWhileLoading}
          onKeyDown={guardOpeningWhileLoading}
          onClick={guardOpeningWhileLoading}
          className={selectTriggerVariants({ size })}
        >
          <span className="min-w-0 flex-1 truncate text-left">
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>

          <span className={selectEndSlotVariants({ size })}>
            {loading ? (
              <Spinner
                aria-hidden
                size={size}
                className={hasError ? 'text-destructive' : undefined}
              />
            ) : (
              <ChevronDown aria-hidden className={selectChevronClassName} />
            )}
          </span>
        </SelectPrimitive.Trigger>

        {exhibitionMode ? (
          panel
        ) : (
          <SelectPrimitive.Portal>{panel}</SelectPrimitive.Portal>
        )}
      </SelectPrimitive.Root>

      <FieldErrorMessage id={errorMessageId}>{error}</FieldErrorMessage>
    </div>
  )
}

export interface SelectItemProps extends Omit<
  React.ComponentProps<typeof SelectPrimitive.Item>,
  'children' | 'textValue'
> {
  children: string
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(menuItem, menuItemHighlighted, 'outline-hidden', className)}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </span>

      <span className={menuItemIconSlot}>
        <SelectPrimitive.ItemIndicator>
          <Check aria-hidden className="text-primary size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

export function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
) {
  return <SelectPrimitive.Group {...props} />
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label className={cn(menuLabel, className)} {...props} />
  )
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(menuSeparator, className)}
      {...props}
    />
  )
}
