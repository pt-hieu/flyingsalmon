const topAndBottomBorderWidth = '2px'
const topAndBottomPadding = '1rem'

export function rowsToHeight(rows: number) {
  return `calc(${rows}lh + ${topAndBottomBorderWidth} + ${topAndBottomPadding})`
}
