export function ComponentStub({ name }: { name: string }) {
  return (
    <article className="mx-auto max-w-3xl space-y-3 px-6 py-12">
      <h1 className="font-heading text-4xl font-bold tracking-tight">{name}</h1>
      <p className="text-muted-foreground text-lg">Not built yet.</p>
    </article>
  )
}
