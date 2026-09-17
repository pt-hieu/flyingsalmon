import { createContext } from 'react'

import type { CarouselSharedState } from './types'

export const CarouselContext = createContext<CarouselSharedState | null>(null)
