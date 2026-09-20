import { Pagination } from 'flyingsalmon'

export function ManyPages() {
  return <Pagination page={8} pageCount={20} />
}

export function NearEnd() {
  return <Pagination page={17} pageCount={20} />
}

export function FewPages() {
  return <Pagination page={1} pageCount={5} />
}

export function Compact() {
  return <Pagination page={3} pageCount={12} compact />
}
