import { componentCatalog } from '@/components/component-catalog'
import type { DocRoute } from '@/components/doc-page'
import { foundationPages } from '@/components/foundation-pages'

const docRoutes = new Set<string>([
  '/',
  ...foundationPages.map((foundationPage) => foundationPage.to),
  ...componentCatalog.map((component) => component.to),
])

export function isDocRoute(path: string): path is DocRoute {
  return docRoutes.has(path)
}
