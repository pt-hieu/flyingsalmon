import { LayoutGroup, motion } from 'motion/react'
import { Tabs as TabsPrimitive } from 'radix-ui'
import { createContext, useContext, useId, useState } from 'react'

import { cn } from '@/lib/utils'
import { springBounce } from '@/registry/lib/motion'

interface TabsSharedState {
  activeValue: string | undefined
  focusedValue: string | undefined
  setFocusedValue: React.Dispatch<React.SetStateAction<string | undefined>>
}

const TabsSharedStateContext = createContext<TabsSharedState | null>(null)

function useTabsSharedState(componentName: string) {
  const sharedState = useContext(TabsSharedStateContext)

  if (!sharedState) {
    throw new Error(`${componentName} must be rendered inside <Tabs>`)
  }

  return sharedState
}

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const layoutGroupId = useId()
  const [activeValue, setActiveValue] = useState(value ?? defaultValue)
  const [previousValueProp, setPreviousValueProp] = useState(value)
  const [focusedValue, setFocusedValue] = useState<string | undefined>(
    undefined,
  )

  if (value !== undefined && value !== previousValueProp) {
    setPreviousValueProp(value)
    setActiveValue(value)
  }

  return (
    <TabsSharedStateContext.Provider
      value={{ activeValue, focusedValue, setFocusedValue }}
    >
      <LayoutGroup id={layoutGroupId}>
        <TabsPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={(nextValue) => {
            setActiveValue(nextValue)
            onValueChange?.(nextValue)
          }}
          className={className}
          {...props}
        />
      </LayoutGroup>
    </TabsSharedStateContext.Provider>
  )
}

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn('border-border flex gap-1 border-b pb-2', className)}
      {...props}
    />
  )
}

const tabsTriggerClassName = cn(
  'relative inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium whitespace-nowrap',
  'text-muted-foreground hover:text-foreground data-[state=active]:text-foreground',
  'transition-colors duration-(--motion-fast)',
  'focus-visible:outline-hidden',
  'disabled:pointer-events-none disabled:opacity-50',
)

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>

export function TabsTrigger({
  value,
  className,
  onFocus,
  onBlur,
  children,
  ...props
}: TabsTriggerProps) {
  const { activeValue, focusedValue, setFocusedValue } =
    useTabsSharedState('TabsTrigger')

  const isActive = activeValue === value
  const showFocusIndicator = focusedValue === value && !isActive

  return (
    <TabsPrimitive.Trigger
      value={value}
      onFocus={(event) => {
        setFocusedValue(value)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setFocusedValue((currentFocusedValue) =>
          currentFocusedValue === value ? undefined : currentFocusedValue,
        )
        onBlur?.(event)
      }}
      className={cn(tabsTriggerClassName, className)}
      {...props}
    >
      {children}
      {isActive ? (
        <motion.span
          layout
          layoutId="tabs-active-indicator"
          transition={springBounce}
          className="bg-primary absolute inset-x-0 -bottom-2 h-0.5 rounded-full"
        />
      ) : null}
      {showFocusIndicator ? (
        <motion.span
          layout
          layoutId="tabs-focus-indicator"
          transition={springBounce}
          className="bg-ring absolute inset-x-0 -bottom-2 h-px rounded-full"
        />
      ) : null}
    </TabsPrimitive.Trigger>
  )
}

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>

export function TabsContent({
  value,
  forceMount,
  className,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabsSharedState('TabsContent')
  const isSelected = activeValue === value

  return (
    <TabsPrimitive.Content
      {...props}
      value={value}
      forceMount={forceMount}
      className={className}
      hidden={Boolean(forceMount) && !isSelected}
    />
  )
}
