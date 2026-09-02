import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { createContext, use } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/ui/button'

export type DialogSize = 'default' | 'lg'

interface DialogContextValue {
  size: DialogSize
  dismissible: boolean
  pending: boolean
  exhibitionMode: boolean
}

const DialogContext = createContext<DialogContextValue>({
  size: 'default',
  dismissible: true,
  pending: false,
  exhibitionMode: false,
})

export interface DialogProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Root>,
  'modal'
> {
  size?: DialogSize
  dismissible?: boolean
  pending?: boolean
  exhibitionMode?: boolean
}

export function Dialog({
  size = 'default',
  dismissible = true,
  pending = false,
  exhibitionMode = false,
  ...props
}: DialogProps) {
  return (
    <DialogContext value={{ size, dismissible, pending, exhibitionMode }}>
      <DialogPrimitive.Root modal={!exhibitionMode} {...props} />
    </DialogContext>
  )
}

export interface DialogTriggerProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Trigger>,
  'asChild'
> {
  children: React.ReactElement
}

export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild {...props}>
      {children}
    </DialogPrimitive.Trigger>
  )
}

export interface DialogCloseProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Close>,
  'asChild'
> {
  children: React.ReactElement
}

export function DialogClose({ children, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close asChild {...props}>
      {children}
    </DialogPrimitive.Close>
  )
}

const dialogOverlayVariants = cva(
  cn(
    'fixed inset-0 z-50 bg-neutral-950 opacity-50',
    'data-[state=open]:animate-floating-overlay-enter',
    'data-[state=closed]:animate-floating-overlay-exit',
  ),
)

const dialogContentVariants = cva(
  cn(
    'bg-popover text-popover-foreground border-border z-50 flex w-[calc(100%-2rem)] flex-col gap-4',
    'max-h-[calc(100dvh-2rem)] overflow-hidden rounded-xl border outline-hidden',
    'data-[state=open]:animate-floating-dialog-enter',
    'data-[state=closed]:animate-floating-dialog-exit',
  ),
  {
    variants: {
      size: {
        default: 'max-w-md',
        lg: 'max-w-2xl',
      },
      exhibitionMode: {
        true: 'absolute inset-0 m-auto h-fit',
        false: 'fixed inset-0 m-auto h-fit',
      },
    },
    defaultVariants: {
      size: 'default',
      exhibitionMode: false,
    },
  },
)

export interface DialogContentProps extends Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  'onEscapeKeyDown' | 'onPointerDownOutside' | 'onInteractOutside'
> {}

export function DialogContent({
  className,
  children,
  ...props
}: DialogContentProps) {
  const { size, dismissible, pending, exhibitionMode } = use(DialogContext)

  const content = (
    <DialogPrimitive.Content
      aria-busy={pending || undefined}
      onEscapeKeyDown={(event) => {
        if (pending) event.preventDefault()
      }}
      onPointerDownOutside={(event) => {
        if (pending || !dismissible) event.preventDefault()
      }}
      onInteractOutside={(event) => {
        if (pending || !dismissible) event.preventDefault()
      }}
      className={cn(dialogContentVariants({ size, exhibitionMode }), className)}
      {...props}
    >
      {children}

      <DialogPrimitive.Close asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close"
          disabled={pending}
          className="absolute top-4 right-4"
        >
          <X />
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  )

  if (exhibitionMode) {
    return (
      <>
        <div
          aria-hidden
          className="bg-neutral-950 absolute inset-0 z-50 opacity-50"
        />
        {content}
      </>
    )
  }

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={dialogOverlayVariants()} />
      {content}
    </DialogPrimitive.Portal>
  )
}

export function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'font-heading px-(--dialog-spacing) pt-(--dialog-spacing) pr-12 text-lg font-semibold',
        className,
      )}
      {...props}
    />
  )
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn(
        'text-muted-foreground -mt-3 px-(--dialog-spacing) text-sm',
        className,
      )}
      {...props}
    />
  )
}

export function DialogBody({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto px-(--dialog-spacing)',
        className,
      )}
      {...props}
    />
  )
}

const dialogFooterVariants = cva(
  cn(
    'flex flex-col-reverse gap-2 px-(--dialog-spacing) pb-(--dialog-spacing)',
    'sm:flex-row sm:justify-end',
    '[&>*]:w-full sm:[&>*]:w-auto',
  ),
)

export function DialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className={cn(dialogFooterVariants(), className)} {...props} />
}
