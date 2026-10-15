import {
  tableCodeCellClassName,
  tableGroupClassName,
  tableTextCellClassName,
} from './classnames'
import { DataTable } from './data-table'
import { DocSubheading } from './doc-subheading'
import type { FoundationTableSection } from './types'

export interface FoundationTableProps extends FoundationTableSection {}

export function FoundationTable({
  title,
  description,
  headings = ['Sample', 'Token', 'Value', 'Job'],
  rows,
}: FoundationTableProps) {
  const [sampleHeading, nameHeading, detailHeading, jobHeading] = headings

  return (
    <div className={tableGroupClassName}>
      <DocSubheading>{title}</DocSubheading>

      {description ? <p>{description}</p> : null}

      <DataTable
        columns={[
          { heading: sampleHeading },
          { heading: nameHeading, cellClassName: tableCodeCellClassName },
          { heading: detailHeading, cellClassName: tableCodeCellClassName },
          { heading: jobHeading, cellClassName: tableTextCellClassName },
        ]}
        rows={rows.map((row) => ({
          key: row.name,
          cells: [row.sample, row.name, row.detail, row.job],
        }))}
      />
    </div>
  )
}
