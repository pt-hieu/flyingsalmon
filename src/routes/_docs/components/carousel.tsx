import { createFileRoute } from '@tanstack/react-router'

import { ComponentStub } from '@/components/component-stub'

export const Route = createFileRoute('/_docs/components/carousel')({
  component: CarouselPage,
})

function CarouselPage() {
  return <ComponentStub name="Carousel" />
}
