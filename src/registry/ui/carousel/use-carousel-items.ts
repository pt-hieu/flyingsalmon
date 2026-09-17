import { useCallback, useState } from 'react'

import { inDocumentOrder, withoutElement } from './utils'

export function useCarouselItems() {
  const [itemElements, setItemElements] = useState<HTMLElement[]>([])

  const registerItem = useCallback((itemElement: HTMLElement) => {
    setItemElements((registered) =>
      inDocumentOrder([...registered, itemElement]),
    )

    return () => {
      setItemElements((registered) => withoutElement(registered, itemElement))
    }
  }, [])

  return { itemElements, registerItem }
}
