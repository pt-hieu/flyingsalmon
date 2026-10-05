import { Link } from '@tanstack/react-router'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/ui/card'

import { relatedCardClassName, relatedListClassName } from './classnames'
import type { RelatedPage } from './types'

export interface RelatedProps {
  pages: RelatedPage[]
}

export function Related({ pages }: RelatedProps) {
  return (
    <ul className={relatedListClassName}>
      {pages.map((page) => (
        <li key={page.to}>
          <Card interactive className={relatedCardClassName}>
            <CardHeader>
              <CardTitle>
                <Link to={page.to}>{page.label}</Link>
              </CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  )
}
