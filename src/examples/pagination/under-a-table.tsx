import { useState } from 'react'

import { Pagination } from '@/registry/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableHeader,
  TableRow,
} from '@/registry/ui/table'

const pageSize = 3

const places = [
  { name: 'Fushimi Inari', neighbourhood: 'Fushimi', day: 'Day 1' },
  { name: 'Kiyomizu-dera', neighbourhood: 'Higashiyama', day: 'Day 1' },
  { name: 'Nishiki Market', neighbourhood: 'Nakagyo', day: 'Day 1' },
  { name: 'Kinkaku-ji', neighbourhood: 'Kita', day: 'Day 2' },
  { name: 'Arashiyama bamboo grove', neighbourhood: 'Ukyo', day: 'Day 2' },
  { name: 'Tenryu-ji', neighbourhood: 'Ukyo', day: 'Day 2' },
  { name: 'Philosopher\u2019s Path', neighbourhood: 'Sakyo', day: 'Day 3' },
  { name: 'Ginkaku-ji', neighbourhood: 'Sakyo', day: 'Day 3' },
  { name: 'Gion at dusk', neighbourhood: 'Higashiyama', day: 'Day 3' },
]

export function PaginationUnderATable() {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(places.length / pageSize)
  const visiblePlaces = places.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="flex w-full flex-col items-end gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Place</TableHeadCell>
            <TableHeadCell>Neighbourhood</TableHeadCell>
            <TableHeadCell>Day</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visiblePlaces.map((place) => (
            <TableRow key={place.name}>
              <TableCell>{place.name}</TableCell>
              <TableCell>{place.neighbourhood}</TableCell>
              <TableCell>{place.day}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </div>
  )
}
