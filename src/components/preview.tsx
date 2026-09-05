export function PreviewSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-foreground flex flex-1 flex-wrap items-center justify-center gap-8 p-10">
      {children}
    </div>
  )
}

export function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-border bg-background overflow-hidden rounded-lg border">
      <PreviewSurface>{children}</PreviewSurface>
    </div>
  )
}
