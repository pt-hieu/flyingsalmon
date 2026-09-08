export function revealSteps({
  childIndex,
  revealedIndex,
}: {
  childIndex: number
  revealedIndex: number | null
}) {
  if (revealedIndex === null) return 0

  return Math.sign(childIndex - revealedIndex)
}
