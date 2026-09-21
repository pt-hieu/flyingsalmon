import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/components/')({
  beforeLoad: () => {
    throw redirect({ to: '/', search: {}, replace: true })
  },
})
